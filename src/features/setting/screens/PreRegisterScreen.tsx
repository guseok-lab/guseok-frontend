import React, { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import type { ImagePickerAsset } from "expo-image-picker";

import DetailHeader from "../../../navigation/components/DetailHeader";
import Section from "../../explore/components/Section";
import InfoInputRow from "../../explore/components/InfoInputRow";
import RadioGroup from "../../explore/components/RadioGroup";
import UploadRow from "../../explore/components/UploadRow";
import DescriptionInput from "../../explore/components/DescriptionInput";
import ConfirmModal from "../components/ConfirmModal";

import {
    createMissingPerson,
    getMissingPersonImageUploadUrl,
    type BodyType,
    type Gender,
} from "../../../api/missingPersons";
import {
    basenameFromUri,
    guessContentType,
    uploadToPresignedUrl,
} from "../../../lib/upload";

interface PreRegisterScreenProps {
    onClose?: () => void;
}

type GenderKr = "남" | "여";
type BodyTypeKr = "마른" | "보통" | "통통";

const GENDER_MAP: Record<GenderKr, Gender> = {
    "남": "MALE",
    "여": "FEMALE",
};

const BODY_TYPE_MAP: Record<BodyTypeKr, BodyType> = {
    "마른": "THIN",
    "보통": "NORMAL",
    "통통": "CHUBBY",
};

export default function PreRegisterScreen({ onClose }: PreRegisterScreenProps) {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState<GenderKr | null>(null);

    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bodyType, setBodyType] = useState<BodyTypeKr | null>(null);

    const [appearance, setAppearance] = useState("");
    const [photoAsset, setPhotoAsset] = useState<ImagePickerAsset | null>(null);

    const [lastLocation, setLastLocation] = useState("");
    const [circumstance, setCircumstance] = useState("");
    const [contact, setContact] = useState("");

    const [modalVisible, setModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const hasAny =
        name.trim() !== "" ||
        age.trim() !== "" ||
        gender !== null ||
        height.trim() !== "" ||
        weight.trim() !== "" ||
        bodyType !== null ||
        appearance.trim() !== "" ||
        photoAsset !== null ||
        lastLocation.trim() !== "" ||
        circumstance.trim() !== "" ||
        contact.trim() !== "";

    const isAllValid =
        name.trim() !== "" &&
        age.trim() !== "" &&
        gender !== null &&
        height.trim() !== "" &&
        weight.trim() !== "" &&
        bodyType !== null &&
        appearance.trim() !== "" &&
        photoAsset !== null &&
        lastLocation.trim() !== "" &&
        circumstance.trim() !== "" &&
        contact.trim() !== "";

    const handlePickPhoto = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("권한 필요", "사진 첨부를 위해 권한이 필요합니다.");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        });
        if (!result.canceled) {
            setPhotoAsset(result.assets[0]);
        }
    };

    const handleSaveDraft = () => {
        Alert.alert("임시 저장되었습니다");
    };

    const handlePublish = () => {
        setModalVisible(true);
    };

    const handleConfirm = async () => {
        if (isSubmitting) return;
        if (!isAllValid || !gender || !bodyType || !photoAsset) return;

        setIsSubmitting(true);
        try {
            const filename =
                photoAsset.fileName ?? basenameFromUri(photoAsset.uri);
            const contentType =
                photoAsset.mimeType ?? guessContentType(filename);

            const { objectKey, uploadUrl } =
                await getMissingPersonImageUploadUrl(filename);
            await uploadToPresignedUrl(photoAsset.uri, uploadUrl, contentType);

            await createMissingPerson({
                name: name.trim(),
                age: Number(age),
                gender: GENDER_MAP[gender],
                height: Number(height),
                weight: Number(weight),
                bodyType: BODY_TYPE_MAP[bodyType],
                appearanceDescription: appearance.trim(),
                lastLocation: lastLocation.trim(),
                missingCircumstance: circumstance.trim(),
                contact: contact.trim(),
                photoObjectKey: objectKey,
            });

            setModalVisible(false);
            Alert.alert("등록되었습니다", "홈 화면에 노출됩니다.", [
                { text: "확인", onPress: onClose },
            ]);
        } catch (e: any) {
            Alert.alert("등록 실패", e?.message ?? "다시 시도해주세요.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-bg">
            <DetailHeader title="실종자 사전 등록" onBack={onClose} />

            <ScrollView
                className="flex-1 px-5"
                contentContainerClassName="pt-2 pb-32"
                showsVerticalScrollIndicator={false}
            >
                <Section title="기본 정보">
                    <InfoInputRow
                        label="이름"
                        value={name}
                        onChangeText={setName}
                    />
                    <InfoInputRow
                        label="나이"
                        value={age}
                        onChangeText={setAge}
                        unit="세"
                        keyboardType="number-pad"
                        maxLength={3}
                    />
                    <RadioGroup
                        label="성별"
                        value={gender}
                        options={["남", "여"]}
                        onChange={setGender}
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
                    />
                    <InfoInputRow
                        label="몸무게"
                        value={weight}
                        onChangeText={setWeight}
                        unit="kg"
                        keyboardType="number-pad"
                        maxLength={3}
                    />
                    <RadioGroup
                        label="체형"
                        value={bodyType}
                        options={["마른", "보통", "통통"]}
                        onChange={setBodyType}
                    />
                </Section>

                <Section title="인상착의">
                    <InfoInputRow
                        label="인상착의"
                        value={appearance}
                        onChangeText={setAppearance}
                        placeholder="옷차림, 머리 스타일 등을 입력해주세요"
                        fill
                    />
                    <UploadRow
                        title="사진 첨부"
                        value={photoAsset ? "첨부 완료" : "사진 선택"}
                        onPress={handlePickPhoto}
                    />
                </Section>

                <Section title="실종 정황" isLast>
                    <InfoInputRow
                        label="마지막 위치"
                        value={lastLocation}
                        onChangeText={setLastLocation}
                        placeholder="예) 공주역 인근"
                        fill
                    />
                    <DescriptionInput
                        title="실종 경위"
                        value={circumstance}
                        onChangeText={setCircumstance}
                        placeholder="언제, 어디서, 어떤 상황이었는지 입력해주세요"
                    />
                    <InfoInputRow
                        label="연락처"
                        value={contact}
                        onChangeText={setContact}
                        placeholder="010-0000-0000"
                        keyboardType="phone-pad"
                        fill
                    />
                </Section>

                <Text className="text-bk text-sm leading-5 mt-6">
                    실종되었다면 홈화면 노출 버튼을 눌러주세요{"\n"}
                    구석구석 홈 화면에 작성 내용이 노출돼요
                </Text>

                <View className="flex-row gap-3 mt-4">
                    <Pressable
                        onPress={handlePublish}
                        disabled={!isAllValid || isSubmitting}
                        className={`flex-1 h-12 items-center justify-center rounded-xl ${
                            isAllValid ? "bg-primary" : "bg-gr200/30"
                        }`}
                    >
                        <Text
                            className={`text-base font-bold ${
                                isAllValid ? "text-bk" : "text-gr200"
                            }`}
                        >
                            홈화면 노출
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={handleSaveDraft}
                        disabled={!hasAny || isSubmitting}
                        className={`flex-1 h-12 items-center justify-center rounded-xl border ${
                            hasAny
                                ? "border-primary bg-wh"
                                : "border-gr200/40 bg-gr200/10"
                        }`}
                    >
                        <Text
                            className={`text-base font-bold ${
                                hasAny ? "text-bk" : "text-gr200"
                            }`}
                        >
                            임시 저장
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>

            <ConfirmModal
                visible={modalVisible}
                photoUri={photoAsset?.uri ?? null}
                name={name}
                age={age}
                appearance={appearance}
                onConfirm={handleConfirm}
                onClose={() => setModalVisible(false)}
            />
        </SafeAreaView>
    );
}
