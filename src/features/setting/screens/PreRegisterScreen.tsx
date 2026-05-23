import React, { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

import DetailHeader from "../../../navigation/components/DetailHeader";
import Section from "../../explore/components/Section";
import InfoInputRow from "../../explore/components/InfoInputRow";
import RadioGroup from "../../explore/components/RadioGroup";
import UploadRow from "../../explore/components/UploadRow";
import DescriptionInput from "../../explore/components/DescriptionInput";
import ConfirmModal from "../components/ConfirmModal";

interface PreRegisterScreenProps {
    onClose?: () => void;
}

export default function PreRegisterScreen({ onClose }: PreRegisterScreenProps) {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState<"남" | "여" | null>(null);

    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bodyType, setBodyType] = useState<"마른" | "보통" | "통통" | null>(
        null,
    );

    const [appearance, setAppearance] = useState("");
    const [photoUri, setPhotoUri] = useState<string | null>(null);

    const [lastLocation, setLastLocation] = useState("");
    const [circumstance, setCircumstance] = useState("");

    const [modalVisible, setModalVisible] = useState(false);

    const hasAny =
        name.trim() !== "" ||
        age.trim() !== "" ||
        gender !== null ||
        height.trim() !== "" ||
        weight.trim() !== "" ||
        bodyType !== null ||
        appearance.trim() !== "" ||
        photoUri !== null ||
        lastLocation.trim() !== "" ||
        circumstance.trim() !== "";

    const isAllValid =
        name.trim() !== "" &&
        age.trim() !== "" &&
        gender !== null &&
        height.trim() !== "" &&
        weight.trim() !== "" &&
        bodyType !== null &&
        appearance.trim() !== "" &&
        photoUri !== null &&
        lastLocation.trim() !== "" &&
        circumstance.trim() !== "";

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
            setPhotoUri(result.assets[0].uri);
        }
    };

    const handleSaveDraft = () => {
        Alert.alert("임시 저장되었습니다");
    };

    const handlePublish = () => {
        setModalVisible(true);
    };

    const handleConfirm = () => {
        setModalVisible(false);
        Alert.alert("등록되었습니다", "홈 화면에 노출됩니다.");
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
                        value={photoUri ? "첨부 완료" : "사진 선택"}
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
                </Section>

                <Text className="text-bk text-sm leading-5 mt-6">
                    실종되었다면 홈화면 노출 버튼을 눌러주세요{"\n"}
                    구석구석 홈 화면에 작성 내용이 노출돼요
                </Text>

                <View className="flex-row gap-3 mt-4">
                    <Pressable
                        onPress={handlePublish}
                        disabled={!isAllValid}
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
                        disabled={!hasAny}
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
                photoUri={photoUri}
                name={name}
                age={age}
                appearance={appearance}
                onConfirm={handleConfirm}
                onClose={() => setModalVisible(false)}
            />
        </SafeAreaView>
    );
}
