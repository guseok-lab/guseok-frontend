import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function LogoutButton() {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className="items-center mt-[180px] mb-10"
        >
            <Text className="text-gr200 text-[18px]">
                로그아웃
            </Text>
        </TouchableOpacity>
    );
}