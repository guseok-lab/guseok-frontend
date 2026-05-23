import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DetailHeader from "../../../navigation/components/DetailHeader";
import type { MissingPersonForm } from "../../../types/missingPersonForm";

interface AIResultScreenProps {
    formData: MissingPersonForm;
    capturedUri?: string;
    onClose: () => void;
}

export default function AIResultScreen({
                                           formData,
                                           capturedUri,
                                           onClose,
                                       }: AIResultScreenProps) {
    return (
        <SafeAreaView className="flex-1 bg-bg">
            <DetailHeader title="AI 분석 결과" onBack={onClose} />

            <ScrollView
                className="flex-1 px-5"
                contentContainerClassName="pt-2 pb-10"
                showsVerticalScrollIndicator={false}
            >
                <Text className="text-bk text-2xl font-bold text-center mt-2">
                    결과가 나왔어요
                </Text>
                <Text className="text-gr200 text-sm text-center mt-2 mb-6 leading-5">
                    AI 분석을 통해 일치 가능성이 높은 장면을 찾았어요
                </Text>

                <View className="w-full aspect-square rounded-xl bg-gr200/40 mb-6 items-center justify-center overflow-hidden">
                    {capturedUri ? (
                        <Image
                            source={{ uri: capturedUri }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    ) : (
                        <Text className="text-gr200 text-base">
                            분석 결과 캡처 (AI 연동 예정)
                        </Text>
                    )}
                </View>

                <Text className="text-bk text-base font-bold mb-3">
                    분석에 사용된 정보
                </Text>
                <View className="bg-wh border border-gr200/40 rounded-xl p-4">
                    <Text className="text-bk text-base">
                        {formData.name} / {formData.age}세 / {formData.gender}
                    </Text>
                    <Text className="text-bk text-base mt-1">
                        {formData.height}cm / {formData.weight}kg /{" "}
                        {formData.bodyType}
                    </Text>
                    <Text className="text-bk text-base mt-1 leading-6">
                        {formData.appearance}
                    </Text>
                    <Text className="text-bk text-base mt-1 leading-6">
                        마지막 위치: {formData.lastLocation}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
