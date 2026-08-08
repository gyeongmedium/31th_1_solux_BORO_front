// 요청(Request) 타입
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

// 응답(Response) 타입
export interface EmptySpotCreateResponse {
  postId: number;
  emptySpotId: number;
  location: string;
  floor: number;
  seatNumber: number;
  hasPowerOutlet: boolean;
  hasWindowSeat: boolean;
  expectedCheckoutTime: string;
  createdAt: string;
  profileUrl: string;
  authorNickname: string;
  status: "ACTIVE" | "RENTED" | "COMPLETED" | "DELETED";
}

export interface EmptySpotListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: EmptySpotCreateResponse[];
}

export interface EmptySpotDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: EmptySpotCreateResponse;
}