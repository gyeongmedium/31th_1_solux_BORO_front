// 거래 채팅 목록 (기본)

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { getChatRooms } from "../../api/chat";        // 여기!
import { getMockChatRooms } from "../../api/chat";      // 여기!
import type { ChatRoomPreview } from "../../types/chat";
import BottomNav from "../../components/BottomNav";
import Tab from "../../components/Tab";

// LocalDateTime 문자열을 받아 오늘/어제/날짜 형식으로 변환하는 함수
const formatChatTime = (dateTimeStr: string): string => {
    if (!dateTimeStr) return "";
    const messageDate = new Date(dateTimeStr);
    const now = new Date();

    const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const diffTime = today.getTime() - messageDay.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        let hours = messageDate.getHours();
        const minutes = messageDate.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "오후" : "오전";
        
        hours = hours % 12;
        hours = hours ? hours : 12;
        
        return `${ampm} ${hours} : ${minutes}`;
    } else if (diffDays === 1) {
        return "어제";
    } else {
        const currentYear = now.getFullYear();
        const messageYear = messageDate.getFullYear();
        
        const month = (messageDate.getMonth() + 1).toString().padStart(2, "0");
        const day = messageDate.getDate().toString().padStart(2, "0");

        if (messageYear < currentYear) {
            const shortYear = messageYear.toString().slice(-2);
            return `${shortYear}.${month}.${day}`;
        } else {
            return `${month}.${day}`;
        }
    }
};

export default function ChatListPage() {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState<ChatRoomPreview[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTradeRooms = async () => {
            try {
                setLoading(true);
                // 1. GET /api/v1/chat?type=ITEM 호출
                //const res = await getChatRooms("ITEM");       // 여기!
                const res = await getMockChatRooms("ITEM");     // 여기!
                
                if (res.isSuccess && res.result?.chatRoomList) {
                    // 받아온 채팅방 리스트를 최신 메시지 작성 시간 순(내림차순) 정렬
                    const sorted = [...res.result.chatRoomList].sort(
                        (a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
                    );
                    setRooms(sorted);
                }
            } catch (error) {
                console.error("거래 채팅 목록 조회 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTradeRooms();
    }, []);

    return (
        <div className="relative min-w-[402px] max-w-[402px] min-height-[874px] max-height-[874px] w-[402px] h-[874px] overflow-hidden flex flex-col bg-white">
            {/* 상단 헤더 */}
            <div className="pl-[30px] pt-[30px] pb-5 flex-shrink-0">
                <h1 className="text-2xl font-bold leading-none text-black">채팅</h1>
            </div>

            {/* 탭 메뉴 */}
            <Tab 
                activeTab="first"
                firstLabel="거래 채팅"
                firstPath="/chat/"
                secondLabel={(
                    <div className="flex items-center gap-1.5 justify-center">
                        <svg 
                            width="11" 
                            height="12" 
                            viewBox="0 0 11 12" 
                            xmlns="http://www.w3.org/2000/svg"
                            className="flex-shrink-0"
                        >
                            <path d="M9.90776 1.46182C10.266 1.06642 9.92838 0.500017 9.333 0.500017H4.71566C4.59063 0.49922 4.46747 0.526508 4.35802 0.579258C4.24858 0.632007 4.15652 0.708444 4.09071 0.801217L0.596763 5.87483C0.32107 6.27443 0.667577 6.77303 1.22102 6.77303H3.57851L1.35784 11.612C1.03677 12.224 1.90441 12.7838 2.48742 12.341L11.5 4.89862H6.79126L9.90776 1.46182Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                fill="none"
                            />
                        </svg>
                        <span>빈자리 채팅</span>
                    </div>)}
                secondPath="/chat/spot"
            />

            {/* 거래 채팅 리스트 영역 */}
            <div className="flex-1 overflow-y-auto vertical-scroll pl-[30px] pr-[20px] space-y-6 pt-6 pb-[70px]">
                {loading ? (
                    <div className="text-center py-10 text-gray-400">채팅방 목록을 불러오는 중...</div>
                ) : rooms.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">참여 중인 거래 채팅방이 없습니다.</div>
                ) : (
                    rooms.map((room) => (
                        <div key={room.chatRoomId}
                            onClick={() => navigate(`/chat/${room.chatRoomId}`, { 
                                        state: { 
                                            type: "TRADE",
                                            ownerNickname: room.chatName,  // 상대 아이디
                                            title: room.postTitle,          // 게시글 제목
                                            profileUrl: room.profileUrl    // 프로필 이미지 URL
                                        } 
                                    })}                            
                                className="flex items-stretch justify-between cursor-pointer group w-[341px]"
                        >
                            <div className="flex items-center gap-[13px] mb-[30px] flex-1">
                                {/* 프로필 이미지 구역 */}
                                <div className="w-[56px] h-[56px] rounded-full bg-[#E6E6E6] flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    {room.profileUrl ? (
                                        <img src={room.profileUrl} alt="프로필" className="w-full h-full object-cover" />
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.625 16.8125C0.625 15.5859 1.11228 14.4095 1.97963 13.5421C2.84699 12.6748 4.02337 12.1875 5.25 12.1875H14.5C15.7266 12.1875 16.903 12.6748 17.7704 13.5421C18.6377 14.4095 19.125 15.5859 19.125 16.8125C19.125 17.4258 18.8814 18.014 18.4477 18.4477C18.014 18.8814 17.4258 19.125 16.8125 19.125H2.9375C2.32419 19.125 1.73599 18.8814 1.30232 18.4477C0.868638 18.014 0.625 17.4258 0.625 16.8125Z" stroke="#7F7F7F" strokeWidth="1.25" strokeLinejoin="round"/>
                                            <path d="M9.875 7.5625C11.7907 7.5625 13.3438 6.00949 13.3438 4.09375C13.3438 2.17801 11.7907 0.625 9.875 0.625C7.95926 0.625 6.40625 2.17801 6.40625 4.09375C6.40625 6.00949 7.95926 7.5625 9.875 7.5625Z" stroke="#7F7F7F" strokeWidth="1.25"/>
                                        </svg>
                                    )}
                                </div>

                                {/* 텍스트 구역 */}
                                <div className="flex flex-col gap-[9px] flex-1 min-w-0">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <span className="font-bold text-[16px] text-[#000000] flex-shrink-0">
                                            {room.chatName}
                                        </span>
                                        <span className="text-[12px] text-[#4843D4] line-clamp-1 flex-1 ml-2 mb-0.5">
                                            {room.postTitle}
                                        </span>
                                    </div>
                                    <span className="text-[12px] text-[#7F7F7F] line-clamp-1 pr-2">
                                        {room.lastMessageContent}
                                    </span>
                                </div>
                            </div>

                            {/* 시간 및 알림 배지 구역 */}
                            <div className="flex flex-col items-end gap-3 flex-shrink-0 w-[80px] pt-1 text-right">
                                <span 
                                    className={`text-[12px] ${
                                        new Date(room.lastMessageAt).toDateString() === new Date().toDateString()
                                            ? "text-[#1A1A1A]"
                                            : "text-[#7F7F7F]"
                                    }`}
                                >
                                    {formatChatTime(room.lastMessageAt)}
                                </span>
                                {room.unreadCount > 0 ? (
                                    <div className="w-[22px] h-[22px] rounded-full bg-[#FF5E00] flex items-center justify-center text-white text-[12px]">
                                        {room.unreadCount}
                                    </div>
                                ) : (
                                    <div className="h-[22px]" />
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* 하단 공통 네비게이션 */}
            <BottomNav/>
        </div>
    );
}