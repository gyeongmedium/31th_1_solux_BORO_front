import api from "../lib/axios";
import type {
    ApiResponseListMemberAsset,
    ApiResponseMemberAsset,
    MemberAssetEquipRequest,
    ApiResponseReview,
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
    reviewSentiment: ReviewSentiment
): Promise<ApiResponseReview> => {
    const response = await api.get<ApiResponseReview>(
        "/api/v1/members/reviews/received",
        {
            params: { reviewSentiment },
        }
    );
    return response.data;
};

// 4. GET /api/v1/members/reviews/written (내가 작성한 대여 후기 리스트 조회 API)
export const getWrittenReviews = async (
    reviewSentiment: ReviewSentiment
): Promise<ApiResponseReview> => {
    const response = await api.get<ApiResponseReview>(
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