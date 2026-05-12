import React from "react";
import { Text, TextInput, View } from "react-native";

interface InfoInputRowProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    unit?: string;
}

export default function InfoInputRow({
                                         label,
                                         value,
                                         onChangeText,
                                         placeholder,
                                         unit,
                                     }: InfoInputRowProps) {
    return (
        <View className="flex-row items-center mb-4">
            <Text className="w-[80px] text-bk text-[16px] font-semibold">
                {label}
            </Text>

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                maxLength={3}
                keyboardType="number-pad"
                className="w-[80px] h-12 border-b border-gr200 px-2 text-bk text-[15px]"
            />

            {unit && (
                <Text className="text-bk text-base font-semibold ml-2">
                    {unit}
                </Text>
            )}
        </View>
    );
}