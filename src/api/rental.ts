import api from '../lib/axios';
import type {
    GetLentListResponse,
    GetBorrowedListResponse,
    DecisionResultResponse,
    CreatedReviewResponse,
    ReviewRequest,
    DecisionType,
} from '../types/rental';

// 1. 빌려준 물품 대여 현황 조회
export const getLentRentalRequests = async (): Promise<GetLentListResponse> => {
    const response = await api.get<GetLentListResponse>('/api/v1/rental-requests/lent');
    return response.data;
};

// 2. 내가 빌린 물품들의 대여 현황 조회
export const getBorrowedRentalRequests = async (): Promise<GetBorrowedListResponse> => {
    const response = await api.get<GetBorrowedListResponse>('/api/v1/rental-requests/borrowed');
    return response.data;
};

// 3. 대여 요청 승인/거절
export const decideRentalRequest = async (
    rentalId: number,
    decide: DecisionType
): Promise<DecisionResultResponse> => {
    const response = await api.patch<DecisionResultResponse>(
        `/api/v1/rental-requests/${rentalId}`,
        null,
        {
        params: { decide },
        }
    );
    return response.data;
};

// 4. 대여 중인 물품의 반납 완료 처리
export const completeRentalReturn = async (
    rentalId: number
): Promise<DecisionResultResponse> => {
    const response = await api.patch<DecisionResultResponse>(
        `/api/v1/rentals/${rentalId}`
    );
    return response.data;
};

// 5. 대여 반납 완료 후, 리뷰 생성
export const createRentalReview = async (
    rentalId: number,
    data: ReviewRequest
): Promise<CreatedReviewResponse> => {
    const response = await api.post<CreatedReviewResponse>(
        `/api/v1/rentals/${rentalId}/review`,
        data
    );
    return response.data;
};


//-----------------------------
// mock 데이터
//-----------------------------

/**
 * [테스트용 Mock API] GET /api/v1/rental-requests/lent (내가 빌려준 것)
 */
export const getMockLentRentalRequests = async (): Promise<GetLentListResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
        isSuccess: true,
        code: "COMMON200",
        message: "요청에 성공하였습니다.",
        result: [
            // 1. 일반 물품 - 요청중 (PENDING)
            {
                postId: 10,
                rentalRequestId: 1,
                postCategory: "ELECTRONICS",
                imageUrl: "",
                rentalRequestStatus: "PENDING",
                ownerNickname: "김철수",
                createdAt: new Date().toISOString(),
                itemDetail: {
                    title: "맥북 프로 16인치 대여합니다",
                    rentalStartTime: "2026-07-26",
                    rentalEndTime: "2026-07-28",
                    rentalPrice: 15000,
                    rentalPriceUnit: "DAY"
                }
            },
            // 2. 일반 물품 - 대여중 (APPROVED)
            {
                postId: 11,
                rentalRequestId: 2,
                postCategory: "MAJOR_BOOKS",
                imageUrl: "",
                rentalRequestStatus: "APPROVED",
                ownerNickname: "이영희",
                createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                itemDetail: {
                    title: "컴퓨터 구조 전공 서적",
                    rentalStartTime: "2026-07-25",
                    rentalEndTime: "2026-07-27",
                    rentalPrice: 5000,
                    rentalPriceUnit: "DAY"
                }
            },
            // 3. 빈자리 - 요청중 (PENDING)
            {
                postId: 12,
                rentalRequestId: 3,
                postCategory: "EMPTY_SPOTS",
                imageUrl: "",
                rentalRequestStatus: "PENDING",
                ownerNickname: "박민수",
                createdAt: new Date().toISOString(),
                seatDetail: {
                    location: "중앙도서관 3열람실 A12",
                    floor: 3,
                    seatNumber: 2,
                    expectedCheckoutTime: "",
                    hasPowerOutlet: true,
                    hasWindowSeat: true
                }
            },
            // 4. 빈자리 - 대여중 (APPROVED)
            {
                postId: 13,
                rentalRequestId: 4,
                postCategory: "EMPTY_SPOTS",
                imageUrl: "",
                rentalRequestStatus: "APPROVED",
                ownerNickname: "최지은",
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                seatDetail: {
                    location: "백양관 스터디룸 B04",
                    floor: 2,
                    seatNumber: 223,
                    expectedCheckoutTime: "",
                    hasPowerOutlet: false,
                    hasWindowSeat: false
                }
            }
        ]
    };
};

/**
 * [테스트용 Mock API] GET /api/v1/rental-requests/borrowed (내가 빌린 것)
 */
export const getMockBorrowedRentalRequests = async (): Promise<GetBorrowedListResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
        isSuccess: true,
        code: "COMMON200",
        message: "요청에 성공하였습니다.",
        result: [
            // 1. 내가 빌린 일반 물품 - 대여중 (APPROVED)
            {
                postId: 101,
                rentalRequestId: 101,
                postCategory: "DEPARTMENT_JACKET",
                imageUrl: "https://pbs.twimg.com/media/Gsug_OWaAAAH1-t.jpg",
                rentalRequestStatus: "APPROVED",
                ownerNickname: "한상우",
                createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                itemDetail: {
                    title: "컴퓨터공학과 돕바 (L사이즈)",
                    rentalStartTime: "2026-07-25",
                    rentalEndTime: "2026-07-30",
                    rentalPrice: 8000,
                    rentalPriceUnit: "DAY"
                }
            },
            // 2. 내가 빌린 일반 물품 - 요청중 (PENDING)
            {
                postId: 102,
                rentalRequestId: 102,
                postCategory: "LIVING_SUPPLIES",
                imageUrl: "",
                rentalRequestStatus: "APPROVED",
                ownerNickname: "정다은",
                createdAt: new Date().toISOString(),
                itemDetail: {
                    title: "캠핑용 미니 버너 및 불판",
                    rentalStartTime: "2026-07-26",
                    rentalEndTime: "2026-07-27",
                    rentalPrice: 10000,
                    rentalPriceUnit: "DAY"
                }
            },
            // 3. 내가 빌린 빈자리 - 대여중 (APPROVED)
            {
                postId: 103,
                rentalRequestId: 103,
                postCategory: "EMPTY_SPOTS",
                imageUrl: "",
                rentalRequestStatus: "APPROVED",
                ownerNickname: "강호열",
                createdAt: new Date().toISOString(),
                seatDetail: {
                    location: "학생회관",
                    floor: 2,
                    seatNumber: 1,
                    expectedCheckoutTime: "",
                    hasPowerOutlet: true,
                    hasWindowSeat: true
                }
            }
        ]
    };
};

/**
 * [테스트용 Mock API] PATCH /api/v1/rental-requests/{rentalId} (승인 / 거절)
 */
export const decideMockRentalRequest = async (
    rentalId: number,
    decide: DecisionType
): Promise<DecisionResultResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
        isSuccess: true,
        code: "COMMON200",
        message: `대여 요청이 ${decide === "APPROVE" ? "승인" : "거절"}되었습니다.`,
        result: {
            rentalRequestStatus: decide === "APPROVE" ? "APPROVED" : "REJECTED",
            borrowerReturned: false,
            ownerReturned: false
        }
    };
};

/**
 * [테스트용 Mock API] PATCH /api/v1/rentals/{rentalId} (반납 완료)
 */
export const completeMockRentalReturn = async (
    rentalId: number
): Promise<DecisionResultResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
        isSuccess: true,
        code: "COMMON200",
        message: "반납 처리가 완료되었습니다.",
        result: {
            rentalRequestStatus: "COMPLETED",
            borrowerReturned: true,
            ownerReturned: true
        }
    };
};