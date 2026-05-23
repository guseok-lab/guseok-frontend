import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface MenuItemProps {
    title: string;
    onPress?: () => void;
    isLast?: boolean;
}

export default function MenuItem({
                                     title,
                                     onPress,
                                     isLast = false,
                                 }: MenuItemProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            className={`flex-row items-center justify-between px-4 py-4 ${
                isLast ? "" : "border-b border-gr200/40"
            }`}
        >
            <Text className="text-bk text-base font-medium">
                {title}
            </Text>

            <Text className="text-gr200 text-xl font-medium">
                ›
            </Text>
        </TouchableOpacity>
    );
}
