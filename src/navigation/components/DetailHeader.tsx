import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface DetailHeaderProps {
    title?: string;
}

export default function DetailHeader({ title }: DetailHeaderProps) {
    const navigation = useNavigation();

    return (
        <View className="flex-row items-center h-12 px-2">
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}
                className="w-10 h-10 items-center justify-center"
            >
                <Text className="text-bk text-2xl">‹</Text>
            </TouchableOpacity>

            {title ? (
                <Text className="flex-1 text-bk text-base font-semibold text-center mr-10">
                    {title}
                </Text>
            ) : null}
        </View>
    );
}
