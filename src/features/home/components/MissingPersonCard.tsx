import React from "react";
import { Text, View } from "react-native";

interface MissingPersonCardProps {
    item: {
        id: number;
        name: string;
        age: number;
        gender: string;
        height: number;
        weight: number;
        description: string;
        phone: string;
    };
    reverse: boolean;
}

export default function MissingPersonCard({
                                              item,
                                              reverse,
                                          }: MissingPersonCardProps) {
    return (
        <View
            className={`flex-row items-start mb-6 ${
                reverse ? "flex-row-reverse" : ""
            }`}
        >
            <View className="w-[148px] h-[148px] bg-gr200" />

            <View
                className={`flex-1 ${
                    reverse ? "mr-4 items-end" : "ml-4 items-start"
                }`}
            >
                <Text className="text-bk text-sm font-bold">
                    {item.name} / {String(item.age).padStart(2, "0")}세
                </Text>

                <Text className="text-bk text-sm mt-2">
                    {item.gender} / {item.height}cm /{" "}
                    {String(item.weight).padStart(2, "0")}kg
                </Text>

                <Text
                    className={`text-bk text-sm mt-2 leading-5 ${
                        reverse ? "text-right" : "text-left"
                    }`}
                >
                    {item.description}
                </Text>

                <Text className="text-bk text-sm mt-2">{item.phone}</Text>
            </View>
        </View>
    );
}