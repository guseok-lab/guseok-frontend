import React, { useState } from "react";
import { Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DetailHeader from "../../../navigation/components/DetailHeader";

interface NotificationSettingScreenProps {
    onClose?: () => void;
}

export default function NotificationSettingScreen({
                                                      onClose,
                                                  }: NotificationSettingScreenProps) {
    const [enabled, setEnabled] = useState(true);

    return (
        <SafeAreaView className="flex-1 bg-bg">
            <DetailHeader title="알림 설정" onBack={onClose} />

            <View className="px-5 pt-4">
                <View className="flex-row items-center justify-between bg-wh border border-gr200/40 rounded-xl px-4 py-3">
                    <Text className="text-bk text-base font-semibold">
                        알림 받기
                    </Text>
                    <Switch
                        value={enabled}
                        onValueChange={setEnabled}
                        trackColor={{ false: "#B2B2B2", true: "#FDD54B" }}
                        thumbColor="#FFFFFF"
                        ios_backgroundColor="#B2B2B2"
                        style={{ alignSelf: "center" }}
                    />
                </View>

                <Text className="text-gr200 text-sm mt-3 leading-5">
                    실종자 발견·사전 등록 알림 등 서비스 알림을 받아볼 수 있어요.
                </Text>
            </View>
        </SafeAreaView>
    );
}
