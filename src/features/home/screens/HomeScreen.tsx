import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeHeader from "../components/HomeHeader";
import SearchStatusBanner from "../components/SearchStatusBanner";
import MissingPersonCard from "../components/MissingPersonCard";

import {
    getSearchingCount,
    getSearchingMissingPersons,
    type MissingPerson,
} from "../../../api/missingPersons";

export default function HomeScreen() {
    const [list, setList] = useState<MissingPerson[]>([]);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const load = async () => {
        const [persons, c] = await Promise.all([
            getSearchingMissingPersons(),
            getSearchingCount(),
        ]);
        setList(persons);
        setCount(c);
    };

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                await load();
            } catch (e: any) {
                if (!mounted) return;
                setError(e?.message ?? "목록을 불러오지 못했습니다.");
            } finally {
                if (mounted) setIsLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        setError(null);
        try {
            await load();
        } catch (e: any) {
            setError(e?.message ?? "목록을 불러오지 못했습니다.");
        } finally {
            setIsRefreshing(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-bg">
            <ScrollView
                className="flex-1 px-5"
                contentContainerClassName="pt-4 pb-32"
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                    />
                }
            >
                <HomeHeader />

                <SearchStatusBanner count={count} />

                {isLoading ? (
                    <View className="items-center py-20">
                        <ActivityIndicator />
                    </View>
                ) : error ? (
                    <View className="items-center py-20">
                        <Text className="text-gr200 text-sm">{error}</Text>
                    </View>
                ) : list.length === 0 ? (
                    <View className="items-center py-20">
                        <Text className="text-gr200 text-sm">
                            현재 탐색 중인 실종자가 없습니다.
                        </Text>
                    </View>
                ) : (
                    list.map((item) => (
                        <MissingPersonCard
                            key={item.missingPersonId}
                            item={item}
                        />
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
