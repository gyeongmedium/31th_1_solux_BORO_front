import type { PointHistoryResponse, PointHistoryItem } from "../types/member";

// Mock Data
export const mockPointHistory: PointHistoryResponse = {
    isSuccess: true,
    code: "COMMON200_1",
    message: "성공한 요청입니다.",
    result: [
        {
            pointDescription: "거래 완료 후 '좋았어요' 후기",
            point: 300,
            createdAt: "2026. 07. 21"
        },
        {
            pointDescription: "거래 완료 후 '별로였어요' 후기",
            point: -350,
            createdAt: "2026. 06. 17"
        },
        {
            pointDescription: "거래 완료 후 '별로였어요' 후기",
            point: -350,
            createdAt: "2026. 06. 17"
        },
        {
            pointDescription: "빈자리 양도 완료",
            point: 100,
            createdAt: "2026. 06. 12"
        },
        {
            pointDescription: "신규 가입",
            point: 500,
            createdAt: "2026. 06. 01"
        }
    ]
};

// GET /api/v1/members/points
export const getMemberPoints = async (): Promise<PointHistoryItem[]> => {
    // 백엔드 연동 시 axios 또는 fetch 사용
    /*
    const response = await fetch('/api/v1/members/points');
    const data: PointHistoryResponse = await response.json();
    return data.result;
    */

    // 현재는 Mock 데이터 반환 (0.3초 대기 시뮬레이션)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockPointHistory.result);
        }, 300);
    });
};