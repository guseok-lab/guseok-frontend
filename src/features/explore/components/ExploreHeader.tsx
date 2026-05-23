import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ExploreHeaderProps {
    title: string;
    highlight?: string;
    subtitle?: string;
    showBack?: boolean;
    onBack?: () => void;
}

export default function ExploreHeader({
                                          title,
                                          highlight,
                                          subtitle,
                                          showBack = false,
                                          onBack,
                                      }: ExploreHeaderProps) {
    return (
        <View className="mb-5">
            {showBack && (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onBack}
                    className="w-9 h-9 items-start justify-center mb-2"
                >
                    <Text className="text-bk text-2xl">‹</Text>
                </TouchableOpacity>
            )}

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
