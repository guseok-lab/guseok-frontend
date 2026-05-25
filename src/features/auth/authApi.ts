import { env } from "../../lib/env";
import { ApiError, apiRequest } from "../../lib/apiClient";
import type { AuthTokens } from "../../lib/tokenStorage";

interface BackendTokenResponse {
    accessToken: string;
    refreshToken: string;
}

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
