import { env } from "./env";
import {
    AuthTokens,
    clearTokens,
    loadTokens,
    saveTokens,
} from "./tokenStorage";

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public body?: unknown,
    ) {
        super(message);
        this.name = "ApiError";
    }
}

type RefreshHandler = (refreshToken: string) => Promise<AuthTokens>;
type UnauthorizedHandler = () => void | Promise<void>;

let refreshHandler: RefreshHandler | null = null;
let onUnauthorized: UnauthorizedHandler | null = null;

// AuthContext 가 마운트되면서 토큰 리프레시 / 강제 로그아웃 콜백을 등록함.
export function configureApiClient(opts: {
    refresh: RefreshHandler;
    onUnauthorized: UnauthorizedHandler;
}) {
    refreshHandler = opts.refresh;
    onUnauthorized = opts.onUnauthorized;
}

// 동시 401 발생 시 refresh 호출이 중복되지 않도록 단일 Promise 로 코얼레스.
let inflightRefresh: Promise<AuthTokens | null> | null = null;

async function refreshOnce(): Promise<AuthTokens | null> {
    if (!refreshHandler) return null;
    if (!inflightRefresh) {
        inflightRefresh = (async () => {
            const tokens = await loadTokens();
            if (!tokens) return null;
            try {
                const next = await refreshHandler!(tokens.refreshToken);
                await saveTokens(next);
                return next;
            } catch {
                return null;
            } finally {
                inflightRefresh = null;
            }
        })();
    }
    return inflightRefresh;
}

interface RequestOptions extends Omit<RequestInit, "body" | "headers"> {
    body?: unknown;
    headers?: Record<string, string>;
    auth?: boolean; // 기본 true
    _isRetry?: boolean;
}

export async function apiRequest<T = unknown>(
    path: string,
    options: RequestOptions = {},
): Promise<T> {
    const { body, headers = {}, auth = true, _isRetry, ...rest } = options;

    const finalHeaders: Record<string, string> = {
        Accept: "application/json",
        ...headers,
    };

    let serializedBody: BodyInit | undefined;
    if (body !== undefined && body !== null) {
        if (typeof body === "string" || body instanceof FormData) {
            serializedBody = body as BodyInit;
        } else {
            serializedBody = JSON.stringify(body);
            if (!finalHeaders["Content-Type"]) {
                finalHeaders["Content-Type"] = "application/json";
            }
        }
    }

    if (auth) {
        const tokens = await loadTokens();
        if (tokens) {
            finalHeaders.Authorization = `Bearer ${tokens.accessToken}`;
        }
    }

    const url = path.startsWith("http") ? path : `${env.baseUrl}${path}`;

    const res = await fetch(url, {
        ...rest,
        headers: finalHeaders,
        body: serializedBody,
    });

    if (res.status === 401 && auth && !_isRetry) {
        const refreshed = await refreshOnce();
        if (refreshed) {
            return apiRequest<T>(path, { ...options, _isRetry: true });
        }
        await clearTokens();
        await onUnauthorized?.();
        throw new ApiError(401, "인증이 만료되었습니다. 다시 로그인해주세요.");
    }

    const text = await res.text();
    const data = text ? safeParseJson(text) : undefined;

    if (!res.ok) {
        const msg =
            (data && typeof data === "object" && "message" in (data as any)
                ? String((data as any).message)
                : null) ?? `HTTP ${res.status}`;
        throw new ApiError(res.status, msg, data);
    }

    return data as T;
}

// 백엔드 공통 응답 포맷: { success, data, error: { code, message } }
// HTTP 200 이어도 success === false 이면 ApiError 로 던지고, true 면 data 반환.
export interface EnvelopeError {
    code: string;
    message: string;
}
export interface Envelope<T> {
    success: boolean;
    data: T;
    error?: EnvelopeError | null;
}

export function unwrap<T>(envelope: Envelope<T>): T {
    if (!envelope.success) {
        const err = envelope.error;
        throw new ApiError(
            200,
            err?.message ?? "요청이 실패했습니다.",
            envelope,
        );
    }
    return envelope.data;
}

export async function apiCall<T>(
    path: string,
    options: RequestOptions = {},
): Promise<T> {
    const envelope = await apiRequest<Envelope<T>>(path, options);
    return unwrap(envelope);
}

function safeParseJson(text: string): unknown {
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}
