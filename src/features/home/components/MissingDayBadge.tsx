import React from "react";
import { Text, View } from "react-native";

interface MissingDayBadgeProps {
    days: number;
}

export default function MissingDayBadge({ days }: MissingDayBadgeProps) {
    return (
        <View className="self-end bg-point100 rounded-xl px-3 py-1">
            <Text className="text-point text-xs font-semibold">
                실종 {days}일째
            </Text>
        </View>
    );
}
