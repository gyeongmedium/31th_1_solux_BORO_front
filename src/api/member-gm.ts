import api from "../lib/axios";
import type {
    ApiResponseListMemberAsset,
    ApiResponseMemberAsset,
    MemberAssetEquipRequest,
    ReviewResponse,
    ReviewSentiment,
    ApiResponseListPointHistory,
} from "../types/member-gm";


// 1. GET /api/v1/members/assets (내가 보유한 캐릭터 아이템 조회 API)
export const getMemberAssets = async (): Promise<ApiResponseListMemberAsset> => {
    const response = await api.get<ApiResponseListMemberAsset>(
        "/api/v1/members/assets"
    );
    return response.data;
};

// 2. PATCH /api/v1/members/assets/{assetId}/equips (꾸미기 장착/해제 API)
export const equipMemberAsset = async (
    assetId: number,
    data: MemberAssetEquipRequest
): Promise<ApiResponseMemberAsset> => {
    const response = await api.patch<ApiResponseMemberAsset>(
        `/api/v1/members/assets/${assetId}/equips`,
        data
    );
    return response.data;
};


// 3. GET /api/v1/members/reviews/received (내가 받은 대여 후기 리스트 조회 API)
export const getReceivedReviews = async (
    reviewSentiment?: ReviewSentiment
): Promise<ReviewResponse> => {
    const response = await api.get<ReviewResponse>(
        "/api/v1/members/reviews/received",
        {
            params: { reviewSentiment },
        }
    );
    return response.data;
};

// 4. GET /api/v1/members/reviews/written (내가 작성한 대여 후기 리스트 조회 API)
export const getWrittenReviews = async (
    reviewSentiment?: ReviewSentiment
): Promise<ReviewResponse> => {
    const response = await api.get<ReviewResponse>(
        "/api/v1/members/reviews/written",
        {
            params: { reviewSentiment },
        }
    );
    return response.data;
};


// 5. GET /api/v1/members/points (포인트 이력 조회 API)
export const getPointHistories = async (): Promise<ApiResponseListPointHistory> => {
    const response = await api.get<ApiResponseListPointHistory>(
        "/api/v1/members/points"
    );
    return response.data;
};


// ==========================================
// Mock 데이터 정의 및 API 핸들러
// ==========================================
import type { Review } from "../types/member-gm";

// 1. Mock 데이터 정의 (새로운 Review 구조 반영)
const MOCK_GOOD_REVIEWS: Review = {
    likeCount: 3,
    dislikeCount: 1,
    reviewDetailList: [
        {
            memberId: 1,
            memberNickname: "코딩왕",
            postTitle: "노트북 대여합니다",
            createdAt: "2026-07-15",
            content: "약속 시간도 잘 지키시고 설명도 너무 친절하게 해주셨어요! 물건 상태도 설명하신 것이랑 똑같아서 대만족입니다 :)",
        },
        {
            memberId: 2,
            memberNickname: "눈송이",
            postTitle: "전공 서적 대여",
            createdAt: "2026-07-20",
            content: "친절하고 좋은 거래였습니다!",
        },
        {
            memberId: 3,
            memberNickname: "숙명인",
            postTitle: "보조배터리 빌려드려요",
            createdAt: "2026-07-25",
            content: "포장도 꼼꼼하게 해서 보내주셨고, 제품 동작도 문제없이 잘 됩니다.",
        },
    ],
};

const MOCK_BAD_REVIEWS: Review = {
    likeCount: 3,
    dislikeCount: 1,
    reviewDetailList: [
        {
            memberId: 4,
            memberNickname: "레몬",
            postTitle: "우산 대여합니다",
            createdAt: "2026-06-10",
            content: "약속 시간에 20분 정도 늦으셨는데 미리 연락이 없으셔서 조금 아쉬웠습니다.",
        },
    ],
};

// 2. Mock 조회 함수
export const getMockReceivedReviews = async (
    sentiment: ReviewSentiment
): Promise<{ isSuccess: boolean; result: Review }> => {
    // 실제 서버 통신처럼 0.2초 딜레이
    await new Promise((resolve) => setTimeout(resolve, 200));

    const data = sentiment === "GOOD" ? MOCK_GOOD_REVIEWS : MOCK_BAD_REVIEWS;

    return {
        isSuccess: true,
        result: data,
    };
};

// 백엔드 연동 전 Mock 데이터를 반환하는 함수 (테스트용)
export const getMockWrittenReviews = async (
    reviewSentiment?: ReviewSentiment
): Promise<ReviewResponse> => {
    // 1초 후 Mock Response 반환
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                isSuccess: true,
                code: "COMMON200",
                message: "성공입니다.",
                result: {
                    likeCount: 2,
                    dislikeCount: 1,
                    reviewDetailList:
                        reviewSentiment === "GOOD"
                            ? [
                                    {
                                        memberId: 101,
                                        memberNickname: "이웃집토토로",
                                        postTitle: "닌텐도 스위치 OLED 풀셋 대여",
                                        createdAt: "2026-07-20",
                                        content: "시간 맞춰 잘 전달해주셨고 물품 상태도 깨끗해서 아주 좋았습니다! 다음에 또 거래하고 싶어요.",
                                    },
                                    {
                                        memberId: 102,
                                        memberNickname: "캠핑조아",
                                        postTitle: "4인용 원터치 텐트 + 의자 2개",
                                        createdAt: "2026-07-15",
                                        content: "친절하고 빠른 응대 감사드립니다.",
                                    },
                                ]
                                : [
                                    {
                                        memberId: 103,
                                        memberNickname: "매너거래원함",
                                        postTitle: "전동 킥보드 렌탈",
                                        createdAt: "2026-06-28",
                                        content: "약속 시간보다 20분 늦게 오셨어요.",
                                    },
                                ],
                },
            });
        }, 200);
    });
};