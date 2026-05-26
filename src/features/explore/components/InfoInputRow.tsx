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
    required?: boolean;
}

function LabelWithRequired({
    label,
    required,
    className,
}: {
    label: string;
    required?: boolean;
    className: string;
}) {
    return (
        <Text className={className}>
            {label}
            {required && <Text className="text-point"> *</Text>}
        </Text>
    );
}

const inputBaseStyle = {
    flex: 1,
    padding: 0,
    margin: 0,
    color: "#000000",
    fontSize: 16,
    includeFontPadding: false as const,
};

export default function InfoInputRow({
                                         label,
                                         value,
                                         onChangeText,
                                         placeholder,
                                         unit,
                                         keyboardType = "default",
                                         maxLength,
                                         fill = false,
                                         required = false,
                                     }: InfoInputRowProps) {
    if (fill) {
        return (
            <View className="mb-3">
                <LabelWithRequired
                    label={label}
                    required={required}
                    className="text-bk text-base font-semibold mb-2"
                />
                <View className="flex-row items-center bg-wh border border-gr200/40 rounded-xl px-3 h-12">
                    <TextInput
                        value={value}
                        onChangeText={onChangeText}
                        placeholder={placeholder}
                        placeholderTextColor="#B2B2B2"
                        maxLength={maxLength}
                        keyboardType={keyboardType}
                        style={inputBaseStyle}
                    />
                    {unit && (
                        <Text className="text-gr200 text-base ml-1">{unit}</Text>
                    )}
                </View>
            </View>
        );
    }

    return (
        <View className="flex-row items-center mb-3">
            <LabelWithRequired
                label={label}
                required={required}
                className="w-[90px] text-bk text-lg font-semibold"
            />

            <View className="flex-row items-center bg-wh border border-gr200/40 rounded-xl px-3 h-12 w-[130px]">
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#B2B2B2"
                    maxLength={maxLength}
                    keyboardType={keyboardType}
                    style={inputBaseStyle}
                />
                {unit && (
                    <Text className="text-gr200 text-base ml-1">{unit}</Text>
                )}
            </View>
        </View>
    );
}
