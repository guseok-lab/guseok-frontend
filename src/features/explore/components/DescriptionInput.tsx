import React from "react";
import { Text, TextInput, View } from "react-native";

interface DescriptionInputProps {
    title?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    minHeight?: number;
}

export default function DescriptionInput({
                                             title = "인상착의",
                                             value,
                                             onChangeText,
                                             placeholder = "인상착의를 입력해주세요",
                                             minHeight = 116,
                                         }: DescriptionInputProps) {
    return (
        <View className="mb-3">
            <Text className="text-bk text-sm font-semibold mb-2">
                {title}
            </Text>

            <TextInput
                multiline
                textAlignVertical="top"
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#B2B2B2"
                style={{ minHeight }}
                className="bg-wh border border-gr200/40 rounded-xl px-4 py-3 text-bk text-sm leading-5"
            />
        </View>
    );
}
