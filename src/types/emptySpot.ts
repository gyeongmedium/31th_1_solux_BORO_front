export interface EmptySpotListResponse {
    postId: number; 
    emptySpotId: number; 
    location: string;
    floor: number;
    seatNumber: number;
    hasPowerOutlet: boolean;
    hasWindowSeat: boolean;
    expectedCheckoutTime: string;
    createdAt: string;
    authorNickname: string; 
}

export interface EmptySpotDetailResponse {
    postId: number;
    emptySpotId: number; 
    status: string;
    location: string;
    floor: number;
    seatNumber: number;
    hasPowerOutlet: boolean;
    hasWindowSeat: boolean;
    expectedCheckoutTime: string;
    createdAt: string;
    authorNickname: string;
}

export interface CreateEmptySpotRequest {
    location: string;
    floor: number;
    seatNumber: number;
    hasPowerOutlet: boolean;
    hasWindowSeat: boolean;
    expectedCheckoutTime: string;
}

export interface UpdateEmptySpotRequest {
    location: string;
    floor: number;
    seatNumber: number;
    hasPowerOutlet: boolean;
    hasWindowSeat: boolean;
    expectedCheckoutTime: string;
}