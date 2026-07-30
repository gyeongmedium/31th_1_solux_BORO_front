//import api from "../lib/axios";
import type { PointHistoryResponse, PointHistoryItem } from "../types/member";
import type { MemberAssetsResponse, CharacterItem } from "../types/member";
import type { ReceivedReviewResponse } from "../types/member";

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

// 받은 대여 후기 리스트 조회 API
export async function getReceivedReviews(): Promise<ReceivedReviewResponse> {
    // 실제 백엔드 연동 코드
    // const res = await fetch("/api/v1/members/reviews/received");
    // const data = await res.json();
    // return data.result;

    // Mock 데이터
    return {
        likeCount: 3,
        dislikeCount: 1,
        reviewDetailList: [
        {
            reviewerNickname: "카공러",
            postTitle: "경영학원론 전공서적 대여하고 싶어요",
            createdAt: "2026. 8. 1",
            content: "책 상태도 좋고 설명도 자세히 해주셔서 감사했습니다!\n가격이 싸고 응답도 빠르셔서 좋았어요.",
            type: "GOOD",
        },
        {
            reviewerNickname: "밀크티",
            postTitle: "거시경제학 전공책 대여",
            createdAt: "2026. 7. 23",
            content: "",
            type: "GOOD",
        },
        {
            reviewerNickname: "새송이",
            postTitle: "우산 빌려주실 분 있나요",
            createdAt: "2026. 5. 20",
            content: "",
            type: "GOOD",
        },
        {
            reviewerNickname: "개강한송",
            postTitle: "화학 실험복 L사이즈 빌리고 싶어요",
            createdAt: "2026. 8. 4",
            content: "약속 시간에 30분 늦으셨어요.",
            type: "BAD",
        },
        ],
    };
}