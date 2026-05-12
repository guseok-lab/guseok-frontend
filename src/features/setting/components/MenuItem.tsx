import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface MenuItemProps {
    title: string;
    onPress?: () => void;
}

export default function MenuItem({
                                     title,
                                     onPress,
                                 }: MenuItemProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            className="flex-row items-center justify-between py-4"
        >
            <Text className="text-bk text-[15px] font-medium">
                {title}
            </Text>

            <Text className="text-bk text-[24px] font-medium">
                &gt;
            </Text>
        </TouchableOpacity>
    );
}