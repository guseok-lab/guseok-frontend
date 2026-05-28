import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DetailHeader from "../../../navigation/components/DetailHeader";
import type { MissingPersonForm } from "../../../types/missingPersonForm";
import MjpegPlayer from "../components/MjpegPlayer";
import { disconnectDrone } from "../../../api/drones";

interface DroneCameraScreenProps {
    formData: MissingPersonForm;
    searchId: number;
    streamUrl: string;
    onClose: () => void;
    // 탐색 종료 → 드론 연결 해제 후 결과 화면으로 이동.
    onFinish: () => void;
}

interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

// Expo Go에는 react-native-maps / expo-location native module이 없어
// 모듈 레벨 import 시 native bridge 에러가 날 수 있어 lazy require 처리.
let MapView: any = null;
let Marker: any = null;
let Location: any = null;
try {
    const maps = require("react-native-maps");
    MapView = maps.default;
    Marker = maps.Marker;
} catch {}
try {
    Location = require("expo-location");
} catch {}

export default function DroneCameraScreen({
                                              formData,
                                              searchId,
                                              streamUrl,
                                              onClose,
                                              onFinish,
                                          }: DroneCameraScreenProps) {
    const [region, setRegion] = useState<Region | null>(null);
    const [isFinishing, setIsFinishing] = useState(false);
    const hasNativeMap = !!MapView && !!Location;

    const handleFinish = async () => {
        if (isFinishing) return;
        setIsFinishing(true);
        // 드론 연결 해제는 best-effort(실패해도 결과 화면으로 진행).
        try {
            await disconnectDrone(searchId);
        } catch {}
        onFinish();
    };

    useEffect(() => {
        if (!hasNativeMap) return;
        (async () => {
            try {
                const { status } =
                    await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    Alert.alert(
                        "위치 권한 필요",
                        "지도 표시를 위해 위치 권한이 필요합니다.",
                    );
                    return;
                }
                const loc = await Location.getCurrentPositionAsync({});
                setRegion({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            } catch {}
        })();
    }, [hasNativeMap]);

    return (
        <SafeAreaView className="flex-1 bg-bg">
            <DetailHeader onBack={onClose} />

            <View className="flex-1 px-5 pb-4">
                <View className="w-full h-[36%] rounded-xl bg-black mb-4 overflow-hidden">
                    {streamUrl ? (
                        <MjpegPlayer
                            streamUrl={streamUrl}
                            style={{ flex: 1 }}
                        />
                    ) : (
                        <View className="flex-1 items-center justify-center">
                            <Text className="text-gr200 text-xs">
                                스트림 URL이 없습니다.
                            </Text>
                        </View>
                    )}
                </View>

                <View className="flex-1 rounded-xl overflow-hidden bg-gr200/40">
                    {hasNativeMap && region ? (
                        <MapView
                            style={{ flex: 1 }}
                            initialRegion={region}
                            showsUserLocation
                        >
                            <Marker
                                coordinate={{
                                    latitude: region.latitude,
                                    longitude: region.longitude,
                                }}
                                title={formData.name || "탐색 위치"}
                            />
                        </MapView>
                    ) : (
                        <View className="flex-1 items-center justify-center">
                            <Text className="text-bk text-lg font-semibold">
                                지도
                            </Text>
                            <Text className="text-gr200 text-xs mt-1 px-4 text-center leading-5">
                                {hasNativeMap
                                    ? "위치 권한을 허용하면 표시됩니다"
                                    : "Expo Go에서는 지도가 표시되지 않습니다.\ndevelopment build에서 활성화됩니다."}
                            </Text>
                        </View>
                    )}
                </View>

                <Pressable
                    onPress={handleFinish}
                    disabled={isFinishing}
                    className="h-12 items-center justify-center rounded-xl bg-primary mt-3"
                    style={{ opacity: isFinishing ? 0.6 : 1 }}
                >
                    {isFinishing ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <Text className="text-bk text-lg font-bold">
                            탐색 종료
                        </Text>
                    )}
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
