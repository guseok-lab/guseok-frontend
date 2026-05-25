import {
    getProfile,
    login as kakaoSdkLogin,
    logout as kakaoSdkLogout,
    type KakaoOAuthToken,
    type KakaoProfile,
} from "@react-native-seoul/kakao-login";

export type { KakaoOAuthToken, KakaoProfile };

export async function loginWithKakao(): Promise<KakaoOAuthToken> {
    return kakaoSdkLogin();
}

export async function fetchKakaoProfile(): Promise<KakaoProfile> {
    return getProfile();
}

export async function logoutFromKakao(): Promise<void> {
    try {
        await kakaoSdkLogout();
    } catch {
    }
}
