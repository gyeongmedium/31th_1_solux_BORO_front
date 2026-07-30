import { ArrowLeft, Share2, MapPin, Clock, Calendar, MessageCircle } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

export default function SpotDetailPage() {
  const navigate = useNavigate()
  const { spotId } = useParams()

  // mock 데이터 (실제로는 spotId로 API 조회)
  const spot = {
    imageUrl: null,
    status: "대여가능",
    category: "빈자리",
    title: "스타벅스 숙대 정문점 자리 양도",
    location: "스타벅스 숙대 정문점",
    floor: 1,
    window: true,
    outlet: false,
    author: "카페인중독",
    timeLeft: "10분 후",
    dateTime: "2026. 4. 7 오전 10:30",
  }

  return (
    <div className="flex flex-col bg-white pb-24 vertical-scroll">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={24} className="text-[#1A1A1A]" />
        </button>
        <button>
          <Share2 size={20} className="text-[#1A1A1A]" />
        </button>
      </div>

      {/* 이미지 영역 (Rectangle 91: 370x295, radius 40) */}
      <div className="px-4 mb-5">
        {spot.imageUrl ? (
          <img
            src={spot.imageUrl}
            alt={spot.title}
            className="w-[370px] h-[295px] object-cover rounded-[40px]"
          />
        ) : (
          <div className="w-[370px] h-[295px] bg-[#E6E6E6] rounded-[40px] flex items-center justify-center">
            <img src="/logo3.png" alt="기본 이미지" className="w-16 h-16 object-contain opacity-60" />
          </div>
        )}
      </div>

      {/* 상세 정보 카드 (Rectangle 110: 370x421, radius 40, border 1px) */}
      <div className="px-4 mb-5">
        <div className="w-[370px] min-h-[421px] border border-[#9996FF] rounded-[40px] px-6 pt-5 pb-5">
          {/* 작성자 (사진 45x45, 이름 font16 bold) */}
          <div className="flex items-center gap-3 mb-5 my-4">
            <div className="w-[45px] h-[45px] bg-gradient-to-br from-[#3A3A5C] to-[#1A1A2E] rounded-full flex-shrink-0" />
            <span
              className="text-[16px] text-[#1A1A1A]"
              style={{ fontFamily: "Pretendard", fontWeight: 700, lineHeight: "1.2" }}
            >
              {spot.author}
            </span>
          </div>

          {/* 상태 뱃지 */}
          <div className="flex gap-2 mb-4">
            <span className="w-[62px] h-[30px] flex items-center justify-center text-[12px] font-normal bg-[#E9F5EE] text-[#1A1A1A] rounded-[40px]">
              {spot.status}
            </span>
            <span className="w-[62px] h-[30px] flex items-center justify-center text-[12px] font-normal bg-[#E9E8FF] text-[#1A1A1A] rounded-[40px]">
              {spot.category}
            </span>
          </div>

          {/* 제목 */}
          <p
            className="w-[305px] text-[16px] mb-4"
            style={{ fontFamily: "Pretendard", fontWeight: 700, lineHeight: "1.3" }}
          >
            {spot.title}
          </p>

          {/* 위치 */}
          <div className="flex items-center gap-1 mb-4">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
  <path
    d="M12 2C7.58 2 4 5.58 4 10C4 16 12 22 12 22C12 22 20 16 20 10C20 5.58 16.42 2 12 2Z"
    fill="#43A860"
  />
  <circle cx="12" cy="10" r="4" fill="white" />
</svg> <span
              className="text-[13px] text-[#43A860]"
              style={{ fontFamily: "Pretendard", fontWeight: 500, lineHeight: "1.2" }}
            >
              {spot.location}
            </span>
          </div>

          {/* 세부 정보 (층/창가/콘센트) */}
          <div
            className="text-[14px] text-[#7F7F7F] space-y-1 mb-3 mx-5.5"
            style={{ fontFamily: "Pretendard", fontWeight: 500, lineHeight: "1.2" }}
          >
            <p>층 : {spot.floor}</p>
            <p>창가 여부 : {spot.window ? "O" : "X"}</p>
            <p>콘센트 여부 : {spot.outlet ? "O" : "X"}</p>
          </div>

          {/* 남은 시간 (아이콘 22) */}
          <div className="flex items-center gap-2 mb-2">
            <Clock size={22} className="text-[#7F7F7F] flex-shrink-0" />
            <span
              className="w-[166px] text-[14px] text-orange-500"
              style={{ fontFamily: "Pretendard", fontWeight: 700, lineHeight: "1.2" }}
            >
              {spot.timeLeft}
            </span>
          </div>

          {/* 등록 일시 */}
          <div className="flex items-center gap-2 mb-6 mx-7.5">
            <span className="text-[14px] text-[#7F7F7F]">{spot.dateTime}</span>
          </div>

          {/* 대여 비용 (Rectangle 109: 그라데이션 배경) */}
          <div
            className="w-[352px] h-[68px] flex items-center justify-between px-4 -mx-2 mb-4"
            style={{ background: "linear-gradient(90deg, #FFFFFF 0%, #E4E4FF 100%)" }}
          >
            <span
              className="text-[15px] text-[#1A1A1A]"
              style={{ fontFamily: "Pretendard", fontWeight: 700 }}
            >
              대여 비용
            </span>
            <span
              className="text-[16px] text-[#1A1A1A]"
              style={{ fontFamily: "Pretendard", fontWeight: 700 }}
            >
              무료
            </span>
          </div>
        </div>
      </div>

     {/* 거래 안내 (Rectangle 75: 370x171, radius 40) */}
<div className="px-4 mb-6">
  <div className="w-[370px] min-h-[171px] bg-[#F0F0FF] rounded-[40px] px-5 py-5">
    <div className="flex items-center px-4 gap-4 mb-3">
      <svg 
  width="20" 
  height="23" 
  viewBox="0 0 20 23" 
  fill="none" 
  className="flex-shrink-0"
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
      <li className="w-[283px]">• 보증금은 물품 가격의 30-50% 정도를 권장합니다</li>
      <li className="w-[283px]">• 계좌 송금 또는 대면 직거래를 이용해주세요</li>
      <li className="w-[283px]">• 반납 시 물품 상태를 확인해주세요</li>
      <li className="w-[283px]">• 분실 또는 파손 시 보증금으로 처리됩니다</li>
    </ul>
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