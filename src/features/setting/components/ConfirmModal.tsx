import React from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";

interface ConfirmModalProps {
    visible: boolean;
    photoUri: string | null;
    name: string;
    age: string;
    appearance: string;
    onConfirm: () => void;
    onClose: () => void;
}

export default function ConfirmModal({
                                         visible,
                                         photoUri,
                                         name,
                                         age,
                                         appearance,
                                         onConfirm,
                                         onClose,
                                     }: ConfirmModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 items-center justify-center bg-bk/50 px-5">
                <View className="w-full bg-wh rounded-2xl p-6">
                    <Text className="text-bk text-lg font-bold text-center mb-5">
                        입력하신 정보가 맞나요?
                    </Text>

                    <View className="flex-row items-center mb-5">
                        <View className="w-24 h-32 rounded-xl bg-gr200 mr-4 overflow-hidden">
                            {photoUri ? (
                                <Image
                                    source={{ uri: photoUri }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                            ) : null}
                        </View>

                        <View className="flex-1">
                            <Text className="text-bk text-base font-semibold">
                                {name || "이름"} /{" "}
                                {age ? `${age.padStart(2, "0")}세` : "00세"}
                            </Text>
                            <Text
                                className="text-bk text-sm mt-2 leading-5"
                                numberOfLines={3}
                            >
                                {appearance || "인상착의"}
                            </Text>
                        </View>
                    </View>

                    <Pressable
                        onPress={onConfirm}
                        className="h-11 items-center justify-center bg-primary rounded-xl mb-3"
                    >
                        <Text className="text-bk text-base font-bold">확인</Text>
                    </Pressable>

                    <Text className="text-gr200 text-xs text-center">
                        허위 정보일 경우 삭제될 수 있어요
                    </Text>
                </View>
            </View>
        </Modal>
    );
}
