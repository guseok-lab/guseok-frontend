import React from "react";
import { Text, View } from "react-native";

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
    return (
        <View className="mb-6">
            <Text className="text-bk text-base font-bold mb-4">
                {title}
            </Text>
            {children}
        </View>
    );
}
