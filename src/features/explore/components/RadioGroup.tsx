import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface RadioGroupProps {
    label: string;
    value: string | null;
    options: string[];
    onChange: (value: any) => void;
    required?: boolean;
}

export default function RadioGroup({
                                       label,
                                       value,
                                       options,
                                       onChange,
                                       required = false,
                                   }: RadioGroupProps) {
    return (
        <View className="flex-row items-center mb-4">
            <Text className="w-[90px] text-bk text-lg font-semibold">
                {label}
                {required && <Text className="text-point"> *</Text>}
            </Text>

            <View className="flex-row gap-8">
                {options.map((option) => {
                    const selected = value === option;

                    return (
                        <TouchableOpacity
                            key={option}
                            activeOpacity={0.7}
                            onPress={() => onChange(option)}
                            className="flex-row items-center"
                        >
                            <View
                                className={`w-5 h-5 rounded-full border-2 mr-2 items-center justify-center ${
                                    selected
                                        ? "border-primary400 bg-primary100"
                                        : "border-gr200 bg-wh"
                                }`}
                            >
                                {selected && (
                                    <View className="w-2.5 h-2.5 rounded-full bg-primary400" />
                                )}
                            </View>

                            <Text className="text-bk text-lg font-semibold">
                                {option}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
