import React from "react";
import { Pressable, Text, View } from "react-native";
import CallIcon from "@/features/home/assets/svg/Phone.svg";

interface ReportButtonProps {
    onPress?: () => void;
}

export default function ReportButton({ onPress }: ReportButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            className="flex-row items-center justify-center bg-primary rounded-xl py-3 mt-3 gap-1"
        >
            <CallIcon width={20} height={20} className="color-gr700" />

            <Text className="text-bk text-lg font-bold">제보하기</Text>
        </Pressable>
    );
}
