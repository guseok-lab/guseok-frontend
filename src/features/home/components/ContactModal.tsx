import React from "react";
import { Linking, Modal, Pressable, Text, View } from "react-native";

interface ContactModalProps {
    visible: boolean;
    name: string;
    contact: string;
    onClose: () => void;
}

export default function ContactModal({
    visible,
    name,
    contact,
    onClose,
}: ContactModalProps) {
    const handleCall = async () => {
        const tel = `tel:${contact.replace(/[^0-9+]/g, "")}`;
        try {
            await Linking.openURL(tel);
        } finally {
            onClose();
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 items-center justify-center bg-bk/50 px-5">
                <View className="w-full bg-wh rounded-2xl p-6">
                    <Text className="text-bk text-lg font-bold text-center mb-2">
                        {name} 님께 연락할까요?
                    </Text>

                    <Text className="text-gr200 text-sm text-center mb-4">
                        등록자가 남긴 연락처로 바로 전화를 걸 수 있어요.
                    </Text>

                    <View className="bg-bg rounded-xl py-4 mb-5 items-center">
                        <Text className="text-bk text-xl font-bold tracking-wider">
                            {contact || "연락처 미등록"}
                        </Text>
                    </View>

                    <View className="flex-row gap-3">
                        <Pressable
                            onPress={onClose}
                            className="flex-1 h-11 items-center justify-center rounded-xl border border-gr200/40 bg-wh"
                        >
                            <Text className="text-bk text-base font-bold">
                                취소
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={handleCall}
                            disabled={!contact}
                            className={`flex-1 h-11 items-center justify-center rounded-xl ${
                                contact ? "bg-primary" : "bg-gr200/30"
                            }`}
                        >
                            <Text
                                className={`text-base font-bold ${
                                    contact ? "text-bk" : "text-gr200"
                                }`}
                            >
                                전화 걸기
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
