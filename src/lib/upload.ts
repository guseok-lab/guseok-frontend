// 로컬 파일 URI(ImagePicker 등에서 받은 file:// 경로)를 OCI Presigned PUT URL 에 업로드.
// presigned URL 은 헤더 검증을 엄격하게 하니 Content-Type 만 넘기고 Authorization 등 다른 헤더는 붙이지 않는다.
export async function uploadToPresignedUrl(
    localUri: string,
    uploadUrl: string,
    contentType: string,
): Promise<void> {
    const fileRes = await fetch(localUri);
    const blob = await fileRes.blob();

    const res = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": contentType },
        body: blob,
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(
            `업로드 실패 (HTTP ${res.status})${text ? `: ${text.slice(0, 200)}` : ""}`,
        );
    }
}

// 확장자로부터 대략적인 MIME 추정. 백엔드가 contentType 검증하면 OCI side 에서 거절될 수 있어
// asset.mimeType 이 있으면 우선 그걸 쓰는 게 안전.
export function guessContentType(filename: string): string {
    const ext = filename.split(".").pop()?.toLowerCase();
    switch (ext) {
        case "jpg":
        case "jpeg":
            return "image/jpeg";
        case "png":
            return "image/png";
        case "heic":
            return "image/heic";
        case "webp":
            return "image/webp";
        case "mp4":
            return "video/mp4";
        case "mov":
            return "video/quicktime";
        case "m4v":
            return "video/x-m4v";
        default:
            return "application/octet-stream";
    }
}

// 로컬 URI 에서 마지막 path 세그먼트(파일명) 추출. 쿼리스트링 / fragment 제거.
export function basenameFromUri(uri: string): string {
    const noQuery = uri.split("?")[0].split("#")[0];
    const seg = noQuery.split("/").pop() ?? "upload";
    return seg || "upload";
}
