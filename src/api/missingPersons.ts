import { apiCall } from "../lib/apiClient";

export type Gender = "MALE" | "FEMALE";
export type BodyType = "THIN" | "NORMAL" | "CHUBBY";
export type MissingStatus = "SEARCHING" | "FOUND" | "CLOSED";

export interface MissingPersonCreateRequest {
    name: string;
    age: number;
    gender: Gender;
    height: number;
    weight: number;
    appearanceDescription: string;
    bodyType: BodyType;
    lastLocation: string;
    missingCircumstance: string;
    contact: string;
    photoObjectKey: string;
}

export interface MissingPerson {
    missingPersonId: number;
    name: string;
    age: number;
    gender: Gender;
    height: number;
    weight: number;
    appearanceDescription: string;
    bodyType: BodyType;
    lastLocation: string;
    missingCircumstance: string;
    contact: string;
    photoUrl: string;
    status: MissingStatus;
    createdAt: string;
    missingDays: number;
}

export interface ImageUploadUrl {
    objectKey: string;
    uploadUrl: string;
}

// 인증 필요. 사진은 getImageUploadUrl 로 받은 objectKey 를 photoObjectKey 로 넘긴다.
export function createMissingPerson(
    body: MissingPersonCreateRequest,
): Promise<MissingPerson> {
    return apiCall<MissingPerson>("/api/v1/missing-persons", {
        method: "POST",
        body,
    });
}

// 비인증. 전체 사용자의 SEARCHING 상태 실종자 목록.
export function getSearchingMissingPersons(): Promise<MissingPerson[]> {
    return apiCall<MissingPerson[]>("/api/v1/missing-persons/searching", {
        auth: false,
    });
}

// 비인증. SEARCHING 상태 인원 수.
export function getSearchingCount(): Promise<number> {
    return apiCall<number>("/api/v1/missing-persons/searching/count", {
        auth: false,
    });
}

// 인증 필요. 내가 등록한 실종자 목록.
export function getMyMissingPersons(): Promise<MissingPerson[]> {
    return apiCall<MissingPerson[]>("/api/v1/missing-persons/me");
}

// 인증 필요. 10분 유효 Presigned PUT URL 발급.
export function getMissingPersonImageUploadUrl(
    originalFilename: string,
): Promise<ImageUploadUrl> {
    return apiCall<ImageUploadUrl>(
        `/api/v1/missing-persons/image-upload-url?originalFilename=${encodeURIComponent(
            originalFilename,
        )}`,
    );
}
