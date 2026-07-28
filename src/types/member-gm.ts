// 공통 API 응답 타입
export interface ApiResponse<T> {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
}


// member/assets (캐릭터 아이템 관련)

// 아이템 카테고리 Enum
export type ItemCategory = "CLOTHING" | "ACCESSORY" | "ETC";

// 보유 캐릭터 아이템 정보
export interface MemberAsset {
    itemId: number;
    itemName: string;
    itemCategory: ItemCategory;
    equipped: boolean;
}

// 1. PATCH /api/v1/members/assets/{assetId}/equips (꾸미기 장착/해제)
// request body
export interface MemberAssetEquipRequest {
    equipped: boolean;
}

// responses
export type ApiResponseMemberAsset = ApiResponse<MemberAsset>;

// 2. GET /api/v1/members/assets (내가 보유한 캐릭터 아이템 조회 Response)
export type ApiResponseListMemberAsset = ApiResponse<MemberAsset[]>;



// member/reviews (대여 후기 관련)

// 후기 감정 Enum
export type ReviewSentiment = "GOOD" | "BAD";

// 후기 정보
export interface Review {
    reviewSentiment: ReviewSentiment;
    content: string;
}

// 3. GET /api/v1/members/reviews/written (작성한 후기 조회)
// 4. GET /api/v1/members/reviews/received (받은 후기 조회)
// responses
export type ApiResponseReview = ApiResponse<Review>;



// member/points (포인트 이력 관련)

// 포인트 이력 정보
export interface PointHistory {
    pointDescription: string;
    point: number;
    createdAt: string;
}

// 5. GET /api/v1/members/points (포인트 이력 조회)
// responses
export type ApiResponseListPointHistory = ApiResponse<PointHistory[]>;