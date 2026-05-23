import React from "react";
import { Text, View } from "react-native";

interface MissingDayBadgeProps {
    days: number;
}

export default function MissingDayBadge({ days }: MissingDayBadgeProps) {
    return (
        <View className="self-start bg-point/10 rounded-full px-3 py-1">
            <Text className="text-point text-xs font-semibold">
                실종 {days}일째
            </Text>
        </View>
    );
}
