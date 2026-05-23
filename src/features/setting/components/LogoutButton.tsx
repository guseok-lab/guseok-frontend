import React from "react";
import { Pressable, Text } from "react-native";

interface LogoutButtonProps {
    onPress?: () => void;
}

export default function LogoutButton({ onPress }: LogoutButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            className="items-center justify-center mt-8 py-3"
        >
            <Text className="text-gr200 text-base underline">
                로그아웃
            </Text>
        </Pressable>
    );
}
