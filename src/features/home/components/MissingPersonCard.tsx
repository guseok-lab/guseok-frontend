import React, { useState } from "react";
import { Image, Text, View } from "react-native";

import type {
    BodyType,
    Gender,
    MissingPerson,
} from "../../../api/missingPersons";
import ContactModal from "./ContactModal";
import InfoRow from "./InfoRow";
import MissingDayBadge from "./MissingDayBadge";
import ReportButton from "./ReportButton";
import RulerIcon from "../assets/svg/Length.svg";
import TshirtIcon from "../assets/svg/T-Shirt.svg";
import MapIcon from "../assets/svg/Address.svg";
import TimeIcon from "../assets/svg/Clock.svg";

const GENDER_LABEL: Record<Gender, string> = {
    MALE: "남",
    FEMALE: "여",
};

const BODY_TYPE_LABEL: Record<BodyType, string> = {
    THIN: "마른 체형",
    NORMAL: "보통 체형",
    CHUBBY: "통통한 체형",
};

interface MissingPersonCardProps {
    item: MissingPerson;
}

export default function MissingPersonCard({ item }: MissingPersonCardProps) {
    const [contactVisible, setContactVisible] = useState(false);
    const [photoFailed, setPhotoFailed] = useState(false);

    return (
        <View className="flex-row items-stretch mb-6">
            {item.photoUrl && !photoFailed ? (
                <Image
                    source={{ uri: item.photoUrl }}
                    className="w-[140px] aspect-square rounded-xl mr-4"
                    resizeMode="cover"
                    onError={() => setPhotoFailed(true)}
                />
            ) : (
                <View className="w-[140px] aspect-square rounded-xl bg-gr200 mr-4" />
            )}

            <View className="flex-1">
                <View className="items-end mb-2">
                    <MissingDayBadge days={item.missingDays} />
                </View>

                <Text className="text-bk text-xl font-bold mb-3">
                    {item.name}{" "}
                    <Text className="text-bk text-base font-normal">
                        ({item.age}세 / {GENDER_LABEL[item.gender]})
                    </Text>
                </Text>

                <InfoRow
                    icon={
                        <RulerIcon
                            width={20}
                            height={20}
                            className="color-gr700"
                        />
                    }
                    value={`${item.height}cm  ${item.weight}kg | ${BODY_TYPE_LABEL[item.bodyType]}`}
                />

                <InfoRow
                    icon={
                        <TshirtIcon
                            width={20}
                            height={20}
                            className="color-gr700"
                        />
                    }
                    value={item.appearanceDescription}
                />

                <InfoRow
                    icon={
                        <MapIcon
                            width={20}
                            height={20}
                            className="color-gr700"
                        />
                    }
                    label="마지막 위치"
                    value={item.lastLocation}
                />

                <InfoRow
                    icon={
                        <TimeIcon
                            width={20}
                            height={20}
                            className="color-gr700"
                        />
                    }
                    label="실종 경위"
                    value={item.missingCircumstance}
                />

                <ReportButton onPress={() => setContactVisible(true)} />
            </View>

            <ContactModal
                visible={contactVisible}
                name={item.name}
                contact={item.contact}
                onClose={() => setContactVisible(false)}
            />
        </View>
    );
}
