import api from "../lib/axios";
import type {
    ApiResponseChatRoomList,
    ApiResponseCreatedRentalRequest,
    ApiResponseChatMessageList,
    ApiResponseVoid,
    ChatRoom,
    ChatRoomTest,
    ChatRoomType,
} from "../types/chat";

// 1. GET /api/v1/chat (채팅방 리스트 조회)
export const getChatRooms = async (
    type?: ChatRoomType
): Promise<ApiResponseChatRoomList> => {
    const response = await api.get<ApiResponseChatRoomList>("/api/v1/chat", {
        params: { type },
    });
    return response.data;
};

// 2. POST /api/v1/chat/{postId} (대여 요청 및 채팅방 생성)
export const createChatRoom = async (
    postId: number,
    data: ChatRoom
): Promise<ApiResponseCreatedRentalRequest> => {
    const response = await api.post<ApiResponseCreatedRentalRequest>(
        `/api/v1/chat/${postId}`,
        data
    );
    return response.data;
};

//* 3. POST /api/v1/chat/health (채팅 테스트 - 채팅방 생성)
export const createTestChatRoom = async (
    data: ChatRoomTest
): Promise<ApiResponseVoid> => {
    const response = await api.post<ApiResponseVoid>(
        "/api/v1/chat/health",
        data
    );
    return response.data;
};

// 4. GET /api/v1/chat/{chatRoomId} (채팅방 상세 조회)
export const getChatMessageList = async (
    chatRoomId: number
): Promise<ApiResponseChatMessageList> => {
    const response = await api.get<ApiResponseChatMessageList>(
        `/api/v1/chat/${chatRoomId}`
    );
    return response.data;
};



/**
 * [테스트용 Mock API] GET /api/v1/chat
 */
export const getMockChatRooms = async (
    type?: ChatRoomType
): Promise<ApiResponseChatRoomList> => {
    // 실제 API 통신 느낌을 주기 위한 0.5초 딜레이
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (type === "EMPTY_SPOT") {
        return {
            isSuccess: true,
            code: "200",
            message: "요청에 성공하였습니다.",
            result: {
                chatRoomType: "EMPTY_SPOT",
                chatRoomList: [
                    {
                        chatRoomId: 101,
                        chatName: "스터디마스터",
                        profileUrl: "",
                        lastMessageContent: "",
                        lastMessageAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
                        unreadCount: 1,
                        location: "중앙도서관",
                        floor: 4,
                        seatNumber: 23,
                        hasPowerOutlet: true,
                        hasWindowSeat: true,
                        expectedCheckoutTime: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
                    },
                    {
                        chatRoomId: 102,
                        chatName: "열공러",
                        profileUrl: "",
                        lastMessageContent: "학생회관 3층 열람실 12번",
                        lastMessageAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
                        unreadCount: 0,
                        location: "",
                        hasPowerOutlet: false,
                        hasWindowSeat: false,
                        expectedCheckoutTime: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
                    },
                    
                ],
            },
        };
    }

    // 기본값: "ITEM" (거래 채팅)
    return {
        isSuccess: true,
        code: "200",
        message: "요청에 성공하였습니다.",
        result: {
            chatRoomType: "ITEM",
            chatRoomList: [
                {
                chatRoomId: 1,
                chatName: "코딩왕",
                profileUrl: "",
                lastMessageContent: "안녕하세요! 혹시 내일 대여 가능할까요?",
                lastMessageAt: new Date().toISOString(),
                unreadCount: 2,
                postTitle: "컴과 과잠 대여하고 싶어요.",
                },
                {
                chatRoomId: 2,
                chatName: "공대생활",
                profileUrl: "https://blackscreen.space/images/pro/blue-screen_42.png",
                lastMessageContent: "네, 정문 앞에서 3시에 뵙겠습니다.",
                lastMessageAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 어제
                unreadCount: 0,
                postTitle: "실험복 대여"
                },
                
            ],
        },
    };
};


export const MockChatDetails = {
    isSuccess: true,
    code: "200",
    message: "요청에 성공하였습니다.",
    result: {
        chatRoomName: "공대생활",
        postName: "전공 서적/노트북 받침대 대여합니다",
        profileUrl: "",
        chatMessageList: [
            {
                chatMessageType: "TEXT",
                memberId: 999, // 내 아이디
                content: "안녕하세요! 물품 대여 관련해서 문의드립니다.",
                imageUrls: [],
                createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 - 10 * 60 * 1000).toISOString(), // 어제
            },
            {
                chatMessageType: "TEXT",
                memberId: 2, // 상대방(공대생활) 아이디
                content: "네, 안녕하세요! 어떤 거 문의하고 싶으신가요?",
                imageUrls: [],
                createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 - 8 * 60 * 1000).toISOString(),
            },
            {
                chatMessageType: "TEXT",
                memberId: 999, // 내 아이디
                content: "혹시 내일 오후에 직접 수령 가능할까요?",
                imageUrls: [],
                createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000 - 5 * 60 * 1000).toISOString(),
            },
            {
                chatMessageType: "TEXT",
                memberId: 2, // 상대방(공대생활) 아이디 (최신 메시지와 일치)
                content: "네, 정문 앞에서 3시에 뵙겠습니다.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.",
                imageUrls: [],
                createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 어제 (목록의 lastMessageAt과 동일)
            },
            {
                chatMessageType: "IMAGE",
                memberId: 2, // 상대방(공대생활) 아이디 (최신 메시지와 일치)
                content: "",
                imageUrls: ["https://e1.pngegg.com/pngimages/964/1007/png-clipart-rilakkuma-x19-thumbnail.png"],
                createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 어제 (목록의 lastMessageAt과 동일)
            }
        ]
    }
};

export const getMockChatDetails = async (roomId: number) => {
    // 필요시 roomId에 따라 다른 mock 데이터를 리턴하도록 확장 가능
    if (roomId === 2) {
        return MockChatDetails;
    }
};