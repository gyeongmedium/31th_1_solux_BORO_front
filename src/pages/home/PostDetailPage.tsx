import { ArrowLeft, Share2, Calendar, Clock, MessageCircle } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getPostDetail, likePost } from "../../api/post"
import { categoryLabel, statusLabel, priceUnitLabel } from "../../utils/postMapper"
import type { PostSummary } from "../../types/post"
import { createChatRoom } from "../../api/chat"
import type { ChatRoom } from "../../types/chat";

export default function PostDetailPage() {
  const navigate = useNavigate()
  const { postId } = useParams()

  const [post, setPost] = useState<PostSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!postId) return
      setIsLoading(true)
      try {
        const res = await getPostDetail(Number(postId))
        setPost(res.data.result)
      } catch (err) {
        console.error("게시글 상세 조회 실패:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPostDetail()
  }, [postId])

  const handleCopyUrl = async () => {
  try {
    // 최신 웹 브라우저 클립보드 API
    await navigator.clipboard.writeText(window.location.href);
    alert("링크가 클립보드에 복사되었습니다!");
  } catch (err) {
    // 클립보드 API 사용 불가 시 구형 방식(Fallback) 처리
    try {
      const textarea = document.createElement("textarea");
      textarea.value = window.location.href;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("링크가 클립보드에 복사되었습니다!");
    } catch (fallbackErr) {
      console.error("URL 복사 실패:", fallbackErr);
      alert("URL 복사에 실패했습니다. 주소창의 링크를 직접 복사해주세요.");
    }
  }
};
  const toggleLike = async () => {
    if (!post) return
    setPost((prev) =>
      prev
        ? {
            ...prev,
            liked: !prev.liked,
            likeCount: prev.liked ? prev.likeCount - 1 : prev.likeCount + 1,
          }
        : prev
    )
    try {
      await likePost(post.postId)
    } catch (err) {
      console.error("좋아요 처리 실패:", err)
    }
  }

  {/* 경민: 채팅하기 버튼과 채팅방 생성 연결을 위한 코드 (나중에 이 주석 삭제하기) */}
  const handleStartChat = async () => {
    if (!postId) return;

    try {
      const requestData: ChatRoom = {
        chatRoomType: "ITEM",
      };

      const response = await createChatRoom(post.postId, requestData);

      if (response.isSuccess && response.result) {

        // 생성된 chatRoomId를 방 ID로 사용하여 DetailedChatPage로 이동
        const createdRoomId = response.result.chatRoomId;

        navigate(`/chat/${createdRoomId}`, {
          state: {
            ownerNickname: post?.authorNickname,
            title: post?.title,
          },
        });
      } else {
        alert(response.message || "채팅방 생성에 실패했습니다.");
      }
    } catch (err) {
      console.error("채팅방 생성 중 오류 발생:", err);
      alert("채팅방을 생성할 수 없습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-[#7F7F7F]">불러오는 중...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-[#7F7F7F]">게시글을 찾을 수 없어요</p>
      </div>
    )
  }

  //////////////////////////////////////////////
  //UI 화면
  return (
    // 전체 화면 컨테이너 (#root 내부를 꽉 채움)
    <div className="relative w-full h-full bg-white flex flex-col overflow-hidden">
      
      {/* 1. 세로 스크롤 영역 */}
      <div className="vertical-scroll flex-1 min-h-0">
        {/* .vertical-scroll > * 스타일 오버레이 꼼수가 정상 작동하도록 감싸는 Wrapper */}
        <div>
          {/* 헤더 */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft size={24} className="text-[#1A1A1A]" />
            </button>
            {/* 공유 버튼 */}
          <button onClick={handleCopyUrl} aria-label="링크 공유">
            <Share2 size={20} className="text-[#1A1A1A]" />
          </button>
        </div>
          {/* 이미지 영역 */}
          <div className="px-4 mb-5">
            {post.imageUrlList[0] ? (
              <img
                src={post.imageUrlList[0]}
                alt={post.title}
                className="w-92.5 h-73.75 object-cover rounded-[40px]"
              />
            ) : (
              <div className="w-92.5 h-73.75 bg-[#E6E6E6] rounded-[40px] flex items-center justify-center">
                <img src="/logo3.png" alt="기본 이미지" className="w-16 h-16 object-contain opacity-60" />
              </div>
            )}
          </div>

          {/* 상세 정보 카드 */}
          <div className="px-4 mb-5">
            <div className="w-92.5 min-h-105.25 border border-[#9996FF] rounded-[40px] px-6 pt-5 pb-5">
              {/* 작성자 */}
              <div className="flex items-center gap-3 mb-5 my-4">
                <div className="w-11.25 h-11.25 bg-linear-to-br from-[#3A3A5C] to-[#1A1A2E] rounded-full shrink-0" />
                <span 
                  className="text-[16px] text-[#1A1A1A]"
                  style={{ fontFamily: "Pretendard", fontWeight: 700, lineHeight: "1.2" }}
                >
                  {post.authorNickname}
                </span>
              </div>

              {/* 상태 뱃지 */}
              <div className="flex gap-2 mb-4">
                <span className="w-15.5 h-7.5 flex items-center justify-center text-[12px] font-normal bg-[#E9F5EE] text-[#000000] rounded-[40px]">
                  {statusLabel[post.status]}
                </span>
                <span className="w-10.75 h-7.5 flex items-center justify-center text-[12px] font-normal bg-[#E9E8FF] text-[#000000] rounded-[40px]">
                  {categoryLabel[post.category]}
                </span>
              </div>

              {/* 제목 */}
              <p 
                className="w-76.25 text-[16px] mb-4"
                style={{ fontFamily: "Pretendard", fontWeight: 700, lineHeight: "1.3" }}
              >
                {post.title}
              </p>

              {/* 설명 */}
              <p 
                className="w-76.25 text-[14px] text-[#000000] mb-5"
                style={{ fontFamily: "Pretendard", fontWeight: 400, lineHeight: "1.3" }}
              >
                {post.description}
              </p>

              {/* 대여 신청일 */}
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={22} className="text-[#7F7F7F] shrink-0" />
                <span 
                  className="w-41.5 text-[12px] text-[#43A860]"
                  style={{ fontFamily: "Pretendard", fontWeight: 400, lineHeight: "1.2" }}
                >
                  대여 신청일 : {post.rentalStartTime}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-9">
                <Clock size={22} className="text-[#7F7F7F] shrink-0" />
                <span className="text-[12px] text-[#7F7F7F]">
                  {new Date(post.createdAt).toLocaleString("ko-KR", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>

              {/* 대여 비용 */}
              <div 
                className="w-88 h-17 flex items-center justify-between px-4 -mx-2 mb-4"
                style={{ background: "linear-gradient(90deg, #FFFFFF 0%, #E4E4FF 100%)" }}
              >
                <span 
                  className="text-[16px] text-[#1A1A1A] whitespace-nowrap"
                  style={{ fontFamily: "Pretendard", fontWeight: 700 }}
                >
                  대여 비용
                </span>
                <span 
                  className="text-[16px] text-[#1A1A1A] whitespace-nowrap"
                  style={{ fontFamily: "Pretendard", fontWeight: 700 }}
                >
                  {post.rentalPrice.toLocaleString()}원 / {priceUnitLabel[post.rentalPriceUnit]}
                </span>
              </div>
            </div>
          </div>

          {/* 거래 안내 */}
          <div className="px-4 mb-6">
            <div className="w-92.5 min-h-42.75 bg-[#F0F0FF] rounded-[40px] px-5 py-5">
              <div className="flex items-center px-4 gap-4 mb-3">
                <svg 
                  width="20" 
                  height="23" 
                  viewBox="0 0 20 23" 
                  fill="none" 
                  className="shrink-0"
                  style={{ transform: "scaleX(1.2)" }}
                >
                  <path
                    d="M10 0L18 3V10C18 15.5 14.5 20.5 10 23C5.5 20.5 2 15.5 2 10V3L10 0Z"
                    fill="#9996FF"
                  />
                  <path
                    d="M7 11.5L9 13.5L13 9"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span 
                  className="text-[14px] text-[#9996FF]"
                  style={{ fontFamily: "Pretendard", fontWeight: 700, lineHeight: "1.2" }}
                >
                  거래 안내
                </span>
              </div>
              <ul 
                className="text-[12px] text-[#000000] space-y-1 px-5 pt-2"
                style={{ fontFamily: "Pretendard", fontWeight: 500, lineHeight: "1.2" }}
              >
                <li className="w-70.75">• 보증금은 물품 가격의 30-50% 정도를 권장합니다</li>
                <li className="w-70.75">• 계좌 송금 또는 대면 직거래를 이용해주세요</li>
                <li className="w-70.75">• 반납 시 물품 상태를 확인해주세요</li>
                <li className="w-70.75">• 분실 또는 파손 시 보증금으로 처리됩니다</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

       {/* 하단 고정 채팅하기 바 (Group 37: 402x61, border 1px #B3B3B3) */}
      <div
        className="fixed bottom-0 bg-white flex items-center justify-center z-20"
        style={{
          width: "402px",
          height: "61px",
          left: "50%",
          transform: "translateX(-50%)",
          borderTop: "1px solid #B3B3B3",
        }}
      >
        <button
          onClick={handleStartChat}       // 채팅하기 버튼과 채팅방 생성 연결을 위한 코드
          className="flex items-center justify-center gap-2"
          style={{
            width: "304px",
            height: "40px",
            borderRadius: "35.9px",
            backgroundColor: "#D3D3FF",
          }}
        >
          <MessageCircle size={19} strokeWidth={1.5} style={{ height: "18px" }} className="text-[#1A1A1A]" />
          <span
            className="text-[14px] text-[#1A1A1A]"
            style={{ fontFamily: "Pretendard", fontWeight: 400 }}
          >
            채팅하기
          </span>
        </button>
      </div>
    </div>
  )
}