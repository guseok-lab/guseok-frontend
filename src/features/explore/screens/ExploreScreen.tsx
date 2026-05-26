import React, { useState } from "react";
import { Alert, Modal, ScrollView } from "react-native";
import {
    SafeAreaProvider,
    SafeAreaView,
} from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

import ExploreHeader from "../components/ExploreHeader";
import InfoInputRow from "../components/InfoInputRow";
import RadioGroup from "../components/RadioGroup";
import UploadRow from "../components/UploadRow";
import NextButton from "../components/NextButton";
import Section from "../components/Section";

import VideoUploadScreen from "./VideoUploadScreen";
import AIResultScreen from "./AIResultScreen";
import DroneConnectScreen from "./DroneConnectScreen";
import DroneCameraScreen from "./DroneCameraScreen";
import SwipeBackWrapper from "../../../navigation/components/SwipeBackWrapper";
import type { MissingPersonForm } from "../../../types/missingPersonForm";

import { createSearch, getImageUploadUrl } from "../../../api/searches";
import {
    basenameFromUri,
    guessContentType,
    uploadToPresignedUrl,
} from "../../../lib/upload";

type Flow = "video" | "drone";

export default function ExploreScreen() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState<"남" | "여" | null>(null);

    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    const [appearance, setAppearance] = useState("");
    const [photoUri, setPhotoUri] = useState<string | null>(null);

    const [searchMethod, setSearchMethod] = useState<
        "영상첨부" | "드론연결" | null
    >(null);

    const [activeFlow, setActiveFlow] = useState<Flow | null>(null);
    const [flowStep, setFlowStep] = useState<1 | 2>(1);
    const [searchId, setSearchId] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormValid =
        name.trim() !== "" &&
        age.trim() !== "" &&
        gender !== null &&
        height.trim() !== "" &&
        weight.trim() !== "" &&
        appearance.trim() !== "" &&
        photoUri !== null &&
        searchMethod !== null;

    const handlePickPhoto = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            Alert.alert("권한 필요", "사진 첨부를 위해 사진 접근 권한이 필요합니다.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 0.8,
        });

        if (!result.canceled) {
            setPhotoUri(result.assets[0].uri);
        }
    };

    const handleNext = async () => {
        if (!isFormValid || isSubmitting) return;

        setIsSubmitting(true);
        try {
            // 1) 기준 사진 업로드 URL 발급 → OCI 직업로드 → objectKey 획득
            const photoName = basenameFromUri(photoUri!);
            const img = await getImageUploadUrl(photoName);
            await uploadToPresignedUrl(
                photoUri!,
                img.uploadUrl,
                guessContentType(photoName),
            );

            // 2) 탐색 생성 (objectKey + 폼 데이터)
            const created = await createSearch({
                gender: gender === "남" ? "남성" : "여성",
                height: Number(height),
                weight: Number(weight),
                appearance,
                searchMode: searchMethod === "영상첨부" ? "VIDEO" : "DRONE",
                targetImageObjectKey: img.objectKey,
            });

            setSearchId(created.searchId);
            setFlowStep(1);
            setActiveFlow(searchMethod === "영상첨부" ? "video" : "drone");
        } catch (e: any) {
            Alert.alert(
                "탐색 생성 실패",
                e?.message ?? "잠시 후 다시 시도해주세요.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeFlow = () => {
        setActiveFlow(null);
        setFlowStep(1);
        setSearchId(null);
    };

    const goBack = () => {
        if (flowStep > 1) setFlowStep((flowStep - 1) as 1);
        else closeFlow();
    };

    const goNext = () => setFlowStep(2);

    const formData: MissingPersonForm | null = isFormValid
        ? {
            name,
            age,
            gender: gender!,
            height,
            weight,
            appearance,
            photoUri: photoUri!,
        }
        : null;

    return (
        <SafeAreaView className="flex-1 bg-bg">
            <ScrollView
                className="flex-1 px-5"
                contentContainerClassName="pt-4 pb-32"
                showsVerticalScrollIndicator={false}
            >
                <ExploreHeader
                    title="실종자를 함께 찾아요"
                    highlight="실종자"
                    subtitle="찾고자 하는 사람의 정보를 입력해주세요"
                />

                <Section title="기본 정보">
                    <InfoInputRow
                        label="이름"
                        value={name}
                        onChangeText={setName}
                        required
                    />
                    <InfoInputRow
                        label="나이"
                        value={age}
                        onChangeText={setAge}
                        unit="세"
                        keyboardType="number-pad"
                        maxLength={3}
                        required
                    />
                    <RadioGroup
                        label="성별"
                        value={gender}
                        options={["남", "여"]}
                        onChange={setGender}
                        required
                    />
                </Section>

                <Section title="신체 정보">
                    <InfoInputRow
                        label="키"
                        value={height}
                        onChangeText={setHeight}
                        unit="cm"
                        keyboardType="number-pad"
                        maxLength={3}
                        required
                    />
                    <InfoInputRow
                        label="몸무게"
                        value={weight}
                        onChangeText={setWeight}
                        unit="kg"
                        keyboardType="number-pad"
                        maxLength={3}
                        required
                    />
                </Section>

                <Section title="인상착의">
                    <InfoInputRow
                        label="인상착의"
                        value={appearance}
                        onChangeText={setAppearance}
                        placeholder="옷차림, 머리 스타일 등을 입력해주세요"
                        fill
                        required
                    />
                    <UploadRow
                        title="사진 첨부"
                        value={photoUri ? "첨부 완료" : "사진 선택"}
                        onPress={handlePickPhoto}
                        required
                    />
                </Section>

                <Section title="탐색 방식" isLast>
                    <RadioGroup
                        label="선택"
                        value={searchMethod}
                        options={["영상첨부", "드론연결"]}
                        onChange={setSearchMethod}
                        required
                    />
                </Section>

                <NextButton
                    title={isSubmitting ? "전송 중..." : "다음"}
                    onPress={handleNext}
                    disabled={!isFormValid || isSubmitting}
                />
            </ScrollView>

            <Modal
                visible={
                    activeFlow !== null && formData !== null && searchId !== null
                }
                animationType="slide"
                onRequestClose={closeFlow}
                presentationStyle="pageSheet"
            >
                <SafeAreaProvider>
                    <SwipeBackWrapper onClose={goBack}>
                        {activeFlow === "video" &&
                            flowStep === 1 &&
                            formData &&
                            searchId !== null && (
                                <VideoUploadScreen
                                    formData={formData}
                                    searchId={searchId}
                                    onClose={goBack}
                                    onNext={goNext}
                                />
                            )}
                        {activeFlow === "video" &&
                            flowStep === 2 &&
                            formData &&
                            searchId !== null && (
                                <AIResultScreen
                                    formData={formData}
                                    searchId={searchId}
                                    onClose={goBack}
                                />
                            )}
                        {activeFlow === "drone" &&
                            flowStep === 1 &&
                            formData &&
                            searchId !== null && (
                                <DroneConnectScreen
                                    formData={formData}
                                    searchId={searchId}
                                    onClose={goBack}
                                    onNext={goNext}
                                />
                            )}
                        {activeFlow === "drone" &&
                            flowStep === 2 &&
                            formData &&
                            searchId !== null && (
                                <DroneCameraScreen
                                    formData={formData}
                                    searchId={searchId}
                                    onClose={goBack}
                                />
                            )}
                    </SwipeBackWrapper>
                </SafeAreaProvider>
            </Modal>
        </SafeAreaView>
    );
}
