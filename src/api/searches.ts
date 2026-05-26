import { apiCall } from "../lib/apiClient";

export type Gender = "남성" | "여성";
export type SearchMode = "VIDEO" | "DRONE";
export type SearchStatus =
    | "PENDING"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "FAILED"
    | string;

export interface CreateSearchRequest {
    gender: Gender;
    height: number;
    weight: number;
    appearance: string;
    searchMode: SearchMode;
    targetImageObjectKey: string;
}

export interface CreateSearchResponse {
    searchId: number;
    status: SearchStatus;
}

export interface SearchDetail {
    searchId: number;
    gender: Gender;
    height: number;
    weight: number;
    appearance: string;
    searchMode: SearchMode;
    status: SearchStatus;
    targetImageObjectKey?: string;
    // 그 외 백엔드 추가 필드는 호출 측에서 union 으로 처리.
    [key: string]: unknown;
}

export interface VideoCompleteResponse {
    searchId: number;
    videoId: number;
    status: SearchStatus;
}

// OCI Object Storage Presigned PUT URL (10분 유효).
export interface ImageUploadUrl {
    objectKey: string;
    uploadUrl: string;
}

export interface VideoUploadUrl {
    videoId: number;
    objectKey: string;
    uploadUrl: string;
}

export type ResultType = "VIDEO" | "DRONE" | string;
export type ResultStatus = "FOUND" | "NOT_FOUND" | string;

export interface SearchResult {
    resultId: number;
    resultType: ResultType;
    status: ResultStatus;
    accuracy: number;
    matchedImageUrl: string;
    matchedTimeSeconds: number;
}

// 1. 탐색 생성 (비회원 가능)
export function createSearch(
    body: CreateSearchRequest,
): Promise<CreateSearchResponse> {
    return apiCall<CreateSearchResponse>("/api/v1/searches", {
        method: "POST",
        body,
    });
}

// 2. 영상 업로드 완료 보고 (path: searchId, query: videoId)
export function completeVideoUpload(
    searchId: number,
    videoId: number,
): Promise<VideoCompleteResponse> {
    return apiCall<VideoCompleteResponse>(
        `/api/v1/searches/${searchId}/videos/complete?videoId=${encodeURIComponent(
            String(videoId),
        )}`,
        { method: "POST" },
    );
}

// 3. 탐색 상세 조회 (비회원 가능)
export function getSearch(searchId: number): Promise<SearchDetail> {
    return apiCall<SearchDetail>(`/api/v1/searches/${searchId}`);
}

// 4. 영상 업로드 URL 발급 — Presigned PUT URL (10분 유효).
// 반환된 videoId 는 completeVideoUpload 호출 시 사용.
export function getVideoUploadUrl(
    searchId: number,
    originalFilename: string,
): Promise<VideoUploadUrl> {
    return apiCall<VideoUploadUrl>(
        `/api/v1/searches/${searchId}/videos/upload-url?originalFilename=${encodeURIComponent(
            originalFilename,
        )}`,
    );
}

// 5. 분석 결과 조회 — AI 콜백 수신 전에는 빈 배열.
export function getSearchResults(searchId: number): Promise<SearchResult[]> {
    return apiCall<SearchResult[]>(`/api/v1/searches/${searchId}/results`);
}

// 6. 기준 사진 업로드 URL 발급 — 탐색 생성 전에 호출, 받은 objectKey 를 createSearch 의
// targetImageObjectKey 로 전달.
export function getImageUploadUrl(
    originalFilename: string,
): Promise<ImageUploadUrl> {
    return apiCall<ImageUploadUrl>(
        `/api/v1/searches/image-upload-url?originalFilename=${encodeURIComponent(
            originalFilename,
        )}`,
    );
}
