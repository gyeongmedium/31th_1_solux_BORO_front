// 공통 API 응답 구조
export interface ApiResponse<T> {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
}

export type ChatRoomType = "ITEM" | "EMPTY_SPOT";
export type ChatMessageType = "TEXT" | "IMAGE";
export type requestStatusType = "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";


// 1. GET /api/v1/chat (채팅방 리스트 조회)
// responses
export interface ChatRoomPreview {
    chatRoomId: number;
    chatName: string;
    profileUrl: string;
    lastMessageContent: string;
    lastMessageAt: string;
    unreadCount: number;
}

export interface ChatRoomList {
    chatRoomType: ChatRoomType;
    chatRoomList: ChatRoomPreview[];
}

export type ApiResponseChatRoomList = ApiResponse<ChatRoomList>;


// 2. POST /api/v1/chat/{postId} (대여 요청 및 채팅방 생성)
// request body
export interface ChatRoom {
    chatRoomType: ChatRoomType;
}

// responses
export interface CreatedRentalRequest {
    rentalRequestId: number;
    requestStatus: requestStatusType;
    borrowerReturned: boolean;
    ownerReturned: boolean;
    memberId: number;
    postId: number;
}

export type ApiResponseCreatedRentalRequest = ApiResponse<CreatedRentalRequest>;


// 3. POST /api/v1/chat/health (채팅 테스트 - 채팅방 생성)
// request body
export interface ChatRoomTest {
    ownerId: number;
    postId: number;
    chatRoomName: string;
    chatRoomType: ChatRoomType;
}

// reponses
export type ApiResponseVoid = ApiResponse<Record<string, never>>;


// 4. GET /api/v1/chat/{chatRoomId} (채팅방 상세 조회)
// responses
export interface ChatMessageDetail {
    chatMessageType: ChatMessageType;
    memberId: number;
    content: string;
    imageUrls: string[];
    createdAt: string;
}

export interface ChatMessageList {
    chatRoomName: string;
    postName: string;
    profileUrl: string;
    chatMessageList: ChatMessageDetail[];
}

export type ApiResponseChatMessageList = ApiResponse<ChatMessageList>;