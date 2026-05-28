import React, { useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    Text,
    View,
} from "react-native";

import type {
    BodyType,
    Gender,
    MissingPerson,
} from "../../../api/missingPersons";

const GENDER_LABEL: Record<Gender, string> = {
    MALE: "남",
    FEMALE: "여",
};

const BODY_TYPE_LABEL: Record<BodyType, string> = {
    THIN: "마른 체형",
    NORMAL: "보통 체형",
    CHUBBY: "통통한 체형",
};

interface RegisteredMissingPersonProps {
    entry: MissingPerson;
    onDelete: () => void;
    isDeleting: boolean;
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <View className="flex-row mt-2">
            <Text className="text-gr200 text-sm w-[72px]">{label}</Text>
            <Text className="text-bk text-sm flex-1 leading-5">{value}</Text>
        </View>
    );
}

export default function RegisteredMissingPerson({
    entry,
    onDelete,
    isDeleting,
}: RegisteredMissingPersonProps) {
    const [photoFailed, setPhotoFailed] = useState(false);

    return (
        <View>
            <View className="bg-wh border border-gr200/40 rounded-2xl p-4">
                <View className="flex-row">
                    {entry.photoUrl && !photoFailed ? (
                        <Image
                            source={{ uri: entry.photoUrl }}
                            className="w-[120px] aspect-square rounded-xl mr-4"
                            resizeMode="cover"
                            onError={() => setPhotoFailed(true)}
                        />
                    ) : (
                        <View className="w-[120px] aspect-square rounded-xl bg-gr200 mr-4" />
                    )}

                    <View className="flex-1">
                        <Text className="text-bk text-lg font-bold">
                            {entry.name}{" "}
                            <Text className="text-bk text-sm font-normal">
                                ({entry.age}세 / {GENDER_LABEL[entry.gender]})
                            </Text>
                        </Text>
                        <Text className="text-gr200 text-sm mt-1">
                            {entry.height}cm · {entry.weight}kg ·{" "}
                            {BODY_TYPE_LABEL[entry.bodyType]}
                        </Text>
                    </View>
                </View>

                <View className="h-px bg-gr200/30 my-3" />

                <Row label="인상착의" value={entry.appearanceDescription} />
                <Row label="마지막 위치" value={entry.lastLocation} />
                <Row label="실종 경위" value={entry.missingCircumstance} />
                <Row label="연락처" value={entry.contact} />
            </View>

            <Pressable
                onPress={onDelete}
                disabled={isDeleting}
                className="h-12 items-center justify-center rounded-xl border border-point bg-wh mt-4"
                style={{ opacity: isDeleting ? 0.6 : 1 }}
            >
                {isDeleting ? (
                    <ActivityIndicator color="#000" />
                ) : (
                    <Text className="text-point text-base font-bold">
                        홈화면 삭제
                    </Text>
                )}
            </Pressable>

            <Text className="text-gr200 text-xs text-center mt-3">
                삭제하면 홈 화면 노출이 중단돼요
            </Text>
        </View>
    );
}
