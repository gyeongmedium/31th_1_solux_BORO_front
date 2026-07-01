export type RequestStatus = "APPROVED" | "REJECTED"  // 백엔드 확인 필요
export type ReviewSentiment = 'GOOD' | 'BAD';

export interface BorrowedRentalResponse {
    requestStatus: RequestStatus
    rentalTime: string
}

export interface LentRentalResponse {
    name: string
}

export interface CreateReviewRequest {
    reviewSentiment: ReviewSentiment;
}

export interface ReviewResponse {
    author: string
    title: string
    createdAt: string
    reviewSentiment: ReviewSentiment
}