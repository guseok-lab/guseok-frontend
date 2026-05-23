import React, {
    createContext,
    ReactNode,
    useContext,
    useMemo,
    useState,
} from "react";

export interface AuthUser {
    id: string;
    nickname?: string;
    profileImage?: string;
}

interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    signIn: (user: AuthUser) => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            isAuthenticated: user !== null,
            signIn: (u) => setUser(u),
            signOut: () => setUser(null),
        }),
        [user],
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
