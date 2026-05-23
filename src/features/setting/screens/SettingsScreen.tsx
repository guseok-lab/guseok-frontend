import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import SettingsHeader from "../components/SettingsHeader";
import ProfileSection from "../components/ProfileSection";
import MenuSection from "../components/MenuSection";
import MenuItem from "../components/MenuItem";
import LogoutButton from "../components/LogoutButton";
import type { RootStackParamList } from "../../../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

const menus: { id: number; title: string; route: keyof RootStackParamList }[] =
    [
        { id: 1, title: "실종자 사전 등록", route: "PreRegister" },
        { id: 2, title: "자주 묻는 질문", route: "Faq" },
        { id: 3, title: "이용 약관", route: "Terms" },
        { id: 4, title: "알림 설정", route: "NotificationSetting" },
    ];

export default function SettingsScreen() {
    const navigation = useNavigation<Nav>();

    return (
        <SafeAreaView className="flex-1 bg-bg">
            <ScrollView
                className="flex-1 px-5"
                contentContainerClassName="pt-4 pb-32"
                showsVerticalScrollIndicator={false}
            >
                <SettingsHeader />

                <ProfileSection />

                <MenuSection>
                    {menus.map((menu, idx) => (
                        <MenuItem
                            key={menu.id}
                            title={menu.title}
                            onPress={() =>
                                navigation.navigate(menu.route as never)
                            }
                            isLast={idx === menus.length - 1}
                        />
                    ))}
                </MenuSection>

                <LogoutButton />
            </ScrollView>
        </SafeAreaView>
    );
}
