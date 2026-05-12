import React from "react";
import { Text, TextInput, View } from "react-native";

interface DescriptionInputProps {
    value: string;
    onChangeText: (text: string) => void;
}

export default function DescriptionInput({
                                             value,
                                             onChangeText,
                                         }: DescriptionInputProps) {
    return (
        <View className="mt-5">
            <Text className="text-bk text-[16px] font-semibold mb-3">
                인상착의
            </Text>

            <TextInput
                multiline
                textAlignVertical="top"
                value={value}
                onChangeText={onChangeText}
                placeholder="인상착의를 입력해주세요"
                placeholderTextColor="#B2B2B2"
                className="h-[116px] border border-gr200 rounded-xl px-4 py-4 text-bk text-[14px]"
            />
        </View>
    );
}