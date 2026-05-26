import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { configureApiClient } from "../../lib/apiClient";
import {
    clearTokens,
    loadTokens,
    saveTokens,
    type AuthTokens,
} from "../../lib/tokenStorage";
import {
    exchangeKakaoToken,
    logoutBackend,
    refreshTokens,
} from "./authApi";
import {
    fetchKakaoProfile,
    loginWithKakao,
    logoutFromKakao,
} from "./kakao";

export interface AuthUser {
    id: string;
    nickname?: string;
    profileImage?: string;
}

interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isInitializing: boolean;
    isSigningIn: boolean;
    signInWithKakao: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);
    const [isSigningIn, setIsSigningIn] = useState(false);

    const clearLocalSession = useCallback(async () => {
        await clearTokens();
        setUser(null);
    }, []);

    useEffect(() => {
        configureApiClient({
            refresh: (rt) => refreshTokens(rt),
            onUnauthorized: clearLocalSession,
        });
    }, [clearLocalSession]);

    // 앱 시작 시 저장된 토큰으로 자동 복원.
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const tokens = await loadTokens();
                if (!tokens) return;
                const profile = await fetchKakaoProfile().catch(() => null);
                if (cancelled) return;
                setUser(
                    profile
                        ? {
                              id: String(profile.id),
                              nickname: profile.nickname,
                              profileImage: profile.profileImageUrl,
                          }
                        : { id: "me" },
                );
            } catch {
                if (!cancelled) setUser({ id: "me" });
            } finally {
                if (!cancelled) setIsInitializing(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    const signInWithKakao = useCallback(async () => {
        setIsSigningIn(true);
        try {
            const kakaoToken = await loginWithKakao();
            const tokens: AuthTokens = await exchangeKakaoToken(
                kakaoToken.accessToken,
            );
            await saveTokens(tokens);

            const profile = await fetchKakaoProfile().catch(() => null);
            setUser(
                profile
                    ? {
                          id: String(profile.id),
                          nickname: profile.nickname,
                          profileImage: profile.profileImageUrl,
                      }
                    : { id: "me" },
            );
        } finally {
            setIsSigningIn(false);
        }
    }, []);

    const signOut = useCallback(async () => {
        const tokens = await loadTokens();
        if (tokens) {
            try {
                await logoutBackend(tokens.refreshToken);
            } catch {
            }
        }
        await logoutFromKakao();
        await clearLocalSession();
    }, [clearLocalSession]);

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            isAuthenticated: user !== null,
            isInitializing,
            isSigningIn,
            signInWithKakao,
            signOut,
        }),
        [user, isInitializing, isSigningIn, signInWithKakao, signOut],
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
}
