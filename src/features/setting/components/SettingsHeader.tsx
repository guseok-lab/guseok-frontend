import React from "react";
import { Text, View } from "react-native";

interface SettingsHeaderProps {
    title?: string;
    highlight?: string;
    subtitle?: string;
}

export default function SettingsHeader({
                                           title = "내 정보",
                                           highlight = "내 정보",
                                           subtitle = "구석구석과 함께한 흔적이에요",
                                       }: SettingsHeaderProps) {
    return (
        <View className="mb-5">
            <Text className="text-bk text-2xl font-bold leading-8">
                {highlight ? (
                    <Text className="text-primary400">{highlight}</Text>
                ) : null}
                {highlight ? title.replace(highlight, "") : title}
            </Text>

            {subtitle ? (
                <Text className="text-gr200 text-sm mt-2 leading-5">
                    {subtitle}
                </Text>
            ) : null}
        </View>
    );
}
