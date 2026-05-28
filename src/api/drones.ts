import { apiCall } from "../lib/apiClient";
import { env } from "../lib/env";

// 드론 연결 상태. (백엔드 DroneConnectionStatus)
export type DroneConnectionStatus =
    | "AVAILABLE"
    | "CONNECTED"
    | "DISCONNECTED";

export interface DroneStatus {
    droneId: number;
    status: DroneConnectionStatus;
    streamUrl: string | null;
}

// searchId 에 드론을 연결. 성공 시 MJPEG 스트림 URL 반환.
export function connectDrone(searchId: number): Promise<DroneStatus> {
    return apiCall<DroneStatus>(`/api/v1/searches/${searchId}/drone/connect`, {
        method: "POST",
    });
}

// searchId 에 연결된 드론의 현재 상태/스트림 URL 조회.
export function getDroneStatus(searchId: number): Promise<DroneStatus> {
    return apiCall<DroneStatus>(`/api/v1/searches/${searchId}/drone/status`);
}

// searchId 에 연결된 드론 해제.
export function disconnectDrone(searchId: number): Promise<DroneStatus> {
    return apiCall<DroneStatus>(
        `/api/v1/searches/${searchId}/drone/disconnect`,
        { method: "POST" },
    );
}

// 현재 CONNECTED 상태인 사용 가능한 드론 조회.
export function getAvailableDrone(): Promise<DroneStatus> {
    return apiCall<DroneStatus>("/api/v1/drones/available");
}

// 백엔드가 절대 URL(https://...)을 주면 그대로 쓰고, 상대 경로만 줄 경우
// EXPO_PUBLIC_DRONE_BASE_URL 로 절대 URL 을 조립한다.
export function resolveStreamUrl(
    streamUrl: string | null | undefined,
): string | null {
    if (!streamUrl) return null;
    if (/^https?:\/\//i.test(streamUrl)) return streamUrl;
    const base = env.droneBaseUrl;
    if (!base) return streamUrl;
    return `${base}/${streamUrl.replace(/^\/+/, "")}`;
}
