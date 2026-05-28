import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DetailHeader from "../../../navigation/components/DetailHeader";
import type { MissingPersonForm } from "../../../types/missingPersonForm";
import { connectDrone, resolveStreamUrl } from "../../../api/drones";

interface DroneConnectScreenProps {
    formData: MissingPersonForm;
    searchId: number;
    onClose: () => void;
    onConnected: (streamUrl: string) => void;
}

export default function DroneConnectScreen({
    formData,
    searchId,
    onClose,
    onConnected,
}: DroneConnectScreenProps) {
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = async () => {
        if (isConnecting) return;
        setIsConnecting(true);
        try {
            const result = await connectDrone(searchId);
            const url = resolveStreamUrl(result.streamUrl);
            if (result.status !== "CONNECTED" || !url) {
                Alert.alert(
                    "드론 연결 대기",
                    "연결된 드론을 찾지 못했어요. 드론(노트북)이 실행 중인지 확인 후 다시 시도해주세요.",
                );
                return;
            }
            onConnected(url);
        } catch (e: any) {
            Alert.alert(
                "드론 연결 실패",
                e?.message ?? "잠시 후 다시 시도해주세요.",
            );
        } finally {
            setIsConnecting(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-bg">
            <DetailHeader title="드론 연결" onBack={onClose} />

            <ScrollView
                className="flex-1 px-5"
                contentContainerClassName="pt-4 pb-10"
                showsVerticalScrollIndicator={false}
            >
                <Text className="text-bk text-base text-center mb-6">
                    같은 WIFI를 사용하고 있는지 확인해주세요
                </Text>

                <View className="flex-row items-center justify-between mb-3 px-1">
                    <Text className="text-bk text-lg font-bold">드론</Text>
                    <Text className="text-bk text-base underline">
                        드론 노트북 실행 후 연결
                    </Text>
                </View>
                <View className="h-px bg-gr200/40 mb-6" />

                <Text className="text-bk text-base font-bold text-center mb-4">
                    입력하신 정보가 맞는지 확인해주세요
                </Text>

                <View className="bg-wh border border-gr200/40 rounded-xl p-4 mb-6">
                    <Text className="text-bk text-base">
                        • {formData.gender} / {formData.height}cm /{" "}
                        {formData.weight}kg
                    </Text>
                    <Text className="text-bk text-base mt-2 leading-6">
                        • {formData.appearance}
                    </Text>
                </View>

                <View className="w-full aspect-video rounded-xl bg-gr200/40 items-center justify-center mb-8">
                    <Text className="text-gr200 text-base">사진</Text>
                </View>

                <Pressable
                    onPress={handleConnect}
                    disabled={isConnecting}
                    className="h-12 items-center justify-center rounded-xl bg-primary"
                    style={{ opacity: isConnecting ? 0.6 : 1 }}
                >
                    {isConnecting ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <Text className="text-bk text-lg font-bold">
                            드론 연결
                        </Text>
                    )}
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}
