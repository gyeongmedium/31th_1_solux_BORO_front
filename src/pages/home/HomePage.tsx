import { Search, Zap, ChevronDown, Heart, MapPin } from "lucide-react"
import BottomNav from "../../components/BottomNav"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"all" | "spot">("all")
  const [sortType, setSortType] = useState<"latest" | "popular">("latest")
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [showAvailableOnly, setShowAvailableOnly] = useState(true)

  const navigate = useNavigate()

  const toggleLike = (postId: number) => {
    const isLiked = likedPosts.includes(postId)

    setLikedPosts((prev) =>
      isLiked ? prev.filter((id) => id !== postId) : [...prev, postId]
    )

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, likes: isLiked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    )
  }

  //mockdata
  const [posts, setPosts] = useState([
    {
      id: 1,
      imageUrl: null,
      status: "대여가능",
      category: "과잠",
      title: "컴퓨터 공학과 과잠 대여하고 싶어요",
      description: "23학번 과잠 대여 가능하신 분 있나요?\n상세 옵션들을 하루만 빨리고 싶습니다!",
      likes: 2,
      author: "코딩왕",
      date: "2026. 4. 8",
      price: "5,000원 / 일",
    },
    {
      id: 2,
      imageUrl: null,
      status: "대여가능",
      category: "전공서적",
      title: "경영학원론 교재 빌리고 싶어요",
      description: "경영학원론 최신판 필요합니다.\n한 학기만 빌릴 수 있을까요?",
      likes: 6,
      author: "경영광",
      date: "2026. 4. 3",
      price: "20,000원 / 학기",
    },
    {
      id: 3,
      imageUrl: null,
      status: "대여중",
      category: "전자기기",
      title: "노트북 충전기 빌려주실 분",
      description: "C타입 충전기 급하게 필요합니다.\n하루만 빌려주세요!",
      likes: 4,
      author: "전자킹",
      date: "2026. 4. 5",
      price: "3,000원 / 일",
    },
    {
      id: 4,
      imageUrl: null,
      status: "대여가능",
      category: "생활용품",
      title: "미니 선풍기 대여합니다",
      description: "여름 한정 미니 선풍기 대여해요.\n상태 좋습니다!",
      likes: 8,
      author: "생활왕",
      date: "2026. 4. 1",
      price: "2,000원 / 일",
    },
    {
      id: 5,
      imageUrl: null,
      status: "대여완료",
      category: "기타",
      title: "우산 빌려드려요",
      description: "장우산 하나 있는데 필요하신 분 계신가요?\n비오는 날만 빌려드립니다.",
      likes: 3,
      author: "우산맨",
      date: "2026. 3. 28",
      price: "1,000원 / 일",
    },
  ])

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

  // 선택된 카테고리 + 대여가능 여부 + 정렬 기준에 맞게 처리
  const filteredPosts = posts
    .filter((post) => selectedCategory === "전체" || post.category === selectedCategory)
    .filter((post) => !showAvailableOnly || post.status === "대여가능")
    .sort((a, b) => {
      if (sortType === "popular") {
        return b.likes - a.likes
      }
      return new Date(b.date.replace(/\./g, "-")).getTime() - new Date(a.date.replace(/\./g, "-")).getTime()
    })

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
      <div className="w-full mt-2.5 px-4 mb-5 flex justify-center">
        <div className="bg-[#E6E6E6] w-full h-[44px] rounded-[40px] flex items-center justify-between p-[4px]">
          <button
            onClick={() => setActiveTab("all")}
            className={`w-[175px] h-[34px] text-sm font-semibold rounded-[40px] transition-colors ${
              activeTab === "all" ? "bg-[#9996FF] text-white shadow-sm" : "text-[#7F7F7F]"
            }`}
          >
            전체 대여
          </button>
          <button
            onClick={() => setActiveTab("spot")}
            className={`w-[175px] h-[34px] text-sm font-semibold rounded-[40px] transition-colors flex items-center justify-center gap-1 ${
              activeTab === "spot" ? "bg-[#9996FF] text-white shadow-sm" : "text-[#7F7F7F]"
            }`}
          >
            <Zap size={16} /> 빈자리 핫클립
          </button>
        </div>
      </div>

      {activeTab === "all" ? (
        <>
          {/* 카테고리 타이틀 */}
          <div className="px-4 mt-1 mb-0 flex items-center gap-2 h-[24px] w-full">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 h-[18px] w-[18px] -translate-y-0.5">
              <rect y="2" width="20" height="2" fill="#1A1A1A" />
              <rect y="6" width="20" height="2" fill="#1A1A1A" />
              <rect y="10" width="20" height="2" fill="#1A1A1A" />
              <rect y="14" width="20" height="2" fill="#1A1A1A" />
            </svg>
            <span className="text-[15px] text-[#1A1A1A] leading-none">카테고리</span>
          </div>

          {/* 카테고리 */}
          <div className="flex px-4 gap-2 overflow-x-auto overflow-y-hidden mb-6 pt-3 pb-4 w-full category-scroll">
            <button
              onClick={() => setSelectedCategory("전체")}
              className={`text-sm font-medium w-[75px] h-[36px] rounded-[40px] flex-shrink-0 transition-colors border ${
                selectedCategory === "전체"
                  ? "bg-[#9996FF] text-white font-semibold shadow-sm border-[#9996FF]"
                  : "bg-[#E6E6E6] text-[#000000] border-[#E6E6E6]"
              }`}
            >
              전체
            </button>

            {["과잠", "전공서적", "전자기기", "생활용품", "빈자리", "기타"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm font-medium w-[75px] h-[36px] rounded-[40px] flex-shrink-0 transition-colors border ${
                  selectedCategory === category
                    ? "bg-[#9996FF] text-white font-semibold shadow-sm border-[#9996FF]"
                    : "bg-[#E6E6E6] text-[#000000] border-[#E6E6E6]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 필터 & 정렬 */}
          <div className="flex items-center justify-between px-5 mb-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAvailableOnly(!showAvailableOnly)}
                className={`w-11 h-6 rounded-full relative transition-colors ${
                  showAvailableOnly ? "bg-[#9996FF]" : "bg-[#E6E6E6]"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                    showAvailableOnly ? "right-1" : "left-1"
                  }`}
                />
              </button>
              <span className="text-xs text-[#000000]">대여 가능한 항목만 보기</span>
            </div>
            <div className="flex items-center gap-2 relative">
              <span className="text-xs text-[#000000]">정렬</span>
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="bg-[#E6E6E6] rounded-[40px] w-[102px] h-[29px] flex items-center justify-center gap-1 text-xs font-semibold"
              >
                {sortType === "latest" ? "최신순" : "인기순"} <ChevronDown size={14} />
              </button>

              {showSortMenu && (
                <div className="absolute top-[34px] right-0 bg-[#E6E6E6] rounded-2xl shadow-md overflow-hidden z-10 w-[102px]">
                  <button
                    onClick={() => {
                      setSortType("latest")
                      setShowSortMenu(false)
                    }}
                    className={`w-full py-2 text-xs text-center transition-colors ${
                      sortType === "latest" ? "bg-[#E6E6E6] text-black !font-extrabold" : "text-[#000000]"
                    }`}
                  >
                    최신순
                  </button>
                  <button
                    onClick={() => {
                      setSortType("popular")
                      setShowSortMenu(false)
                    }}
                    className={`w-full py-2 text-xs text-center transition-colors ${
                      sortType === "popular" ? "bg-[#E6E6E6] text-black !font-extrabold" : "text-[#000000]"
                    }`}
                  >
                    인기순
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 게시글 카드 목록 */}
          <div className="flex flex-col px-4 py-4 gap-4">
            {filteredPosts.length === 0 ? (
              <p className="text-center text-sm text-[#7F7F7F] py-10">
                해당 카테고리의 게시글이 없어요
              </p>
            ) : (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => navigate(`/post/${post.id}`)}
                  className="border border-gray-200 rounded-3xl p-4 flex items-center gap-3 w-full h-[203px] bg-gradient-to-tl from-[#efeffe] via-white to-white cursor-pointer"
                >
                  {/* 왼쪽: 이미지 + 작성자 */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-23 h-23 bg-[#E6E6E6] rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src={post.imageUrl || "/logo3.png"}
                        alt={post.title}
                        className={post.imageUrl ? "w-full h-full object-cover" : "w-10 h-10 object-contain"}
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-10">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0"></div>
                      <span className="text-[12px] text-[#000000]">{post.author}</span>
                    </div>
                  </div>

                  {/* 오른쪽: 내용 */}
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-1.5">
                        <span
                          className={`text-[12px] px-2.5 py-1 rounded-full ${
                            post.status === "대여가능"
                              ? "bg-[#E9F5EE] text-black"
                              : post.status === "대여중"
                              ? "bg-[#FFF3CD] text-[#8A6D00]"
                              : "bg-[#FFE1E1] text-[#C93333]"
                          }`}
                        >
                          {post.status}
                        </span>
                        <span className="text-[12px] bg-[#E4E4FF] text-[#000000] px-2.5 py-1 rounded-full">{post.category}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(post.id)
                        }}
                        className="flex items-center gap-0.5"
                      >
                        <Heart
                          size={20}
                          className={likedPosts.includes(post.id) ? "fill-[#9996FF] text-[#9996FF]" : "text-[#9996FF]"}
                        />
                        <span className="text-xs text-[#000000]">{post.likes}</span>
                      </button>
                    </div>
                    <p className="text-sm font-bold mt-0.5">{post.title}</p>
                    <p className="text-[12px] text-[#000000] leading-tight whitespace-pre-line">
                      {post.description}
                    </p>
                    <p className="text-[12px] text-[#43A860] mt-3">대여 신청일: {post.date}</p>
                    <p className="text-sm font-bold mt-2 text-right">{post.price}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <>
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
                className="relative border-2 border-orange-400 rounded-3xl p-4 cursor-pointer"
              >
                {/* 시간 뱃지 */}
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {spot.timeLeft}
                </div>

                {/* 제목 */}
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={18} className="text-orange-500 fill-orange-500" />
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
        </>
      )}

      {/* 하단 네비게이션 */}
      <BottomNav />
    </div>
  )
}