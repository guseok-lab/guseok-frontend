import React from "react";
import { Text, View } from "react-native";

interface SearchStatusBannerProps {
    count: number;
}

export default function SearchStatusBanner({ count }: SearchStatusBannerProps) {
    return (
        <View className="flex-row items-center bg-primary/10 border border-primary/30 rounded-2xl px-4 py-4 mb-6">
            {/* 벨 아이콘 자리 (이미지 에셋 추후 추가) */}
            <View className="w-9 h-9 rounded-full bg-primary items-center justify-center mr-3" />

            <Text className="text-bk text-base font-semibold">
                현재 탐색 중인 실종자{" "}
                <Text className="text-primary font-bold">{count}명</Text>
            </Text>
        </View>
    );
}
