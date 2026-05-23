import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SettingsHeader from "../components/SettingsHeader";
import ProfileSection from "../components/ProfileSection";
import MenuSection from "../components/MenuSection";
import MenuItem from "../components/MenuItem";
import LogoutButton from "../components/LogoutButton";

const activityMenu = [
    { id: 1, title: "탐색 기록" },
    { id: 2, title: "실종자 사전 등록" },
];

const supportMenu = [
    { id: 3, title: "자주 묻는 질문" },
    { id: 4, title: "이용 약관" },
    { id: 5, title: "알림 설정" },
];

export default function SettingsScreen() {
    return (
        <SafeAreaView className="flex-1 bg-bg">
            <ScrollView
                className="flex-1 px-5"
                contentContainerClassName="pt-4 pb-32"
                showsVerticalScrollIndicator={false}
            >
                <SettingsHeader />

                <ProfileSection />

                <MenuSection title="활동">
                    {activityMenu.map((menu, idx) => (
                        <MenuItem
                            key={menu.id}
                            title={menu.title}
                            isLast={idx === activityMenu.length - 1}
                        />
                    ))}
                </MenuSection>

                <MenuSection title="지원">
                    {supportMenu.map((menu, idx) => (
                        <MenuItem
                            key={menu.id}
                            title={menu.title}
                            isLast={idx === supportMenu.length - 1}
                        />
                    ))}
                </MenuSection>

                <LogoutButton />
            </ScrollView>
        </SafeAreaView>
    );
}
