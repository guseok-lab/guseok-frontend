import React from "react";
import { Text, View } from "react-native";

interface MenuSectionProps {
    title?: string;
    children: React.ReactNode;
}

export default function MenuSection({ title, children }: MenuSectionProps) {
    return (
        <View className="mb-4">
            {title ? (
                <Text className="text-gr200 text-sm font-semibold mb-2 px-1">
                    {title}
                </Text>
            ) : null}

            <View className="bg-wh border border-gr200 rounded-2xl overflow-hidden">
                {children}
            </View>
        </View>
    );
}
