import React, { useState } from "react";
import { Modal, ScrollView } from "react-native";
import {
    SafeAreaProvider,
    SafeAreaView,
} from "react-native-safe-area-context";

import SettingsHeader from "../components/SettingsHeader";
import ProfileSection from "../components/ProfileSection";
import MenuSection from "../components/MenuSection";
import MenuItem from "../components/MenuItem";
import LogoutButton from "../components/LogoutButton";

import PreRegisterScreen from "./PreRegisterScreen";
import FaqScreen from "./FaqScreen";
import TermsScreen from "./TermsScreen";
import NotificationSettingScreen from "./NotificationSettingScreen";
import SwipeBackWrapper from "../../../navigation/components/SwipeBackWrapper";

import LoginScreen from "../../auth/LoginScreen";
import { useAuth } from "../../auth/AuthContext";

type DetailRoute = "PreRegister" | "Faq" | "Terms" | "NotificationSetting";

const menus: { id: number; title: string; route: DetailRoute }[] = [
    { id: 1, title: "실종자 사전 등록", route: "PreRegister" },
    { id: 2, title: "자주 묻는 질문", route: "Faq" },
    { id: 3, title: "이용 약관", route: "Terms" },
    { id: 4, title: "알림 설정", route: "NotificationSetting" },
];

export default function SettingsScreen() {
    const { isAuthenticated, user, signOut } = useAuth();
    const [activeDetail, setActiveDetail] = useState<DetailRoute | null>(null);
    const close = () => setActiveDetail(null);

    if (!isAuthenticated) {
        return <LoginScreen />;
    }

    return (
        <SafeAreaView className="flex-1 bg-bg">
            <ScrollView
                className="flex-1 px-5"
                contentContainerClassName="pt-4 pb-32"
                showsVerticalScrollIndicator={false}
            >
                <SettingsHeader />

                <ProfileSection
                    name={user?.nickname ?? "회원"}
                    description="오늘도 함께 찾아주셔서 감사해요"
                />

                <MenuSection>
                    {menus.map((menu, idx) => (
                        <MenuItem
                            key={menu.id}
                            title={menu.title}
                            onPress={() => setActiveDetail(menu.route)}
                            isLast={idx === menus.length - 1}
                        />
                    ))}
                </MenuSection>

                <LogoutButton onPress={signOut} />
            </ScrollView>

            <Modal
                visible={activeDetail !== null}
                animationType="slide"
                onRequestClose={close}
                presentationStyle="pageSheet"
            >
                <SafeAreaProvider>
                    <SwipeBackWrapper onClose={close}>
                        {activeDetail === "PreRegister" && (
                            <PreRegisterScreen onClose={close} />
                        )}
                        {activeDetail === "Faq" && <FaqScreen onClose={close} />}
                        {activeDetail === "Terms" && <TermsScreen onClose={close} />}
                        {activeDetail === "NotificationSetting" && (
                            <NotificationSettingScreen onClose={close} />
                        )}
                    </SwipeBackWrapper>
                </SafeAreaProvider>
            </Modal>
        </SafeAreaView>
    );
}
