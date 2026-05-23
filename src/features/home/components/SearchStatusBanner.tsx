import React from "react";
import { Text, View } from "react-native";
import NotificationIcon from "../assets/svg/Notification.svg";

interface SearchStatusBannerProps {
    count: number;
}

export default function SearchStatusBanner({ count }: SearchStatusBannerProps) {
    return (
        <View className="flex-row items-center bg-primary100 border border-primary300 rounded-2xl px-4 py-4 mb-6">

            <View className="w-9 h-9 rounded-full bg-primary items-center justify-center mr-3">
                <NotificationIcon width={22} height={22} color="#FFFFFF" />
            </View>

            <Text className="text-bk text-base font-semibold">
                현재 탐색 중인 실종자{" "}
                <Text className="text-primary400 text-lg font-bold">{count}명</Text>
            </Text>
        </View>
    );
}
