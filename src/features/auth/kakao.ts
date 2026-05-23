// 카카오 REST API 키 (https://developers.kakao.com/ → 내 애플리케이션 → 앱 키 → REST API 키)
// 실제 키 발급 후 여기에 넣거나 환경변수로 분리하세요.
export const KAKAO_REST_API_KEY = "YOUR_KAKAO_REST_API_KEY";

export const KAKAO_AUTHORIZE_URL = "https://kauth.kakao.com/oauth/authorize";
export const KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
export const KAKAO_USER_URL = "https://kapi.kakao.com/v2/user/me";

export interface KakaoTokenResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope?: string;
    refresh_token_expires_in?: number;
}

export interface KakaoUserResponse {
    id: number;
    kakao_account?: {
        profile?: {
            nickname?: string;
            profile_image_url?: string;
        };
        email?: string;
    };
    properties?: {
        nickname?: string;
        profile_image?: string;
    };
}

export async function exchangeCodeForToken(
    code: string,
    redirectUri: string,
): Promise<KakaoTokenResponse> {
    const body = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: KAKAO_REST_API_KEY,
        redirect_uri: redirectUri,
        code,
    }).toString();

    const res = await fetch(KAKAO_TOKEN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body,
    });

    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Kakao token exchange failed: ${errText}`);
    }

    return res.json();
}

export async function fetchKakaoUser(
    accessToken: string,
): Promise<KakaoUserResponse> {
    const res = await fetch(KAKAO_USER_URL, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
    });

    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Kakao user fetch failed: ${errText}`);
    }

    return res.json();
}
