import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ExploreHeaderProps {
    title: string;
    showBack?: boolean;
    onBack?: () => void;
}

export default function ExploreHeader({
                                          title,
                                          showBack = false,
                                          onBack,
                                      }: ExploreHeaderProps) {
    return (
        <View>
            {showBack && (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onBack}
                    className="h-9 bg-gr200 justify-center px-4 mb-12"
                >
                    <Text className="text-bk text-base">&lt;</Text>
                </TouchableOpacity>
            )}

            <Text className="text-bk text-xl font-bold text-center">
                {title}
            </Text>
        </View>
    );
}