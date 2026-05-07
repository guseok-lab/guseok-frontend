import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const cards = [
  { id: 1, title: "오늘의 날씨", desc: "맑음 · 22°C", color: "bg-blue-100" },
  { id: 2, title: "할 일 목록", desc: "3개 남음", color: "bg-violet-100" },
  { id: 3, title: "최근 활동", desc: "방금 전 업데이트", color: "bg-emerald-100" },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-6">
          <Text className="text-gray-400 text-sm font-medium">안녕하세요 👋</Text>
          <Text className="text-gray-900 text-2xl font-bold mt-1">홈</Text>
        </View>

        {/* Hero banner */}
        <View className="bg-indigo-500 rounded-2xl p-5 mb-6">
          <Text className="text-white text-xs font-semibold uppercase tracking-widest mb-1">
            Today
          </Text>
          <Text className="text-white text-lg font-bold leading-snug">
            오늘도 좋은 하루 보내세요!
          </Text>
          <TouchableOpacity className="mt-4 bg-white/20 self-start px-4 py-2 rounded-full">
            <Text className="text-white text-sm font-semibold">시작하기</Text>
          </TouchableOpacity>
        </View>

        {/* Section title */}
        <Text className="text-gray-800 text-base font-bold mb-3">빠른 메뉴</Text>

        {/* Cards */}
        <View className="gap-3 mb-8">
          {cards.map((card) => (
            <TouchableOpacity
              key={card.id}
              className={`${card.color} rounded-xl p-4 flex-row items-center justify-between`}
              activeOpacity={0.8}
            >
              <View>
                <Text className="text-gray-800 font-semibold text-base">{card.title}</Text>
                <Text className="text-gray-500 text-sm mt-0.5">{card.desc}</Text>
              </View>
              <Text className="text-gray-400 text-lg">›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
