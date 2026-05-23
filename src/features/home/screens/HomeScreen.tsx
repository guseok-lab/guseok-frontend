import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeHeader from "../components/HomeHeader";
import SearchStatusBanner from "../components/SearchStatusBanner";
import MissingPersonCard from "../components/MissingPersonCard";

import { missingPersonMockData } from "../../../mocks/missingPersonMockData";

export default function HomeScreen() {
    return (
        <SafeAreaView className="flex-1 bg-bg">
            <ScrollView
                className="flex-1 px-5"
                contentContainerClassName="pt-4 pb-32"
                showsVerticalScrollIndicator={false}
            >
                <HomeHeader />

                <SearchStatusBanner count={missingPersonMockData.length} />

                {missingPersonMockData.map((item) => (
                    <MissingPersonCard key={item.id} item={item} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
