const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

if (!BASE_URL) {
    console.warn(
        "[env] EXPO_PUBLIC_BASE_URL 이 비어 있습니다. .env 에 백엔드 주소를 설정하세요.",
    );
}

export const env = {
    baseUrl: BASE_URL ?? "",
};
