import React from "react";
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

interface InfoInputRowProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    unit?: string;
    keyboardType?: KeyboardTypeOptions;
    maxLength?: number;
    fill?: boolean;
}

export default function InfoInputRow({
                                         label,
                                         value,
                                         onChangeText,
                                         placeholder,
                                         unit,
                                         keyboardType = "default",
                                         maxLength,
                                         fill = false,
                                     }: InfoInputRowProps) {
    if (fill) {
        return (
            <View className="mb-3">
                <Text className="text-bk text-sm font-semibold mb-2">
                    {label}
                </Text>
                <View className="flex-row items-center bg-wh border border-gr200/40 rounded-xl px-3 h-11">
                    <TextInput
                        value={value}
                        onChangeText={onChangeText}
                        placeholder={placeholder}
                        placeholderTextColor="#B2B2B2"
                        maxLength={maxLength}
                        keyboardType={keyboardType}
                        className="flex-1 text-bk text-[15px]"
                    />
                    {unit && (
                        <Text className="text-gr200 text-sm ml-1">{unit}</Text>
                    )}
                </View>
            </View>
        );
    }

    return (
        <View className="flex-row items-center mb-3">
            <Text className="w-[80px] text-bk text-base font-semibold">
                {label}
            </Text>

            <View className="flex-row items-center bg-wh border border-gr200/40 rounded-xl px-3 h-11 w-[120px]">
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#B2B2B2"
                    maxLength={maxLength}
                    keyboardType={keyboardType}
                    className="flex-1 text-bk text-[15px]"
                />
                {unit && (
                    <Text className="text-gr200 text-sm ml-1">{unit}</Text>
                )}
            </View>
        </View>
    );
}
