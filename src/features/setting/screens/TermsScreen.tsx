import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DetailHeader from "../../../navigation/components/DetailHeader";

const sections = [
    {
        title: "제1조 (목적)",
        body: "본 약관은 '구석구석'(이하 '서비스')의 이용에 관한 조건과 절차, 이용자와 운영자의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.",
    },
    {
        title: "제2조 (서비스의 내용)",
        body:
            "서비스는 실종자를 함께 찾기 위한 시민 참여형 탐색 플랫폼으로, 다음 기능을 포함합니다.\n" +
            "1. 실종자 정보 등록 및 사전 등록\n" +
            "2. 영상 첨부 기반 AI 분석\n" +
            "3. 드론 연결 기반 실시간 탐색 및 AI 분석\n" +
            "4. 분석 결과 확인 및 공유",
    },
    {
        title: "제3조 (개인정보 및 사진 활용)",
        body: "이용자가 입력한 실종자의 정보·사진은 AI 식별을 위한 분석 목적에 한하여 활용되며, 이용자의 동의 없이 외부로 공유되지 않습니다. 단, '홈화면 노출'을 활성화한 경우 등록 정보가 다른 이용자에게 표시될 수 있습니다.",
    },
    {
        title: "제4조 (이용자의 의무)",
        body: "이용자는 정확한 정보를 입력해야 하며, 허위 정보를 등록하거나 타인의 권리를 침해해서는 안 됩니다. 위반 시 등록 정보가 삭제되거나 서비스 이용이 제한될 수 있습니다.",
    },
    {
        title: "제5조 (책임의 한계)",
        body: "AI 분석 결과는 참고용이며, 실종자의 실제 위치를 보장하지 않습니다. 서비스는 분석 결과에 따른 행동의 결과에 대해 직접적인 책임을 지지 않습니다.",
    },
    {
        title: "제6조 (약관의 변경)",
        body: "운영자는 관련 법령이나 서비스 정책에 따라 본 약관을 변경할 수 있으며, 변경 시 서비스 내 공지를 통해 안내합니다.",
    },
];

export default function TermsScreen() {
    return (
        <SafeAreaView className="flex-1 bg-bg">
            <DetailHeader title="이용 약관" />

            <ScrollView
                className="flex-1 px-5"
                contentContainerClassName="pt-2 pb-10"
                showsVerticalScrollIndicator={false}
            >
                {sections.map((s, idx) => (
                    <View key={idx} className="py-5">
                        <Text className="text-bk text-base font-bold mb-2">
                            {s.title}
                        </Text>
                        <Text className="text-bk text-sm leading-6">
                            {s.body}
                        </Text>
                    </View>
                ))}

                <Text className="text-gr200 text-xs mt-4">
                    본 약관은 2026년 5월 23일부터 시행됩니다.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
