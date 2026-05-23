import React from "react";
import { Image,Text, View } from "react-native";

export default function HomeHeader() {
    return (
        <View className="flex-row items-start justify-between mb-5">
            <View className="flex-1 pr-3">
                <Text className="text-bk text-2xl font-bold leading-8">
                    <Text className="text-primary400">구석구석</Text>
                    에 오신걸 환영해요
                </Text>

                <Text className="text-gr200 text-sm mt-2 leading-5">
                    실종 없는 세상, 함께 만들어가요
                </Text>
            </View>

            <View className="w-28 h-28">
                <View className="absolute inset-0 rounded-full bg-primary100" />
                <Image
                    source={require("../assets/png/Icon.png")}
                    className="w-32 h-32 absolute -top-3 -left-8"
                    resizeMode="contain"
                />
            </View>
        </View>
    );
}
