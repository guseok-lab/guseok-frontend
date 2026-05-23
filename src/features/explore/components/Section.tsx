import React from "react";
import { Text, View } from "react-native";

interface SectionProps {
    title: string;
    children: React.ReactNode;
    isLast?: boolean;
}

export default function Section({
                                    title,
                                    children,
                                    isLast = false,
                                }: SectionProps) {
    return (
        <View
            className={`mb-6 pb-6 ${
                isLast ? "" : "border-b border-gr200/40"
            }`}
        >
            <Text className="text-bk text-lg font-bold mb-4">
                {title}
            </Text>
            {children}
        </View>
    );
}
