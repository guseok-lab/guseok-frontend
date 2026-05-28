const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const DRONE_BASE_URL = process.env.EXPO_PUBLIC_DRONE_BASE_URL;

if (!BASE_URL) {
    console.warn(
        "[env] EXPO_PUBLIC_BASE_URL 이 비어 있습니다. .env 에 백엔드 주소를 설정하세요.",
    );
}

if (!DRONE_BASE_URL) {
    console.warn(
        "[env] EXPO_PUBLIC_DRONE_BASE_URL 이 비어 있습니다. .env 에 드론 서버 주소를 설정하세요.",
    );
}

export const env = {
    baseUrl: BASE_URL ?? "",
    // 드론 MJPEG 스트림 서버 베이스 URL. 백엔드가 절대 streamUrl 을 주면 그대로 쓰고,
    // 상대 경로/droneId 만 줄 경우 이 값으로 절대 URL 을 조립한다.
    droneBaseUrl: (DRONE_BASE_URL ?? "").replace(/\/+$/, ""),
};
