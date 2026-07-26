import type { 
    PresignedUrlRequestDTO, 
    PresignedUrlResponseDTO, 
    ApiResponse 
} from "../types/upload-image";

// 1. 백엔드로부터 S3 Presigned URL 발급받기
export const getPresignedUrl = async (
    body: PresignedUrlRequestDTO
): Promise<ApiResponse<PresignedUrlResponseDTO>> => {
    const response = await fetch("/api/v1/files/presigned-url", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        // 필요시 토큰 헤더 추가
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error("Presigned URL 발급에 실패했습니다.");
    }

    return response.json();
};

// 2. 발급받은 Presigned URL을 이용해 AWS S3에 실제 이미지 파일 업로드 (PUT)
export const uploadFileToS3 = async (
    presignedUrl: string, 
    file: File
): Promise<void> => {
    const response = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
        "Content-Type": file.type, // 파일의 MIME 타입 (e.g. image/png)
        },
        body: file, // 바이너리 파일 객체 직접 전송
    });

    if (!response.ok) {
        throw new Error("S3 파일 업로드에 실패했습니다.");
    }
};

// 3. [통합 헬퍼 함수] 파일 하나를 전달하면 1번과 2번 과정을 거쳐 최종 fileUrl을 반환하는 함수
export const uploadImage = async (file: File): Promise<string> => {
    // 1단계: Presigned URL 요청
    const res = await getPresignedUrl({
        fileName: file.name,
        contentType: file.type,
    });

    if (!res.isSuccess || !res.result) {
        throw new Error(res.message || "Presigned URL 발급 오류");
    }

    const { presignedUrl, fileUrl } = res.result;

    // 2단계: S3로 직접 업로드
    await uploadFileToS3(presignedUrl, file);

    // 3단계: 나중에 DB나 채팅 메시지에 저장할 최종 fileUrl 반환
    return fileUrl;
};