import React, { ReactNode } from "react";
import { Text, View } from "react-native";

interface InfoRowProps {
    label?: string;
    value: ReactNode;
    /** 아이콘 자리 (추후 SVG 에셋 교체) */
    icon?: ReactNode;
}

export default function InfoRow({ label, value, icon }: InfoRowProps) {
    return (
        <View className="flex-row items-start mb-2">
            <View className="w-5 h-5 rounded-md bg-gr200/30 items-center justify-center mr-2 mt-0.5">
                {icon}
            </View>

            <View className="flex-1">
                {label ? (
                    <Text className="text-gr200 text-xs">{label}</Text>
                ) : null}
                <Text className="text-bk text-sm leading-5">{value}</Text>
            </View>
        </View>
    );
}
