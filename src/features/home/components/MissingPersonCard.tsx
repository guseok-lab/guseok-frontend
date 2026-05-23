import React from "react";
import { Text, View } from "react-native";

import type { MissingPerson } from "../../../mocks/missingPersonMockData";
import InfoRow from "./InfoRow";
import MissingDayBadge from "./MissingDayBadge";
import ReportButton from "./ReportButton";
import RulerIcon from "../assets/svg/Length.svg"
import TshirtIcon from "../assets/svg/T-Shirt.svg"
import MapIcon from "../assets/svg/Address.svg"
import TimeIcon from "../assets/svg/Clock.svg"

interface MissingPersonCardProps {
    item: MissingPerson;
}

export default function MissingPersonCard({ item }: MissingPersonCardProps) {
    return (
        <View className="flex-row mb-6">
            <View className="w-[140px] h-[260px] rounded-xl bg-gr200 mr-4" />

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
                    icon={<RulerIcon width={20} height={20} className="color-gr700" />}
                    value={`${item.height}cm  ${item.weight}kg | ${item.bodyType}`}
                />

                <InfoRow
                    icon={<TshirtIcon width={20} height={20} className="color-gr700" />}
                    value={item.appearance} />

                <InfoRow
                    icon={<MapIcon width={20} height={20} className="color-gr700" />}
                    label="마지막 위치"
                    value={item.lastLocation}
                />

                <InfoRow
                    icon={<TimeIcon width={20} height={20} className="color-gr700" />}
                    label="실종 경위" value={item.circumstance} />

                <ReportButton />
            </View>
        </View>
    );
}
