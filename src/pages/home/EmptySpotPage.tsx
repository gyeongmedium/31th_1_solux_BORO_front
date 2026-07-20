import { Search, Zap, MapPin } from "lucide-react"
import BottomNav from "../../components/BottomNav"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function EmptySpotPage() {
  const navigate = useNavigate()

  // 빈자리 mock 데이터
  const [spotPosts] = useState([
    {
      id: 1,
      title: "스타벅스 숙대 정문점",
      timeLeft: "10분 후",
      floor: 1,
      window: true,
      outlet: false,
      location: "스타벅스 숙대 정문점",
      author: "카페인중독",
    },
    {
      id: 2,
      title: "숙명여자대학교 중앙도서관 4층 열람실",
      timeLeft: "30분 후",
      floor: 4,
      window: true,
      outlet: true,
      location: "중앙도서관 4층",
      author: "도서관지킴이",
    },
  ])

  return (
    <div className="flex flex-col bg-white pb-20">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 mt-3 pt-4 pb-3">
        <img src="/logo1.png" alt="BORO" className="h-8" />
        <button
          onClick={() => navigate("/post/create")}
          className="bg-[#9996FF] text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-1"
        >
          <span>+</span> 글 쓰기
        </button>
      </div>

      {/* 검색창 */}
      <div className="px-2 mt-1 mb-3 flex justify-center">
        <div className="bg-[#E6E6E6] rounded-[35.9px] w-full h-[36px] px-4 flex items-center gap-2">
          <Search className="text-[#7F7F7F]" size={18} />
          <input
            className="bg-transparent flex-1 text-sm outline-none"
            placeholder="검색어를 입력해주세요."
          />
        </div>
      </div>

      {/* 전체대여 / 빈자리 핫클립 탭 */}
      <div className="w-full mt-2.5 px-4 mb-6 flex justify-center">
        <div className="bg-[#E6E6E6] w-[359px] h-[44px] rounded-[40px] flex items-center justify-between p-[4px]">
          <button
            onClick={() => navigate("/")}
            className="w-[175px] h-[34px] text-sm font-semibold rounded-[40px] transition-colors text-[#7F7F7F]"
          >
            전체 대여
          </button>
          <button
            className="w-[175px] h-[34px] text-sm font-semibold rounded-[40px] transition-colors flex items-center justify-center gap-1 bg-[#9996FF] text-white shadow-sm"
          >
            <Zap size={16} /> 빈자리 핫클립
          </button>
        </div>
      </div>

      {/* 빈자리 핫클립 안내 문구 */}
      <div className="px-5 mb-4 flex items-center gap-1.5">
        <span>🔥</span>
        <span className="text-[13px] text-[#1A1A1A] font-medium">
          실시간으로 자리를 양도하는 게시글입니다
        </span>
      </div>

      {/* 빈자리 카드 목록 */}
      <div className="flex flex-col px-4 gap-4">
        {spotPosts.map((spot) => (
          <div
            key={spot.id}
            onClick={() => navigate(`/post/spot/${spot.id}`)}
            className="relative border-2 border-orange-500 rounded-3xl p-4 cursor-pointer"
          >
            {/* 시간 뱃지 */}
            <div className="absolute top-4 right-4 bg-orange-500 text-white text-[11px] font-bold px-3 py-1 rounded-full">
              {spot.timeLeft}
            </div>

            {/* 제목 (번개 아이콘 + 텍스트) */}
            <div className="flex items-center gap-2 mb-3 pr-16">
              <Zap size={18} className="text-orange-500 fill-orange-500 flex-shrink-0" />
              <span className="text-[15px] font-bold text-[#1A1A1A]">{spot.title}</span>
            </div>

            {/* 정보 */}
            <p className="text-[13px] text-[#4A4A4A] mb-3">
              {spot.floor}층 / {spot.window ? "창가 자리" : "복도 자리"} / 콘센트 {spot.outlet ? "있음" : "없음"}
            </p>

            {/* 위치 */}
            <div className="flex items-center gap-1 mb-4">
              <MapPin size={14} className="text-[#43A860]" />
              <span className="text-[13px] text-[#43A860] font-medium">{spot.location}</span>
            </div>

            {/* 작성자 */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-700 rounded-full flex-shrink-0" />
              <span className="text-[12px] text-[#000000]">{spot.author}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 네비게이션 */}
      <BottomNav />
    </div>
  )
}