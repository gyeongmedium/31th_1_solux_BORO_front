//import api from "../lib/axios";
import type { PointHistoryResponse, PointHistoryItem } from "../types/member";
import type { MemberAssetsResponse, CharacterItem } from "../types/member";

// Mock Data (나의 포인트 이력 조회)
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

// Mock Data (보유중 / 미보유 아이템 데이터)
export const mockMemberAssetsResponse: MemberAssetsResponse = {
    isSuccess: true,
    code: "COMMON200",
    message: "성공적으로 조회되었습니다.",
    result: [
        { itemId: 1, itemName: "후드티", itemCategory: "CLOTHES", equipped: true },
        { itemId: 2, itemName: "정장", itemCategory: "CLOTHES", equipped: true },
        { itemId: 3, itemName: "프린세스 송이", itemCategory: "CLOTHES", equipped: true },
        { itemId: 4, itemName: "정장 송이", itemCategory: "CLOTHES", equipped: false },
        { itemId: 5, itemName: "헤드셋", itemCategory: "ACCESSORY", equipped: true },
        { itemId: 6, itemName: "모자", itemCategory: "ACCESSORY", equipped: true },
        { itemId: 7, itemName: "안경", itemCategory: "ACCESSORY", equipped: true },
        { itemId: 8, itemName: "가방", itemCategory: "ACCESSORY", equipped: true },
        { itemId: 9, itemName: "마스크", itemCategory: "ETC", equipped: false },
        { itemId: 10, itemName: "커피", itemCategory: "ETC", equipped: true },
    ],
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

/* 내가 보유한 캐릭터 아이템 조회 API */
export const getMemberAssets = async (): Promise<CharacterItem[]> => {
    /* 실제 백엔드 서버 연동 시
    const response = await api.get<MemberAssetsResponse>("/api/v1/members/assets");
    return response.data.result;
    */

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockMemberAssetsResponse.result);
        }, 200);
    });
};