import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DetailHeader from "../../../navigation/components/DetailHeader";
import type { MissingPersonForm } from "../../../types/missingPersonForm";

import {
    getSearchResults,
    type SearchResult,
} from "../../../api/searches";

interface AIResultScreenProps {
    formData: MissingPersonForm;
    searchId: number;
    capturedUri?: string;
    onClose: () => void;
    // 제공되면 결과 화면 하단에 "완료" 버튼을 띄우고, 누르면 전체 플로우를 닫는다.
    onComplete?: () => void;
}

const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 3 * 60 * 1000; // 3분

export default function AIResultScreen({
    formData,
    searchId,
    capturedUri,
    onClose,
    onComplete,
}: AIResultScreenProps) {
    const [results, setResults] = useState<SearchResult[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [timedOut, setTimedOut] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [elapsedSec, setElapsedSec] = useState(0);

    // 화면이 살아있다는 것을 보이기 위한 카운터 (1초 단위).
    useEffect(() => {
        if (results || error || timedOut) return;
        const t = setInterval(() => setElapsedSec((s) => s + 1), 1000);
        return () => clearInterval(t);
    }, [results, error, timedOut]);

    useEffect(() => {
        let cancelled = false;
        const startedAt = Date.now();

        const tick = async () => {
            if (cancelled) return;
            setAttempts((n) => n + 1);
            try {
                const data = await getSearchResults(searchId);
                console.log(
                    `[AIResult] poll searchId=${searchId} got ${data.length} result(s)`,
                );
                if (cancelled) return;
                if (data.length > 0) {
                    setResults(data);
                    return; // 결과 도착 → 폴링 종료
                }
            } catch (e: any) {
                console.warn("[AIResult] poll error", e?.message ?? e);
                if (cancelled) return;
                setError(e?.message ?? "결과 조회 실패");
                return;
            }

            if (Date.now() - startedAt > POLL_TIMEOUT_MS) {
                setTimedOut(true);
                return;
            }
            setTimeout(tick, POLL_INTERVAL_MS);
        };

        tick();
        return () => {
            cancelled = true;
        };
    }, [searchId]);

    const first = results?.[0];
    const previewUri = first?.matchedImageUrl || capturedUri;

    return (
        <SafeAreaView className="flex-1 bg-bg">
            <DetailHeader title="AI 분석 결과" onBack={onClose} />

            <ScrollView
                className="flex-1 px-5"
                contentContainerClassName="pt-2 pb-10"
                showsVerticalScrollIndicator={false}
            >
                <Text className="text-bk text-2xl font-bold text-center mt-2">
                    {results === null && !error && !timedOut
                        ? "분석 중..."
                        : first?.status === "FOUND"
                        ? "결과가 나왔어요"
                        : "결과를 확인했어요"}
                </Text>
                <Text className="text-gr200 text-sm text-center mt-2 mb-6 leading-5">
                    {results === null && !error && !timedOut
                        ? `AI 분석이 끝나면 결과가 표시됩니다\n경과 ${elapsedSec}초 · 조회 ${attempts}회`
                        : "AI 분석을 통해 일치 가능성이 높은 장면을 찾았어요"}
                </Text>

                <View className="w-full aspect-square rounded-xl bg-gr200/40 mb-6 items-center justify-center overflow-hidden">
                    {previewUri ? (
                        <Image
                            source={{ uri: previewUri }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    ) : results === null && !error && !timedOut ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <Text className="text-gr200 text-base text-center px-4">
                            {error
                                ? error
                                : timedOut
                                ? "분석이 지연되고 있습니다. 잠시 후 다시 확인해주세요."
                                : "일치하는 결과를 찾지 못했어요"}
                        </Text>
                    )}
                </View>

                {first && (
                    <View className="bg-wh border border-gr200/40 rounded-xl p-4 mb-4">
                        <Text className="text-bk text-base">
                            상태: {first.status}
                        </Text>
                        <Text className="text-bk text-base mt-1">
                            정확도: {(first.accuracy * 100).toFixed(1)}%
                        </Text>
                        {first.resultType === "VIDEO" && (
                            <Text className="text-bk text-base mt-1">
                                매칭 시점: {first.matchedTimeSeconds}초
                            </Text>
                        )}
                    </View>
                )}

                <Text className="text-bk text-base font-bold mb-3">
                    분석에 사용된 정보
                </Text>
                <View className="bg-wh border border-gr200/40 rounded-xl p-4">
                    <Text className="text-bk text-base">
                        {formData.name} / {formData.age}세 / {formData.gender}
                    </Text>
                    <Text className="text-bk text-base mt-1">
                        {formData.height}cm / {formData.weight}kg
                    </Text>
                    <Text className="text-bk text-base mt-1 leading-6">
                        {formData.appearance}
                    </Text>
                </View>

                {onComplete && (
                    <Pressable
                        onPress={onComplete}
                        className="h-12 items-center justify-center rounded-xl bg-primary mt-8"
                    >
                        <Text className="text-bk text-lg font-bold">완료</Text>
                    </Pressable>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
