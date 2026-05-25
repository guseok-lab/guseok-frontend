import { env } from "../../lib/env";
import { ApiError, apiRequest } from "../../lib/apiClient";
import type { AuthTokens } from "../../lib/tokenStorage";

interface BackendTokenResponse {
    accessToken: string;
    refreshToken: string;
}

// 카카오 SDK 로 받은 액세스 토큰을 우리 서비스 JWT 로 교환.
export async function exchangeKakaoToken(
    kakaoAccessToken: string,
): Promise<AuthTokens> {
    const res = await apiRequest<BackendTokenResponse>("/auth/kakao", {
        method: "POST",
        body: { kakaoAccessToken },
        auth: false,
    });
    return { accessToken: res.accessToken, refreshToken: res.refreshToken };
}

// /auth/refresh 는 Bearer 가 아니라 Refresh-Token 헤더를 받음. apiClient 의 401 재시도 루프와
// 섞이지 않도록 fetch 를 직접 사용한다.
export async function refreshTokens(
    refreshToken: string,
): Promise<AuthTokens> {
    const res = await fetch(`${env.baseUrl}/auth/refresh`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Refresh-Token": refreshToken,
        },
    });
    const text = await res.text();
    const data = text ? safeParse(text) : undefined;
    if (!res.ok) {
        throw new ApiError(
            res.status,
            (data && (data as any).message) || `refresh failed: ${res.status}`,
            data,
        );
    }
    const parsed = data as BackendTokenResponse;
    return {
        accessToken: parsed.accessToken,
        refreshToken: parsed.refreshToken,
    };
}

export async function logoutBackend(refreshToken: string): Promise<void> {
    // 서버에 refresh token 무효화 요청. 네트워크 실패해도 로컬 토큰은 지워야 하므로
    // 호출 측에서 try/catch 로 감싸도록 둔다.
    await fetch(`${env.baseUrl}/auth/logout`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Refresh-Token": refreshToken,
        },
    });
}

function safeParse(text: string): unknown {
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}
