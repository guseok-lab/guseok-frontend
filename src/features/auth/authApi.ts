import { apiCall } from "../../lib/apiClient";
import type { AuthTokens } from "../../lib/tokenStorage";

interface BackendTokenResponse {
    accessToken: string;
    refreshToken: string;
}

export async function exchangeKakaoToken(
    kakaoAccessToken: string,
): Promise<AuthTokens> {
    const res = await apiCall<BackendTokenResponse>("/auth/kakao", {
        method: "POST",
        body: { kakaoAccessToken },
        auth: false,
    });
    return { accessToken: res.accessToken, refreshToken: res.refreshToken };
}

export async function refreshTokens(
    refreshToken: string,
): Promise<AuthTokens> {
    const res = await apiCall<BackendTokenResponse>("/auth/refresh", {
        method: "POST",
        headers: { "Refresh-Token": refreshToken },
        auth: false,
    });
    return { accessToken: res.accessToken, refreshToken: res.refreshToken };
}

export async function logoutBackend(refreshToken: string): Promise<void> {
    await apiCall<unknown>("/auth/logout", {
        method: "POST",
        headers: { "Refresh-Token": refreshToken },
        auth: false,
    });
}
