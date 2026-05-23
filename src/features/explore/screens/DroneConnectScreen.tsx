import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import DetailHeader from "../../../navigation/components/DetailHeader";
import type { RootStackParamList } from "../../../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList, "DroneConnect">;
type R = RouteProp<RootStackParamList, "DroneConnect">;

export default function DroneConnectScreen() {
    const navigation = useNavigation<Nav>();
    const route = useRoute<R>();
    const { formData } = route.params;

    return (
        <SafeAreaView className="flex-1 bg-bg">
            <DetailHeader title="드론 연결" />

            <ScrollView
                className="flex-1 px-5"
                contentContainerClassName="pt-4 pb-10"
                showsVerticalScrollIndicator={false}
            >
                <Text className="text-bk text-base text-center mb-6">
                    같은 WIFI를 사용하고 있는지 확인해주세요
                </Text>

                <View className="flex-row items-center justify-between mb-3 px-1">
                    <Text className="text-bk text-lg font-bold">드론</Text>
                    <Text className="text-bk text-base underline">
                        이름 어쩌구저쩌구
                    </Text>
                </View>
                <View className="h-px bg-gr200/40 mb-6" />

                <Text className="text-bk text-base font-bold text-center mb-4">
                    입력하신 정보가 맞는지 확인해주세요
                </Text>

                <View className="bg-wh border border-gr200/40 rounded-xl p-4 mb-6">
                    <Text className="text-bk text-base">
                        • {formData.gender} / {formData.height}cm /{" "}
                        {formData.weight}kg / {formData.bodyType}
                    </Text>
                    <Text className="text-bk text-base mt-2 leading-6">
                        • {formData.appearance}
                    </Text>
                    <Text className="text-bk text-base mt-2 leading-6">
                        • {formData.lastLocation}
                    </Text>
                </View>

                <View className="w-full aspect-video rounded-xl bg-gr200/40 items-center justify-center mb-8">
                    <Text className="text-gr200 text-base">사진</Text>
                </View>

                <Pressable
                    onPress={() => navigation.navigate("DroneCamera", { formData })}
                    className="h-12 items-center justify-center rounded-xl bg-primary"
                >
                    <Text className="text-bk text-lg font-bold">다음</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}
