import React from "react";
import { Text, View } from "react-native";

export default function ProfileSection() {
    return (
        <View className="items-center pt-10">
            <View className="w-[80px] h-[80px] rounded-full bg-gr200" />

            <Text className="text-bk text-[20px] font-bold mt-6">
                김회원
            </Text>
        </View>
    );
}