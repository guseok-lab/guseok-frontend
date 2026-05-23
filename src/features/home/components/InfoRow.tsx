import React, { ReactNode } from "react";
import { Text, View } from "react-native";

interface InfoRowProps {
    label?: string;
    value: ReactNode;
    icon?: ReactNode;
}

export default function InfoRow({ label, value, icon }: InfoRowProps) {
    return (
        <View className="flex-row items-start mb-2">
            <View className="w-5 h-5 items-center justify-center mr-2 mb-1">
                {icon}
            </View>

            <View className="flex-1">
                {label ? (
                    <Text className="text-gr200 text-sm">{label}</Text>
                ) : null}
                <Text className="text-bk text-base leading-6">{value}</Text>
            </View>
        </View>
    );
}
