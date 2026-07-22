import api from "../lib/axios"
import type { BorrowedRentalResponse, LentRentalResponse } from "../types/rental"
import type { ReviewCreateRequest } from "../types/rental";

// 1. 대여 현황 조회 - 빌린 것
export const getBorrowedRentals = () =>
    api.get<BorrowedRentalResponse>("/api/v1/rental-requests/borrowed")

// 2. 대여 현황 조회 - 빌려준 것
export const getLentRentals = () =>
    api.get<LentRentalResponse>("/api/v1/rental-requests/lent")

// 3. 대여 요청 승인/거절
export const updateRentalRequest = () =>
    api.patch("/api/v1/rental-requests")

// 4. 대연 반납 완료 처리
export const completeRentalReturn = () =>
    api.patch("/api/v1/rental")

// 6. 대여 후기 작성
export async function createRentalReview(
    rentalId: number,
    data: ReviewCreateRequest
): Promise<void> {
    // 실제 API 요청 구현 (예: axios 또는 fetch 사용)
    // const response = await fetch(`/api/v1/rentals/${rentalId}/review`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // if (!response.ok) throw new Error("리뷰 작성 실패");
    
    console.log(`POST /api/v1/rentals/${rentalId}/review`, data);
}