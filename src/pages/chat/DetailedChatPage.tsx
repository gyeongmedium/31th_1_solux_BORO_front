// 상세 채팅

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
//import { getChatMessageList } from "../../api/chat";      // 여기!
import { getMockChatDetails } from "../../api/chat";
import type { ChatMessageDetail, ChatMessageList } from "../../types/chat";
import { uploadImage } from "../../api/upload-image";

// 메시지 상세 시간 포맷 함수 (오전/오후 HH : MM)
const formatDetailTime = (isoString: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "오후" : "오전";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${ampm} ${hours} : ${minutes}`;
};

// 구분선용 날짜 포맷 함수 (오늘 / MM.DD / YY.MM.DD)
const formatSectionDate = (isoString: string): string => {
    if (!isoString) return "";
    const messageDate = new Date(isoString);
    const now = new Date();

    const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const diffTime = today.getTime() - messageDay.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "오늘";
    
    const month = (messageDate.getMonth() + 1).toString().padStart(2, "0");
    const day = messageDate.getDate().toString().padStart(2, "0");

    if (messageDate.getFullYear() < now.getFullYear()) {
        const shortYear = messageDate.getFullYear().toString().slice(-2);
        return `${shortYear}.${month}.${day}`;
    }
    return `${month}.${day}`;
};

// navigation state 타입 정의
interface ChatNavState {
    type?: string;
    title?: string;
    ownerNickname?: string;
    profileUrl?: string;
}

export default function DetailedChatPage() {
    const { roomId } = useParams<{ roomId: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    // LentPage에서 전달받은 state
    const navState = location.state as ChatNavState | null;

    // ChatMessageList 타입을 유지하면서 navState 값으로 초기화
    const [roomInfo, setRoomInfo] = useState<ChatMessageList | null>({
        chatRoomName: navState?.ownerNickname || "",
        postName: navState?.title || "",
        profileUrl: navState?.profileUrl || "",
        chatMessageList: []
    });
    
    // 로그인한 사용자 ID (추후 전역 상태나 토큰 정보로 교체)
    const savedUserId = localStorage.getItem("memberId");
    const currentUserId = savedUserId ? Number(savedUserId) : 0;

    // API 응답 데이터 상태
    const [messages, setMessages] = useState<ChatMessageDetail[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [selectedImages, setSelectedImages] = useState<{ file: File; previewUrl: string }[]>([]);

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!roomId) return;
        const fetchMessages = async () => {
            setIsLoading(true);
            try {
                // GET /api/v1/chat/{chatRoomId} 호출
                //const res = await getChatMessageList(Number(roomId));         // 여기!
                const res = await getMockChatDetails(Number(roomId));           // 여기!
                
                if (res.isSuccess && res.result) {
                    setRoomInfo({
                        ...res.result,
                        // 백엔드가 chatRoomName/postName을 안 넘겨주거나 비어있을 때 navState 값 활용
                        profileUrl: res.result.profileUrl || navState?.profileUrl || "",
                        chatRoomName: res.result.chatRoomName || navState?.ownerNickname || "상대 아이디",
                        postName: res.result.postName || navState?.title || "게시글 제목"
                    });
                    setMessages(res.result.chatMessageList || []);
                }
            } catch (error) {
                console.error("채팅 내역을 불러오는데 실패했습니다.", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMessages();
    }, [roomId, navState]);

    // 메시지 추가 시 컨테이너 내부 스크롤 하단 이동
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // 여기! 
    // 1. 텍스트 영역 높이 자동 조절
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 80)}px`;
        }
    };

    // 2. 이미지 선택 핸들러 (바로 전송 X, 미리보기 생성)
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // 선택한 파일들을 미리보기 URL 객체로 변환
        const newImages = files.map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file),
        }));

        // 기존 선택된 이미지에 추가
        setSelectedImages((prev) => [...prev, ...newImages]);

        e.target.value = ""; // 동일 파일 재선택 가능하도록 초기화
    };

    // 3. 선택한 이미지 취소
    const handleRemoveImage = (indexToRemove: number) => {
        setSelectedImages((prev) => {
            const target = prev[indexToRemove];
            if (target) URL.revokeObjectURL(target.previewUrl); // 메모리 해제
            return prev.filter((_, index) => index !== indexToRemove);
        });
    };

    // 4. 메시지 전송 (텍스트 + 이미지 통합 전송)       // 여기! uploadImage 불러온거 사용하기
    const handleSendMessage = () => {
        if (!inputValue.trim() && selectedImages.length === 0) return;

        const hasImages = selectedImages.length > 0;

        const newMessage: ChatMessageDetail = {
            chatMessageType: hasImages ? "IMAGE" : "TEXT",
            memberId: currentUserId,
            content: inputValue.trim(),
            imageUrls: selectedImages.map((img) => img.previewUrl), // 여러 URL 배열 전달   // 여기! imageUrls: uploadedUrls, 로 고치기
            createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, newMessage]);

        // 입력 폼 초기화
        setInputValue("");
        setSelectedImages([]);

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="relative min-w-[402px] max-w-[402px] min-height-[874px] max-height-[874px] w-[402px] h-[874px] overflow-hidden flex flex-col bg-white border-x border-[#E6E6E6] mx-auto">
            
            {/* 상단 헤더 */}
            <header className="flex items-center justify-between px-5 py-4 flex-shrink-0 bg-white z-10">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                    {/* 화살표 */}
                    <button onClick={() => navigate(-1)} className="ml-2">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 8.36377C14.5523 8.36377 15 7.91605 15 7.36377C15 6.81148 14.5523 6.36377 14 6.36377V7.36377V8.36377ZM0.292893 6.65666C-0.0976315 7.04719 -0.0976315 7.68035 0.292893 8.07088L6.65685 14.4348C7.04738 14.8254 7.68054 14.8254 8.07107 14.4348C8.46159 14.0443 8.46159 13.4111 8.07107 13.0206L2.41421 7.36377L8.07107 1.70692C8.46159 1.31639 8.46159 0.683226 8.07107 0.292702C7.68054 -0.0978227 7.04738 -0.0978227 6.65685 0.292702L0.292893 6.65666ZM14 7.36377V6.36377L1 6.36377V7.36377V8.36377L14 8.36377V7.36377Z" fill="black"/>
                        </svg>
                    </button>
                    {/* 프로필 */}
                    <div className="w-[48px] h-[48px] rounded-full bg-[#E6E6E6] overflow-hidden flex items-center justify-center flex-shrink-0">
                        {roomInfo?.profileUrl ? (
                            <img src={roomInfo.profileUrl} alt="프로필" className="w-full h-full object-cover" />
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.625 16.8125C0.625 15.5859 1.11228 14.4095 1.97963 13.5421C2.84699 12.6748 4.02337 12.1875 5.25 12.1875H14.5C15.7266 12.1875 16.903 12.6748 17.7704 13.5421C18.6377 14.4095 19.125 15.5859 19.125 16.8125C19.125 17.4258 18.8814 18.014 18.4477 18.4477C18.014 18.8814 17.4258 19.125 16.8125 19.125H2.9375C2.32419 19.125 1.73599 18.8814 1.30232 18.4477C0.868638 18.014 0.625 17.4258 0.625 16.8125Z" stroke="#7F7F7F" strokeWidth="1.25" strokeLinejoin="round"/>
                                <path d="M9.875 7.5625C11.7907 7.5625 13.3438 6.00949 13.3438 4.09375C13.3438 2.17801 11.7907 0.625 9.875 0.625C7.95926 0.625 6.40625 2.17801 6.40625 4.09375C6.40625 6.00949 7.95926 7.5625 9.875 7.5625Z" stroke="#7F7F7F" strokeWidth="1.25"/>
                            </svg>
                        )}
                    </div>
                    {/* 닉네임, 게시글 제목 */}
                    <div className="flex flex-col flex-1 min-w-0 justify-center gap-1 mt-1.5">
                        <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[16px] text-[#000000] leading-tight flex-shrink-0">
                                {roomInfo?.chatRoomName || "상대 아이디"}
                            </span>
                            <div className="w-[10px] h-[10px] rounded-full bg-[#43A860] flex-shrink-0 ml-0.5" />
                        </div>
                        <p className="text-[14px] text-[#7F7F7F] line-clamp-1">
                            {roomInfo?.postName || "게시글 제목"}
                        </p>
                    </div>
                </div>

                {/* ⓘ 아이콘 */}
                <button>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 8H12.01V8.01H12V8Z" stroke="black" stroke-width="3" stroke-linejoin="round"/>
                        <path d="M12 12V16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </header>

            {/* 채팅 메시지 영역 */}
            <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-scroll vertical-scroll p-[30px] mt-[-35px] bg-white flex flex-col gap-5"
            >
                {isLoading ? (
                    <div className="text-center text-[#7F7F7F] my-auto text-[14px]">채팅을 불러오는 중...</div>
                ) : messages.length === 0 ? (
                    <div className="text-center text-[#7F7F7F] my-auto text-[14px]">나눈 대화가 없습니다.</div>
                ) : (
                    <>
                        {messages.map((msg, index) => {
                            const isMe = msg.memberId === currentUserId;
                            
                            const currentDateStr = new Date(msg.createdAt).toDateString();
                            const prevDateStr = index > 0 ? new Date(messages[index - 1].createdAt).toDateString() : null;
                            const showDateSection = currentDateStr !== prevDateStr;

                            return (
                                <div key={index} className="flex flex-col gap-3">
                                    {showDateSection && (
                                        <div className="mx-auto bg-[#E6E6E6] text-[#7F7F7F] text-[12px] px-4 py-1 rounded-[40px] my-2 flex-shrink-0">
                                            {formatSectionDate(msg.createdAt)}
                                        </div>
                                    )}

                                    {isMe ? (
                                        <div className="flex flex-col items-end gap-1 w-full flex-shrink-0">
                                            <div className="max-w-[95%] bg-[#E4E4FF] text-[#000000] rounded-[40px] rounded-tr-none px-7 py-5 text-[14px] leading-relaxed break-all whitespace-pre-wrap">
                                                {msg.chatMessageType === "IMAGE" && msg.imageUrls && msg.imageUrls.length > 0 ? (
                                                    <div className="flex flex-col gap-2">
                                                        {msg.imageUrls.map((url, i) => (
                                                            <img key={i} src={url} alt="보낸 이미지" className="max-w-full rounded-[16px] object-cover" />
                                                        ))}
                                                        {msg.content && <p>{msg.content}</p>}
                                                    </div>
                                                ) : (
                                                    msg.content
                                                )}
                                            </div>
                                            <span className="text-[11px] text-[#7F7F7F] mr-1">
                                                {formatDetailTime(msg.createdAt)}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-start gap-1 w-full flex-shrink-0">
                                            <div className="max-w-[95%] bg-[#F0F0F0] text-[#000000] rounded-[40px] rounded-tl-none px-7 py-5 text-[14px] leading-relaxed break-all whitespace-pre-wrap">
                                                {msg.chatMessageType === "IMAGE" && msg.imageUrls && msg.imageUrls.length > 0 ? (
                                                    <div className="flex flex-col gap-2">
                                                        {msg.imageUrls.map((url, i) => (
                                                            <img key={i} src={url} alt="보낸 이미지" className="max-w-full rounded-[16px] object-cover" />
                                                        ))}
                                                        {msg.content && <p>{msg.content}</p>}
                                                    </div>
                                                ) : (
                                                    msg.content
                                                )}
                                            </div>
                                            <span className="text-[11px] text-[#7F7F7F] ml-1">
                                                {formatDetailTime(msg.createdAt)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </>
                )}

            </div>

            {/* 하단 메시지 입력란 */}
            <div className="p-4 bg-white border-t border-[#B3B3B3] flex items-end gap-3 flex-shrink-0 z-10 min-h-[84px]">
                <div className="flex-1 flex flex-col border border-[#CCCCCC] rounded-[24px] px-4 py-2 bg-white gap-2 transition-all overflow-hidden">
                    
                    {/* 선택한 다중 이미지 미리보기 (가로 스크롤) */}
                    {selectedImages.length > 0 && (
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin py-1 max-w-full">
                            {selectedImages.map((img, index) => (
                                <div key={index} className="relative w-14 h-14 flex-shrink-0">
                                    <img 
                                        src={img.previewUrl} 
                                        alt={`미리보기 ${index + 1}`} 
                                        className="w-full h-full object-cover rounded-[12px] border border-[#E6E6E6]" 
                                    />
                                    {/* 개별 삭제(X) 버튼 */}
                                    <button 
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-black/70 text-white rounded-full flex items-center justify-center text-[10px] font-bold"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-3 w-full">
                        {/* 사진 보관함 버튼 */}
                        <label className="text-[#7F7F7F] flex-shrink-0 hover:text-black transition-colors cursor-pointer self-center">
                            <input 
                                type="file" 
                                accept="image/*" 
                                multiple
                                className="hidden" 
                                onChange={handleImageSelect} 
                            />
                            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 1.4375C0.5 1.18886 0.605357 0.950403 0.792893 0.774588C0.98043 0.598772 1.23478 0.5 1.5 0.5H18.5C18.7652 0.5 19.0196 0.598772 19.2071 0.774588C19.3946 0.950403 19.5 1.18886 19.5 1.4375V14.5625C19.5 14.8111 19.3946 15.0496 19.2071 15.2254C19.0196 15.4012 18.7652 15.5 18.5 15.5H1.5C1.23478 15.5 0.98043 15.4012 0.792893 15.2254C0.605357 15.0496 0.5 14.8111 0.5 14.5625V1.4375Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5.25 5.1875C5.44891 5.1875 5.63968 5.11342 5.78033 4.98156C5.92098 4.8497 6 4.67086 6 4.48438C6 4.29789 5.92098 4.11905 5.78033 3.98719C5.63968 3.85533 5.44891 3.78125 5.25 3.78125C5.05109 3.78125 4.86032 3.85533 4.71967 3.98719C4.57902 4.11905 4.5 4.29789 4.5 4.48438C4.5 4.67086 4.57902 4.8497 4.71967 4.98156C4.86032 5.11342 5.05109 5.1875 5.25 5.1875Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5.5 8L8 9.875L11 6.59375L19.5 12.6875V14.5625C19.5 14.8111 19.3946 15.0496 19.2071 15.2254C19.0196 15.4012 18.7652 15.5 18.5 15.5H1.5C1.23478 15.5 0.98043 15.4012 0.792893 15.2254C0.605357 15.0496 0.5 14.8111 0.5 14.5625V12.6875L5.5 8Z" stroke="black" strokeLinejoin="round"/>
                            </svg>
                        </label>
                        
                        <div className="w-[1px] h-4 bg-[#CCCCCC] mx-1 self-center" />
                        
                        {/* 텍스트 입력창 */}
                        <textarea 
                            ref={textareaRef}
                            rows={1}
                            placeholder="메시지를 입력하세요." 
                            value={inputValue}
                            onChange={handleTextareaChange}
                            onKeyDown={handleKeyDown}
                            className="flex-1 text-[14px] focus:outline-none resize-none min-h-[22px] max-h-[80px] overflow-y-auto scrollbar-none py-0.5 leading-normal"
                        />
                    </div>
                </div>

                {/* 전송 버튼 */}
                <button 
                    onClick={handleSendMessage} 
                    className="flex-shrink-0 active:opacity-80 transition-opacity mb-0.5"
                >
                    <svg width="48" height="48" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="29.5" cy="29.5" r="29.5" fill="#9996FF"/>
                        <path d="M37.9056 24.0577C38.3472 22.836 37.1634 21.6522 35.9418 22.0948L21.0118 27.4947C19.7861 27.9383 19.6379 29.6108 20.7655 30.2641L25.5312 33.0233L29.7868 28.7674C29.9796 28.5812 30.2379 28.4782 30.5059 28.4805C30.7739 28.4828 31.0303 28.5903 31.2199 28.7799C31.4094 28.9694 31.5169 29.2258 31.5192 29.4939C31.5216 29.7619 31.4185 30.0202 31.2323 30.213L26.9767 34.4688L29.7368 39.2348C30.389 40.3624 32.0614 40.2132 32.505 38.9885L37.9056 24.0577Z" fill="white"/>
                    </svg>
                </button>
            </div>

        </div>
    );
}