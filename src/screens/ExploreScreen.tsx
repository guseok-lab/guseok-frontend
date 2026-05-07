import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = ["전체", "트렌드", "음악", "여행", "음식", "기술"];

const items = [
  { id: 1, tag: "트렌드", title: "2026 디자인 트렌드", sub: "UI/UX 최신 흐름 정리" },
  { id: 2, tag: "여행", title: "봄 여행 추천지 TOP 5", sub: "국내 드라이브 코스" },
  { id: 3, tag: "음식", title: "오늘 뭐 먹지?", sub: "간단하고 맛있는 레시피" },
  { id: 4, tag: "기술", title: "React Native 최신 동향", sub: "New Architecture 살펴보기" },
  { id: 5, tag: "음악", title: "이 주의 플레이리스트", sub: "집중력 높이는 노래 모음" },
];

export default function ExploreScreen() {
  const [selected, setSelected] = useState("전체");
  const [query, setQuery] = useState("");

  const filtered = items.filter((item) => {
    const matchCat = selected === "전체" || item.tag === selected;
    const matchQ = item.title.includes(query) || item.sub.includes(query);
    return matchCat && matchQ;
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-5 pt-4 pb-3">
        <Text className="text-gray-900 text-2xl font-bold mb-4">탐색</Text>

        {/* Search bar */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 gap-2">
          <Text className="text-gray-400 text-base">🔍</Text>
          <TextInput
            className="flex-1 text-gray-800 text-sm"
            placeholder="검색어를 입력하세요"
            placeholderTextColor="#9ca3af"
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {/* Category chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-3"
          contentContainerClassName="gap-2 pr-4"
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelected(cat)}
              className={`px-4 py-1.5 rounded-full border ${
                selected === cat
                  ? "bg-indigo-500 border-indigo-500"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  selected === cat ? "text-white" : "text-gray-600"
                }`}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results */}
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <View className="gap-3 pb-8 mt-1">
          {filtered.length === 0 ? (
            <View className="items-center mt-16">
              <Text className="text-4xl mb-3">🔭</Text>
              <Text className="text-gray-400 text-sm">결과가 없습니다</Text>
            </View>
          ) : (
            filtered.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="bg-gray-50 rounded-xl p-4 flex-row items-center gap-3"
                activeOpacity={0.8}
              >
                <View className="w-10 h-10 bg-indigo-100 rounded-lg items-center justify-center">
                  <Text className="text-indigo-500 font-bold text-xs">{item.tag[0]}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-semibold text-sm">{item.title}</Text>
                  <Text className="text-gray-400 text-xs mt-0.5">{item.sub}</Text>
                </View>
                <View className="bg-indigo-50 px-2 py-0.5 rounded-full">
                  <Text className="text-indigo-400 text-xs">{item.tag}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
