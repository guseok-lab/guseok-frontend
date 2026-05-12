import React from "react";
import {View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProfileSection from "../components/ProfileSection";
import MenuSection from "../components/MenuSection";
import MenuItem from "../components/MenuItem";
import LogoutButton from "../components/LogoutButton";

const menuList = [
  {
    id: 1,
    title: "탐색 기록",
  },
  {
    id: 2,
    title: "실종자 사전 등록",
  },
  {
    id: 3,
    title: "자주 묻는 질문",
  },
  {
    id: 4,
    title: "이용 약관",
  },
  {
    id: 5,
    title: "알림 설정",
  },
];

export default function SettingsScreen() {
  return (
      <SafeAreaView className="flex-1 bg-bg">
        <View className="flex-1 px-5">
          <ProfileSection />

          <MenuSection>
            {menuList.map((menu) => (
                <MenuItem
                    key={menu.id}
                    title={menu.title}
                />
            ))}
          </MenuSection>

          <LogoutButton />
        </View>
      </SafeAreaView>
  );
}