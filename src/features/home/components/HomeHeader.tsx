import React from "react";
import { Text, View } from "react-native";

export default function HomeHeader() {
    const isLogin = false;

    return (
        <View className="mb-6">
            <Text className="text-bk text-2xl font-bold">
                구석구석에 오신걸 환영해요
            </Text>

            <Text className="text-gr200 text-sm mt-2 leading-5">
                {isLogin
                    ? "오늘도 주변의 작은 단서가 큰 도움이 될 수 있어요"
                    : "실종자 발견을 위한 작은 관심이 큰 도움이 됩니다"}
            </Text>
        </View>
    );
}