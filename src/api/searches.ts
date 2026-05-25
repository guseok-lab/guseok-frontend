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

// 업로드 URL 응답 — 백엔드가 OCI Pre-signed URL 을 그대로 내려준다고 가정.
// 실제 필드명이 다르면 호출 측에서 키만 바꾸면 됨.
export interface UploadUrl {
    uploadUrl: string;
    objectKey: string;
}

export interface SearchResults {
    searchId: number;
    status: SearchStatus;
    // 결과 페이로드 스키마는 백엔드 확정되면 그때 좁히기.
    [key: string]: unknown;
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

// 4. 영상 업로드 URL 발급
export function getVideoUploadUrl(searchId: number): Promise<UploadUrl> {
    return apiCall<UploadUrl>(
        `/api/v1/searches/${searchId}/videos/upload-url`,
    );
}

// 5. 분석 결과 조회
export function getSearchResults(searchId: number): Promise<SearchResults> {
    return apiCall<SearchResults>(`/api/v1/searches/${searchId}/results`);
}

// 6. 기준 사진 업로드 URL 발급 — 탐색 생성 전에 호출, 받은 objectKey 를 createSearch 의
// targetImageObjectKey 로 전달.
export function getImageUploadUrl(): Promise<UploadUrl> {
    return apiCall<UploadUrl>("/api/v1/searches/image-upload-url");
}
