import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

import DetailHeader from "../../../navigation/components/DetailHeader";
import type { MissingPersonForm } from "../../../types/missingPersonForm";

import {
    completeVideoUpload,
    getVideoUploadUrl,
} from "../../../api/searches";
import {
    basenameFromUri,
    guessContentType,
    uploadToPresignedUrl,
} from "../../../lib/upload";

interface VideoUploadScreenProps {
    formData: MissingPersonForm;
    searchId: number;
    onClose: () => void;
    onNext: () => void;
}

export default function VideoUploadScreen({
                                              formData,
                                              searchId,
                                              onClose,
                                              onNext,
                                          }: VideoUploadScreenProps) {
    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [videoThumb, setVideoThumb] = useState<string | null>(null);
    const [videoName, setVideoName] = useState<string>("video.mp4");
    const [videoMime, setVideoMime] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

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
            setVideoName(asset.fileName ?? basenameFromUri(asset.uri));
            setVideoMime(asset.mimeType ?? null);
        }
    };

    const handleSubmit = async () => {
        if (!videoUri || isUploading) return;
        setIsUploading(true);
        // DEMO HACK: 실제 업로드/탐색 호출 건너뛰고 10초 대기 후 결과 화면으로 진입.
        // 결과는 ExploreScreen 에서 고정 searchId(90) 로 받음.
        await new Promise((resolve) => setTimeout(resolve, 10000));
        onNext();
    };

    return (
        <SafeAreaView className="flex-1 bg-bg">
            <DetailHeader title="영상 첨부" onBack={onClose} />

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
                        {formData.weight}kg
                    </Text>
                    <Text className="text-bk text-base leading-6">
                        • {formData.appearance}
                    </Text>
                </View>

                <Pressable
                    onPress={handleSubmit}
                    disabled={!videoUri || isUploading}
                    className={`h-12 items-center justify-center rounded-xl ${
                        videoUri && !isUploading ? "bg-primary" : "bg-gr200/30"
                    }`}
                >
                    {isUploading ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <Text
                            className={`text-lg font-bold ${
                                videoUri ? "text-bk" : "text-gr200"
                            }`}
                        >
                            다음
                        </Text>
                    )}
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}
