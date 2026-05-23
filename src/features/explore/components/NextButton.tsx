import React from "react";
import { Pressable, Text } from "react-native";

interface NextButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
}

export default function NextButton({
                                       title,
                                       onPress,
                                       disabled = false,
                                   }: NextButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            className={`h-12 items-center justify-center mt-10 rounded-xl ${
                disabled ? "bg-gr100" : "bg-primary"
            }`}
        >
            <Text
                className={`text-lg font-bold ${
                    disabled ? "text-gr200" : "text-bk"
                }`}
            >
                {title}
            </Text>
        </Pressable>
    );
}
