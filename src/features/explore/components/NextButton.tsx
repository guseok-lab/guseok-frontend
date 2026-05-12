import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface NextButtonProps {
    title: string;
    onPress: () => void;
}

export default function NextButton({
                                       title,
                                       onPress,
                                   }: NextButtonProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            className="h-12 bg-bk items-center justify-center mt-12 rounded-full"
        >
            <Text className="text-white text-[16px] font-semibold">
                {title}
            </Text>
        </TouchableOpacity>
    );
}