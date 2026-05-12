import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SettingRowProps = {
  icon: string;
  label: string;
  value?: string;
  toggle?: boolean;
  toggled?: boolean;
  onToggle?: (v: boolean) => void;
  onPress?: () => void;
};

function SettingRow({ icon, label, value, toggle, toggled, onToggle, onPress }: SettingRowProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center px-4 py-3.5"
      activeOpacity={toggle ? 1 : 0.7}
      onPress={onPress}
    >
      <View className="w-8 h-8 bg-indigo-50 rounded-lg items-center justify-center mr-3">
        <Text className="text-base">{icon}</Text>
      </View>
      <Text className="flex-1 text-gray-800 text-sm font-medium">{label}</Text>
      {toggle ? (
        <Switch
          value={toggled}
          onValueChange={onToggle}
          trackColor={{ false: "#e5e7eb", true: "#6366f1" }}
          thumbColor="#ffffff"
        />
      ) : (
        <View className="flex-row items-center gap-1">
          {value && <Text className="text-gray-400 text-sm">{value}</Text>}
          <Text className="text-gray-300">›</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

type SectionProps = { title: string; children: React.ReactNode };

function Section({ title, children }: SectionProps) {
  return (
    <View className="mb-5">
      <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider px-4 mb-1">
        {title}
      </Text>
      <View className="bg-gray-50 rounded-2xl mx-4 overflow-hidden divide-y divide-gray-100">
        {children}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile header */}
        <View className="items-center py-8 px-5">
          <View className="w-20 h-20 bg-indigo-500 rounded-full items-center justify-center mb-3">
            <Text className="text-white text-3xl font-bold">G</Text>
          </View>
          <Text className="text-gray-900 text-lg font-bold">Guest User</Text>
          <Text className="text-gray-400 text-sm mt-0.5">guest@example.com</Text>
          <TouchableOpacity className="mt-3 border border-indigo-500 px-5 py-1.5 rounded-full">
            <Text className="text-indigo-500 text-sm font-semibold">프로필 편집</Text>
          </TouchableOpacity>
        </View>

        {/* Sections */}
        <Section title="알림">
          <SettingRow
            icon="🔔"
            label="푸시 알림"
            toggle
            toggled={notifications}
            onToggle={setNotifications}
          />
        </Section>

        <Section title="화면">
          <SettingRow
            icon="🌙"
            label="다크 모드"
            toggle
            toggled={darkMode}
            onToggle={setDarkMode}
          />
          <SettingRow icon="🌐" label="언어" value="한국어" />
        </Section>

        <Section title="일반">
          <SettingRow icon="📊" label="사용 통계 수집" toggle toggled={analytics} onToggle={setAnalytics} />
          <SettingRow icon="🔒" label="개인정보 처리방침" />
          <SettingRow icon="📄" label="이용약관" />
        </Section>

        <Section title="앱 정보">
          <SettingRow icon="ℹ️" label="버전" value="1.0.0" />
          <SettingRow icon="🐛" label="오류 신고" />
        </Section>

        {/* Logout */}
        <View className="px-4 pb-8 mt-2">
          <TouchableOpacity className="bg-red-50 rounded-2xl py-3.5 items-center">
            <Text className="text-red-500 font-semibold">로그아웃</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
