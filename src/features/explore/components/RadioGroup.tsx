import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface RadioGroupProps {
    label: string;
    value: string | null;
    options: string[];
    onChange: (value: any) => void;
}

export default function RadioGroup({
                                       label,
                                       value,
                                       options,
                                       onChange,
                                   }: RadioGroupProps) {
    return (
        <View className="flex-row items-center mb-4">
            <Text className="w-[80px] text-bk text-[16px] font-semibold">
                {label}
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
                            <Text className="text-bk text-base mr-2">
                                {selected ? "●" : "○"}
                            </Text>
                            <Text className="text-bk text-base font-semibold">
                                {option}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}