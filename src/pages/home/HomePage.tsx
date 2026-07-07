import { Search, Zap, AlignJustify } from "lucide-react"
import BottomNav from "../../components/BottomNav"
import { useState, useRef } from "react"

export default function HomePage() {
  const categoryScrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollWidth, setScrollWidth] = useState(40)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // 카테고리 실제 스크롤 → 인디케이터 위치 업데이트
  const handleCategoryScroll = () => {
    const el = categoryScrollRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    if (maxScroll <= 0) return
    const percent = (el.scrollLeft / maxScroll) * (100 - scrollWidth)
    setScrollPosition(percent)
  }

  // 카테고리 영역 빈 공간 드래그
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = categoryScrollRef.current
    if (!el) return
    setIsDragging(true)
    setStartX(e.pageX - el.offsetLeft)
    setScrollLeft(el.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const el = categoryScrollRef.current
    if (!el) return
    const x = e.pageX - el.offsetLeft
    const walk = x - startX
    el.scrollLeft = scrollLeft - walk
    handleCategoryScroll()
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // 스크롤바 막대 자체 드래그
  const handleBarMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    const el = categoryScrollRef.current
    if (!el) return
    setIsDragging(true)
    setStartX(e.pageX)
    setScrollLeft(el.scrollLeft)
  }

  const handleBarMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const el = categoryScrollRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    const trackWidth = el.clientWidth * (1 - scrollWidth / 100)
    if (trackWidth <= 0) return
    const walk = (e.pageX - startX) * (maxScroll / trackWidth)
    el.scrollLeft = scrollLeft + walk
    handleCategoryScroll()
  }

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto pb-20">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <img src="/logo1.png" alt="BORO" className="h-8" />
        <button className="bg-[#9996FF] text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-1">
          <span>+</span> 글 쓰기
        </button>
      </div>

      {/* 검색창 */}
      <div className="px-5 mb-3">
        <div className="bg-[#E6E6E6] rounded-[35.9px] w-[370px] h-[36px] px-4 flex items-center gap-2">
          <Search className="text-[#7F7F7F]" size={18} />
          <input
            className="bg-transparent flex-1 text-sm outline-none"
            placeholder="검색어를 입력해주세요."
          />
        </div>
      </div>

      {/* 전체대여 / 빈자리 핫클립 탭 */}
      <div className="relative bg-[#E6E6E6] rounded-[40px] w-[359px] h-[44px] mx-auto mb-4 flex items-center px-1">
        <button className="absolute left-[8px] bg-[#9996FF] text-white text-sm font-semibold rounded-[40px] w-[175px] h-[34px]">
          전체 대여
        </button>
        <button className="absolute right-[8px] text-[#7F7F7F] text-sm font-semibold w-[175px] h-[34px] flex items-center justify-center gap-1">
          <Zap size={16} /> 빈자리 핫클립
        </button>
      </div>

      {/* 카테고리 타이틀 */}
      <div className="px-3 mb-2 flex items-center gap-2">
        <svg width="20" height="14" viewBox="0 0 18 18" fill="none">
          <rect y="1" width="18" height="2" fill="#1A1A1A" />
          <rect y="6" width="18" height="2" fill="#1A1A1A" />
          <rect y="11" width="18" height="2" fill="#1A1A1A" />
          <rect y="16" width="18" height="2" fill="#1A1A1A" />
        </svg>
        <span className="text-sm font-normal">카테고리</span>
      </div>

      {/* 카테고리 */}
      <div
        ref={categoryScrollRef}
        onScroll={handleCategoryScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="flex px-5 gap-2 overflow-x-auto mb-1 pb-1 scrollbar-hide"
      >
        <button className="bg-[#9996FF] text-white text-sm font-semibold w-[75px] h-[36px] rounded-[40px] flex-shrink-0">
          전체
        </button>
        {["과목", "전공서적", "전자기기", "생활용품", "빈자리", "기타"].map((category) => (
          <button
            key={category}
            className="text-black text-sm bg-[#E6E6E6] w-[75px] h-[36px] rounded-[40px] flex-shrink-0"
          >
            {category}
          </button>
        ))}
      </div>

      {/* 스크롤 인디케이터 */}
      <div
        className="mx-5 mb-4 h-3.5 bg-[#E6E6E6] rounded-full flex items-center px-0.5"
        onMouseMove={handleBarMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          onMouseDown={handleBarMouseDown}
          className="h-2 bg-[#B3B3B3] rounded-full transition-all"
          style={{ width: `${scrollWidth}%`, marginLeft: `${scrollPosition}%` }}
        />
      </div>

      {/* 필터 & 정렬 */}
      <div className="flex items-center justify-between px-5 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-4 bg-[#9996FF] rounded-full relative">
            <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
          </div>
          <span className="text-xs text-[#E6E6E6]">대여 가능한 항목만 보기</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-[#E6E6E6]">정렬</span>
          <span className="text-xs font-semibold">최신순 ▾</span>
        </div>
      </div>

      {/* 게시글 카드 목록 */}
      <div className="flex flex-col px-5 gap-3">
        {/* 카드 1 */}
        <div className="border border-gray-200 rounded-2xl p-3 flex gap-3">
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
            <span className="text-3xl">🎒</span>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <div className="flex justify-between items-start">
              <div className="flex gap-1">
                <span className="text-[10px] bg-[#9996FF] text-white px-2 py-0.5 rounded-full">대여가능</span>
                <span className="text-[10px] bg-gray-100 text-[#E6E6E6] px-2 py-0.5 rounded-full">과목</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[#9996FF]">♡</span>
                <span className="text-xs text-[#E6E6E6]">2</span>
              </div>
            </div>
            <p className="text-sm font-bold">컴퓨터 공학과 과목 대여하고 싶어요</p>
            <p className="text-[11px] text-[#E6E6E6] leading-tight">
              23학번 과목 대여 가능하신 분 있나요?<br />
              상세 옵션들을 하루만 빨리고 싶습니다!
            </p>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <span className="text-[10px] text-[#E6E6E6]">코딩왕</span>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-[#9996FF]">대여 신청일: 2026. 4. 8</p>
                <p className="text-sm font-bold">5,000원 / 일</p>
              </div>
            </div>
          </div>
        </div>

        {/* 카드 2 */}
        <div className="border border-gray-200 rounded-2xl p-3 flex gap-3">
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
            <span className="text-3xl">📚</span>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <div className="flex justify-between items-start">
              <div className="flex gap-1">
                <span className="text-[10px] bg-[#9996FF] text-white px-2 py-0.5 rounded-full">대여가능</span>
                <span className="text-[10px] bg-gray-100 text-[#E6E6E6] px-2 py-0.5 rounded-full">전공서적</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[#9996FF]">♡</span>
                <span className="text-xs text-[#E6E6E6]">6</span>
              </div>
            </div>
            <p className="text-sm font-bold">경영학원론 교재 빌리고 싶어요</p>
            <p className="text-[11px] text-[#E6E6E6] leading-tight">
              경영학원론 최신판 필요합니다.<br />
              한 학기만 빌릴 수 있을까요?
            </p>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <span className="text-[10px] text-[#E6E6E6]">경영광</span>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-[#9996FF]">대여 신청일: 2026. 4. 3</p>
                <p className="text-sm font-bold">20,000원 / 학기</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <BottomNav />
    </div>
  )
}