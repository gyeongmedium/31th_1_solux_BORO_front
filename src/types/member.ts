
// 포인트 이력 아이템 타입
export interface PointHistoryItem {
    pointDescription: string;
    point: number;
    createdAt: string;
}

// API 공통 응답 타입
export interface PointHistoryResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: PointHistoryItem[];
}