import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { RouteProp, useRoute } from "@react-navigation/native";

import DetailHeader from "../../../navigation/components/DetailHeader";
import type { RootStackParamList } from "../../../navigation/types";

type R = RouteProp<RootStackParamList, "DroneCamera">;

interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export default function DroneCameraScreen() {
    const route = useRoute<R>();
    const { formData } = route.params;

    const [region, setRegion] = useState<Region | null>(null);

    useEffect(() => {
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
            } catch (e) {
                // 시뮬레이터 등 위치 조회 불가 시 무시 (placeholder 유지)
            }
        })();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-bg">
            <DetailHeader />

            <View className="flex-1 px-5 pb-4">
                <View className="w-full h-[36%] rounded-xl bg-gr200/40 items-center justify-center mb-4 overflow-hidden">
                    <Text className="text-bk text-lg font-semibold">
                        드론 카메라
                    </Text>
                    <Text className="text-gr200 text-xs mt-1">
                        드론 영상 (AI 연동 예정)
                    </Text>
                </View>

                <View className="flex-1 rounded-xl overflow-hidden bg-gr200/40">
                    {region ? (
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
                                description={formData.lastLocation}
                            />
                        </MapView>
                    ) : (
                        <View className="flex-1 items-center justify-center">
                            <Text className="text-bk text-lg font-semibold">
                                지도
                            </Text>
                            <Text className="text-gr200 text-xs mt-1">
                                위치 권한을 허용하면 표시됩니다
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}
