import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

import ExploreHeader from "../components/ExploreHeader";
import InfoInputRow from "../components/InfoInputRow";
import RadioGroup from "../components/RadioGroup";
import UploadRow from "../components/UploadRow";
import NextButton from "../components/NextButton";
import DescriptionInput from "../components/DescriptionInput";

export default function ExploreScreen() {
  const [gender, setGender] = useState<"남" | "여" | null>(null);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [searchMethod, setSearchMethod] = useState<"영상첨부" | "드론연결" | null>(null);
  const handlePickPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

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
  const [description, setDescription] = useState("");

  return (
      <SafeAreaView className="flex-1 bg-bg">
        <ScrollView
            className="flex-1 px-5"
            contentContainerClassName="pt-8 pb-32"
            showsVerticalScrollIndicator={false}
        >
          <ExploreHeader title="탐색" />

          <Text className="text-gr200 text-[14px] mt-8 mb-5">
            찾고자 하는 사람에 대해 기입해주세요
          </Text>

          <RadioGroup
              label="성별"
              value={gender}
              options={["남", "여"]}
              onChange={setGender}
          />

          <View className="flex-col">
            <InfoInputRow
                label="키"
                value={height}
                onChangeText={setHeight}
                unit="cm"
            />

            <InfoInputRow
                label="몸무게"
                value={weight}
                onChangeText={setWeight}
                unit="kg"
            />
          </View>

          <DescriptionInput
              value={description}
              onChangeText={setDescription}
          />

          <UploadRow
              title="사진 첨부"
              value={photoUri ? "첨부 완료" : "사진 선택"}
              onPress={handlePickPhoto}
          />

          <View className="mt-6">
            <RadioGroup
                label="선택"
                value={searchMethod}
                options={["영상첨부", "드론연결"]}
                onChange={setSearchMethod}
            />
          </View>

          <NextButton title="다음" onPress={() => {}} />
        </ScrollView>
      </SafeAreaView>
  );
}