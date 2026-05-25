import {
    getProfile,
    login as kakaoSdkLogin,
    logout as kakaoSdkLogout,
    type KakaoOAuthToken,
    type KakaoProfile,
} from "@react-native-seoul/kakao-login";

export type { KakaoOAuthToken, KakaoProfile };

// 카카오톡 앱 또는 카카오 계정으로 로그인하고 카카오 액세스 토큰을 반환.
export async function loginWithKakao(): Promise<KakaoOAuthToken> {
    return kakaoSdkLogin();
}

export async function fetchKakaoProfile(): Promise<KakaoProfile> {
    return getProfile();
}

// 카카오 세션 종료. 백엔드 /auth/logout 과는 별개로, 카카오 토큰을 무효화함.
export async function logoutFromKakao(): Promise<void> {
    try {
        await kakaoSdkLogout();
    } catch {
        // 카카오 측 로그아웃 실패는 치명적이지 않음(이미 만료된 경우 등). 무시한다.
    }
}
