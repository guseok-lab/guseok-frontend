import React, { useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import DetailHeader from "../../../navigation/components/DetailHeader";
import type { RootStackParamList } from "../../../navigation/types";

type Nav = StackNavigationProp<RootStackParamList, "VideoUpload">;
type R = RouteProp<RootStackParamList, "VideoUpload">;

export default function VideoUploadScreen() {
    const navigation = useNavigation<Nav>();
    const route = useRoute<R>();
    const { formData } = route.params;

    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [videoThumb, setVideoThumb] = useState<string | null>(null);

    const handlePickVideo = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("권한 필요", "영상 첨부를 위해 권한이 필요합니다.");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            quality: 0.8,
        });
        if (!result.canceled) {
            const asset = result.assets[0];
            setVideoUri(asset.uri);
            setVideoThumb(asset.uri);
        }
    };

    const handleNext = () => {
        navigation.navigate("AIResult", { formData });
    };

    return (
        <SafeAreaView className="flex-1 bg-bg">
            <DetailHeader title="영상 첨부" />

            <ScrollView
                className="flex-1 px-5"
                contentContainerClassName="pt-2 pb-10"
                showsVerticalScrollIndicator={false}
            >
                <Text className="text-bk text-lg font-bold mb-3">
                    분석할 영상을 첨부해주세요
                </Text>

                <Pressable
                    onPress={handlePickVideo}
                    className="h-52 rounded-xl bg-gr200/30 items-center justify-center mb-6 overflow-hidden"
                >
                    {videoUri ? (
                        <View className="w-full h-full items-center justify-center bg-bk">
                            {videoThumb ? (
                                <Image
                                    source={{ uri: videoThumb }}
                                    className="w-full h-full opacity-60"
                                    resizeMode="cover"
                                />
                            ) : null}
                            <Text className="absolute text-wh text-base font-semibold">
                                ▶ 영상 첨부됨
                            </Text>
                        </View>
                    ) : (
                        <>
                            <Text className="text-gr200 text-base">
                                + 영상 선택
                            </Text>
                            <Text className="text-gr200 text-xs mt-1">
                                탭하여 갤러리에서 영상을 가져옵니다
                            </Text>
                        </>
                    )}
                </Pressable>

                <Text className="text-bk text-base font-bold mb-3">
                    입력하신 정보가 맞는지 확인해주세요
                </Text>

                <View className="bg-wh border border-gr200/40 rounded-xl p-4 mb-8">
                    <Text className="text-bk text-base mb-1">
                        • {formData.gender} / {formData.height}cm /{" "}
                        {formData.weight}kg / {formData.bodyType}
                    </Text>
                    <Text className="text-bk text-base mb-1 leading-6">
                        • {formData.appearance}
                    </Text>
                    <Text className="text-bk text-base leading-6">
                        • {formData.lastLocation}
                    </Text>
                </View>

                <Pressable
                    onPress={handleNext}
                    disabled={!videoUri}
                    className={`h-12 items-center justify-center rounded-xl ${
                        videoUri ? "bg-primary" : "bg-gr200/30"
                    }`}
                >
                    <Text
                        className={`text-lg font-bold ${
                            videoUri ? "text-bk" : "text-gr200"
                        }`}
                    >
                        다음
                    </Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}
