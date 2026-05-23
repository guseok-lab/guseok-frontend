import React from "react";
import { Pressable, Text, View } from "react-native";

interface ReportButtonProps {
    onPress?: () => void;
}

export default function ReportButton({ onPress }: ReportButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            className="flex-row items-center justify-center bg-primary rounded-xl py-3 mt-3"
        >
            {/* 전화 아이콘 자리 (이미지 에셋 추후 추가) */}
            <View className="w-4 h-4 rounded-sm bg-bk/70 mr-2" />

            <Text className="text-bk text-sm font-bold">제보하기</Text>
        </Pressable>
    );
}
