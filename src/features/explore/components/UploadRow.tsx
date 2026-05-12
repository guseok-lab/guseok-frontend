import React from "react";
import { Text, TouchableOpacity } from "react-native";

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
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            className="flex-row items-center border-b border-gr200 py-6"
        >
            <Text className="text-bk text-[16px] font-semibold">
                {title}
            </Text>

            {value && (
                <Text className="ml-auto text-bk text-[14px] underline">
                    {value}
                </Text>
            )}
        </TouchableOpacity>
    );
}