import React from "react";
import { Text, View } from "react-native";

import type { MissingPerson } from "../../../mocks/missingPersonMockData";
import InfoRow from "./InfoRow";
import MissingDayBadge from "./MissingDayBadge";
import ReportButton from "./ReportButton";

interface MissingPersonCardProps {
    item: MissingPerson;
}

export default function MissingPersonCard({ item }: MissingPersonCardProps) {
    return (
        <View className="flex-row mb-6">
            {/* 사진 자리 (이미지 에셋 추후 추가) */}
            <View className="w-[140px] h-[260px] rounded-xl bg-gr200/40 mr-4" />

            <View className="flex-1">
                <View className="items-end mb-2">
                    <MissingDayBadge days={item.missingDays} />
                </View>

                <Text className="text-bk text-lg font-bold mb-3">
                    {item.name}{" "}
                    <Text className="text-bk text-sm font-normal">
                        ({item.age}세 / {item.gender})
                    </Text>
                </Text>

                <InfoRow
                    value={`${item.height}cm  ${item.weight}kg | ${item.bodyType}`}
                />

                <InfoRow value={item.appearance} />

                <InfoRow
                    label="마지막 위치"
                    value={item.lastLocation}
                />

                <InfoRow label="실종 경위" value={item.circumstance} />

                <ReportButton />
            </View>
        </View>
    );
}
