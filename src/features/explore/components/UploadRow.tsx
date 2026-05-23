import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface UploadRowProps {
    title: string;
    value?: string;
    onPress?: () => void;
}

export default function UploadRow({
                                      title,
                                      value,
                                      onPress,
                                  }: UploadRowProps) {
    const hasValue = !!value && value !== "사진 선택";

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            className="flex-row items-center justify-between bg-wh border border-gr200/40 rounded-xl px-4 h-12 mb-3"
        >
            <Text className="text-bk text-base font-semibold">
                {title}
            </Text>

            <View className="flex-row items-center">
                <Text
                    className={`text-base ${
                        hasValue ? "text-primary400 font-semibold" : "text-gr200"
                    }`}
                >
                    {value ?? "사진 선택"}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
