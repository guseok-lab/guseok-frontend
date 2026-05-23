import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DetailHeader from "../../../navigation/components/DetailHeader";

const faqs = [
    {
        q: "구석구석은 어떤 서비스인가요?",
        a: "실종된 가족·이웃을 함께 찾기 위한 시민 참여형 탐색 플랫폼이에요. 시민이 등록한 정보와 AI 분석을 결합해 발견 가능성을 높입니다.",
    },
    {
        q: "탐색은 어떻게 시작하나요?",
        a: "EXPLORE 탭에서 실종자의 정보를 입력하고, '영상 첨부' 또는 '드론 연결' 방식을 선택해 AI 분석을 시작할 수 있어요.",
    },
    {
        q: "사진은 어디에 쓰이나요?",
        a: "AI가 영상·드론 화면에서 실종자 얼굴을 식별하는 데 사용돼요. 분석 외 용도로 외부에 공유되지 않습니다.",
    },
    {
        q: "내가 입력한 정보는 누구에게 보이나요?",
        a: "기본적으로 본인만 확인할 수 있어요. MY 탭 '실종자 사전 등록'에서 '홈화면 노출'을 누른 경우에만 다른 사용자의 홈 화면에 표시됩니다.",
    },
    {
        q: "허위 정보를 입력하면 어떻게 되나요?",
        a: "관리자 검수에 따라 등록된 정보가 삭제되거나 이용이 제한될 수 있어요. 정확한 정보만 입력해주세요.",
    },
];

export default function FaqScreen() {
    return (
        <SafeAreaView className="flex-1 bg-bg">
            <DetailHeader title="자주 묻는 질문" />

            <ScrollView
                className="flex-1 px-5"
                contentContainerClassName="pt-2 pb-10"
                showsVerticalScrollIndicator={false}
            >
                {faqs.map((item, idx) => (
                    <View
                        key={idx}
                        className={`py-5 ${
                            idx === faqs.length - 1
                                ? ""
                                : "border-b border-gr200/40"
                        }`}
                    >
                        <Text className="text-primary400 text-base font-bold mb-2">
                            Q. {item.q}
                        </Text>
                        <Text className="text-bk text-base leading-6">
                            A. {item.a}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
