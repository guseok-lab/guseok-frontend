// .env 파일에 EXPO_PUBLIC_BASE_URL=... 형태로 적어두면 빌드 시 주입됨.
// Expo가 EXPO_PUBLIC_ 접두사가 붙은 변수만 클라이언트에 노출함.
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

if (!BASE_URL) {
    // 개발 중 누락을 빠르게 감지하기 위함.
    console.warn(
        "[env] EXPO_PUBLIC_BASE_URL 이 비어 있습니다. .env 에 백엔드 주소를 설정하세요.",
    );
}

export const env = {
    baseUrl: BASE_URL ?? "",
};
