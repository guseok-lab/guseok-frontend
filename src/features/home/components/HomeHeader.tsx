import React from "react";
import { Text, View } from "react-native";

export default function HomeHeader() {
    return (
        <View className="flex-row items-start justify-between mb-5">
            <View className="flex-1 pr-3">
                <Text className="text-bk text-2xl font-bold leading-8">
                    <Text className="text-primary">구석구석</Text>
                    에 오신걸 환영해요
                </Text>

                <Text className="text-gr200 text-sm mt-2 leading-5">
                    실종 없는 세상, 함께 만들어가요
                </Text>
            </View>

            {/* 마스코트 캐릭터 자리 (이미지 에셋 추후 추가) */}
            <View className="w-24 h-24 rounded-full bg-primary/20 items-center justify-center">
                <View className="w-16 h-16 rounded-full bg-primary/40" />
            </View>
        </View>
    );
}
