export type RequestStatus = "APPROVED" | "REJECTED"  // 백엔드 확인 필요
export type ReviewSentiment = 'GOOD' | 'BAD';


// 빌려준 것
export interface LentRentalResponse {
    requestStatus: RequestStatus
    rentalStartTime: string
    borrower: string
    title: string
}

// 빌린 것
export interface BorrowedRentalResponse {
    requestStatus: RequestStatus
    rentalStartTime: string
    rentalEndTime: string
    lender: string
    title: string
}

export interface CreateReviewRequest {
    reviewSentiment: ReviewSentiment
}

export interface ReviewResponse {
    author: string
    title: string
    createdAt: string
    reviewSentiment: ReviewSentiment
}