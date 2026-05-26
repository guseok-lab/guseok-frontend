import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DetailHeader from "../../../navigation/components/DetailHeader";
import type { MissingPersonForm } from "../../../types/missingPersonForm";

interface DroneConnectScreenProps {
    formData: MissingPersonForm;
    searchId: number;
    onClose: () => void;
    onNext: () => void;
}

export default function DroneConnectScreen({
                                               formData,
                                               // searchId 는 다음 단계(DroneCameraScreen)로 넘기기 위해 받지만
                                               // 이 화면 자체는 추가 API 호출이 없어 사용하지 않음.
                                               searchId: _searchId,
                                               onClose,
                                               onNext,
                                           }: DroneConnectScreenProps) {
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
                        이름 어쩌구저쩌구
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
                    onPress={onNext}
                    className="h-12 items-center justify-center rounded-xl bg-primary"
                >
                    <Text className="text-bk text-lg font-bold">다음</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}
