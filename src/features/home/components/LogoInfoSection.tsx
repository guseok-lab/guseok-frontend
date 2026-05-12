import React from "react";
import { Text, View } from "react-native";

export default function LogoInfoSection() {
    return (
        <View className="mt-2 mb-10">
            <Text className="text-bk text-lg font-bold mb-4">
                Q. LOGO는 어떻게 만들어졌나요?
            </Text>

            <View className="w-full h-[145px] bg-gr200 items-center justify-center rounded-xl mb-4">
                <Text className="text-bk text-base font-bold">
                    실종 문자 사진
                </Text>
            </View>

            <Text className="text-bk text-sm font-bold mb-1">
                해당 문자를 받아보신 적 있으신가요?
            </Text>

            <Text className="text-bk text-sm leading-5">
                저희는 해당 문자에서부터 시작했어요 어쩌구저쩌구
            </Text>
        </View>
    );
}