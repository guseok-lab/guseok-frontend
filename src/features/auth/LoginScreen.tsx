import React, { useEffect } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import { useAuth } from "./AuthContext";
import {
    exchangeCodeForToken,
    fetchKakaoUser,
    KAKAO_AUTHORIZE_URL,
    KAKAO_REST_API_KEY,
} from "./kakao";

// OAuth 결과를 앱으로 자동 복귀시키기 위한 처리 (한 번만 호출)
WebBrowser.maybeCompleteAuthSession();

const discovery = {
    authorizationEndpoint: KAKAO_AUTHORIZE_URL,
};

export default function LoginScreen() {
    const { signIn } = useAuth();

    // app.json의 scheme(guseok-lab)을 사용해 redirect URI 생성
    const redirectUri = AuthSession.makeRedirectUri({
        scheme: "guseok-lab",
        path: "auth/kakao",
    });

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: KAKAO_REST_API_KEY,
            redirectUri,
            responseType: "code",
            scopes: [],
        },
        discovery,
    );

    useEffect(() => {
        if (response?.type !== "success") return;
        const code = response.params.code;
        if (!code) return;

        (async () => {
            try {
                const token = await exchangeCodeForToken(code, redirectUri);
                const userInfo = await fetchKakaoUser(token.access_token);

                signIn({
                    id: String(userInfo.id),
                    nickname:
                        userInfo.kakao_account?.profile?.nickname ??
                        userInfo.properties?.nickname,
                    profileImage:
                        userInfo.kakao_account?.profile?.profile_image_url ??
                        userInfo.properties?.profile_image,
                });
            } catch (e: any) {
                Alert.alert("로그인 실패", e?.message ?? "다시 시도해주세요.");
            }
        })();
    }, [response]);

    const handleKakaoLogin = async () => {
        if (KAKAO_REST_API_KEY === "YOUR_KAKAO_REST_API_KEY") {
            Alert.alert(
                "카카오 키 미설정",
                "src/features/auth/kakao.ts 의 KAKAO_REST_API_KEY 에 발급받은 REST API 키를 넣어주세요.",
            );
            return;
        }
        await promptAsync();
    };

    return (
        <SafeAreaView className="flex-1 bg-bg">
            <View className="flex-1 px-5 items-center pt-20">
                <Text className="text-bk text-base mb-10">
                    로그인을 통해 구석구석 회원이 되어보세요
                </Text>

                <Image
                    source={require("../setting/assets/png/Icon2.png")}
                    className="w-64 h-64"
                    resizeMode="contain"
                />

                <Pressable
                    disabled={!request}
                    onPress={handleKakaoLogin}
                    className="w-full h-12 rounded-xl items-center justify-center mt-12"
                    style={{ backgroundColor: "#FEE500" }}
                >
                    <Text className="text-bk text-base font-semibold">
                        kakao 로 시작하기
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
