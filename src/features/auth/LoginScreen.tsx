import React from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "./AuthContext";

export default function LoginScreen() {
    const { signInWithKakao, isSigningIn } = useAuth();

    const handleKakaoLogin = async () => {
        try {
            await signInWithKakao();
        } catch (e: any) {
            // 사용자가 로그인 시트를 직접 닫으면 카카오 SDK 가 cancel 류의 에러를 던지므로
            // 알림으로 띄우지 않고 무시.
            const code = e?.code ?? e?.userInfo?.code;
            if (code === "E_CANCELLED_OPERATION" || code === "USER_CANCELLED") {
                return;
            }
            Alert.alert("로그인 실패", e?.message ?? "다시 시도해주세요.");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-bg">
            <View className="flex-1 px-5 items-center justify-center pb-16">
                <Text className="text-bk text-base mb-10">
                    로그인을 통해 구석구석 회원이 되어보세요
                </Text>

                <Image
                    source={require("../setting/assets/png/Icon2.png")}
                    className="w-64 h-64"
                    resizeMode="contain"
                />

                <Pressable
                    disabled={isSigningIn}
                    onPress={handleKakaoLogin}
                    className="w-full h-12 rounded-xl items-center justify-center mt-12"
                    style={{
                        backgroundColor: "#FEE500",
                        opacity: isSigningIn ? 0.6 : 1,
                    }}
                >
                    {isSigningIn ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <Text className="text-bk text-base font-semibold">
                            kakao 로 시작하기
                        </Text>
                    )}
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
