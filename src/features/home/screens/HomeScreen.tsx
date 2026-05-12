import React from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeHeader from "../components/HomeHeader";
import MissingPersonCard from "../components/MissingPersonCard";
import LogoInfoSection from "../components/LogoInfoSection";

import { missingPersonMockData } from "../../../mocks/missingPersonMockData";

export default function HomeScreen() {
    return (
        <SafeAreaView className="flex-1 bg-bg">
            <ScrollView
                className="flex-1 px-5"
                contentContainerClassName="pt-4 pb-8"
                showsVerticalScrollIndicator={false}
            >
                <HomeHeader />

                <Text className="text-bk text-lg font-bold mb-4">
                    여러분의 관심이 필요해요
                </Text>

                {missingPersonMockData.map((item, index) => (
                    <MissingPersonCard
                        key={item.id}
                        item={item}
                        reverse={index % 2 === 1}
                    />
                ))}

                <LogoInfoSection />
            </ScrollView>
        </SafeAreaView>
    );
}