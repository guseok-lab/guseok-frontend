import React from "react";
import { Text, View } from "react-native";

interface ProfileSectionProps {
    name?: string;
    description?: string;
}

export default function ProfileSection({
                                           name = "김회원",
                                           description = "오늘도 함께 찾아주셔서 감사해요",
                                       }: ProfileSectionProps) {
    return (
        <View className="flex-row items-center bg-primary100 border border-primary300 rounded-2xl p-5 mb-6">
            <View className="w-16 h-16 rounded-full bg-primary items-center justify-center mr-4">
                <View className="w-12 h-12 rounded-full bg-wh" />
            </View>

            <View className="flex-1">
                <Text className="text-bk text-xl font-bold">{name}</Text>
                <Text className="text-gr200 text-base mt-1 leading-6">
                    {description}
                </Text>
            </View>
        </View>
    );
}
