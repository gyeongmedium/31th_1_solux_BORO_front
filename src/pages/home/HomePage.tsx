import { Search, Zap, ChevronDown, Heart, MapPin } from "lucide-react"
import BottomNav from "../../components/BottomNav"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getPosts, likePost } from "../../api/post"
import { categoryLabel, statusLabel, priceUnitLabel } from "../../utils/postMapper"
import type { PostSummary, PostCategory } from "../../types/post"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"all" | "spot">("all")
  const [sortType, setSortType] = useState<"latest" | "popular">("latest")
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | "전체">("전체")
  const [showAvailableOnly, setShowAvailableOnly] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState("")

  const [posts, setPosts] = useState<PostSummary[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  // 게시글 목록 불러오기(API 연동)
  /*useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      try {
        const res = await getPosts(showAvailableOnly)
        setPosts(res.data.result)
      } catch (err) {
        console.error("게시글 목록 조회 실패:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [showAvailableOnly])*/

  useEffect(() => {
  // 임시 테스트용 mock 데이터
  setPosts([
    {
      postId: 1,
      status: "ACTIVE",
      imageUrlList: [],
      category: "DEPARTMENT_JACKET",
      title: "컴퓨터 공학과 과잠 대여하고 싶어요",
      description: "23학번 과잠 대여 가능하신 분 있나요? 은걸로 하루만 빌리고 싶습니다! 금방 돌려드릴게요 정말 너무너무 급해요!!!!!!!!!!!!!!",
      rentalStartTime: "2026-04-08",
      rentalEndTime: "2026-04-09",
      rentalPrice: 5000,
      rentalPriceUnit: "HOUR",
      authorNickname: "코딩왕",
      likeCount: 2,
      liked: false,
    },
    {
      postId: 2,
      status: "ACTIVE",
      imageUrlList: [],
      category: "LIVING_SUPPLIES",
      title: "미니 선풍기 대여합니다",
      description: "여름 한정 미니 선풍기 대여해요",
      rentalStartTime: "2026-04-01",
      rentalEndTime: "2026-04-02",
      rentalPrice: 2000,
      rentalPriceUnit: "DAY",
      authorNickname: "생활왕",
      likeCount: 8,
      liked: false,
    },
    {
      postId: 3,
      status: "ACTIVE",
      imageUrlList: [],
      category: "LIVING_SUPPLIES",
      title: "미니 선풍기 대여합니다",
      description: "여름 한정 미니 선풍기 대여해요",
      rentalStartTime: "2026-04-01",
      rentalEndTime: "2026-04-02",
      rentalPrice: 2000,
      rentalPriceUnit: "DAY",
      authorNickname: "생활왕",
      likeCount: 8,
      liked: false,
    }
  ])
}, [])

  // 좋아요 토글
  const toggleLike = async (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.postId === postId
          ? {
              ...post,
              liked: !post.liked,
              likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1,
            }
          : post
      )
    )

    try {
      await likePost(postId)
    } catch (err) {
      console.error("좋아요 처리 실패:", err)
      setPosts((prev) =>
        prev.map((post) =>
          post.postId === postId
            ? {
                ...post,
                liked: !post.liked,
                likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1,
              }
            : post
        )
      )
    }
  }

  // 빈자리 mock 데이터 (아직 API 미연동)
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

  // 빈자리 검색 필터링
const filteredSpotPosts = spotPosts.filter((spot) => {
  if (searchKeyword.trim() === "") return true
  const keyword = searchKeyword.toLowerCase()
  return (
    spot.title.toLowerCase().includes(keyword) ||
    spot.location.toLowerCase().includes(keyword)
  )
})

  // 선택된 카테고리 + 검색어 + 정렬 기준에 맞게 처리
  const filteredPosts = posts
    .filter((post) => selectedCategory === "전체" || post.category === selectedCategory)
    .filter((post) => {
      if (searchKeyword.trim() === "") return true
      const keyword = searchKeyword.toLowerCase()
      return (
        post.title.toLowerCase().includes(keyword) ||
        post.description.toLowerCase().includes(keyword)
      )
    })
    .sort((a, b) => {
      if (sortType === "popular") {
        return b.likeCount - a.likeCount
      }
      return new Date(b.rentalStartTime).getTime() - new Date(a.rentalStartTime).getTime()
    })

  const categoryList: PostCategory[] = [
    "DEPARTMENT_JACKET",
    "MAJOR_BOOKS",
    "ELECTRONICS",
    "LIVING_SUPPLIES",
    "EMPTY_SPOTS",
    "ETC",
  ]

  return (
    <div className="w-full min-h-full bg-white flex flex-col justify-between vertical-scroll">
  <div className="w-full flex flex-col bg-white pb-10">

    {/* 헤더: 로고 (116x29) + 글쓰기 버튼*/}
    <div className="flex items-center justify-between px-[22px] pt-[30px] pb-4">
            <img src="/logo1.png" alt="BORO" style={{ width: "116.09px", height: "29px" }} />
            <button
              onClick={() => navigate("/post/create")}
              className="bg-[#9996FF] text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-1"
            >
              <span
  style={{
    fontFamily: "Pretendard",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "1.7",
    linwidth: "2px",
  }}
>
  + 글 쓰기
</span>
            </button>
          </div>

          {/* 검색창 (370x36, radius 35.9) */}
          <div className="px-4 mb-4 flex justify-center">
            <div
              className="flex items-center gap-2 px-[20px]"
              style={{
                width: "370px",
                height: "36px",
                borderRadius: "35.9px",
                backgroundColor: "#E6E6E6",
              }}
            >
              <Search className="text-[#7F7F7F] flex-shrink-0" size={13} />
              <input
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="bg-transparent flex-1 outline-none"
                style={{
                  fontFamily: "Pretendard",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "1.2",
                  color: "#1A1A1A",
                }}
                placeholder="검색어를 입력해주세요."
              />
            </div>
          </div>

          {/* 전체대여 / 빈자리 핫클립 탭 (359x44, radius 40) */}
          <div className="mb-5 flex justify-center">
            <div
              className="relative flex items-center"
              style={{
                width: "359px",
                height: "44px",
                borderRadius: "40px",
                backgroundColor: "#E6E6E6",
              }}
            >
              <button
                onClick={() => setActiveTab("all")}
                className="absolute flex items-center justify-center text-sm font-semibold transition-colors"
                style={{
                  width: "175px",
                  height: "34px",
                  top: "5px",
                  left: "10px",
                  borderRadius: "40px",
                  backgroundColor: activeTab === "all" ? "#9996FF" : "transparent",
                  color: activeTab === "all" ? "#FFFFFF" : "#7F7F7F",
                  fontFamily: "Pretendard",
                  fontWeight: 400,
                }}
              >
                전체 대여
              </button>
              <button
                onClick={() => setActiveTab("spot")}
                className="absolute flex items-center justify-center gap-1 text-sm font-semibold transition-colors"
                style={{
                  width: "175px",
                  height: "34px",
                  top: "5px",
                  right: "10px",
                  borderRadius: "40px",
                  backgroundColor: activeTab === "spot" ? "#9996FF" : "transparent",
                  color: activeTab === "spot" ? "#FFFFFF" : "#7F7F7F",
                  fontFamily: "Pretendard",
                  fontWeight: 400,
                }}
              >
                <Zap size={15} 
                fill={activeTab === "spot" ? "#FFFFFF" : "none"}/> 빈자리 핫클립
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
              <div className="flex px-4 gap-2 overflow-x-auto overflow-y-hidden mb-4 pt-3 pb-4 w-full category-scroll">
                <button
                  onClick={() => setSelectedCategory("전체")}
                  className={`text-sm font-medium w-[75px] h-[36px] rounded-[40px] flex-shrink-0 transition-colors border ${
                    selectedCategory === "전체"
                      ? "bg-[#9996FF] text-white font-semibold shadow-sm border-[#9996FF]"
                      : "bg-[#E6E6E6] text-[#000000] border-[#E6E6E6]"
                  }`}
                  style={{ fontFamily: "Pretendard", fontWeight: 400, fontSize: "14px" }}
                >
                  전체
                </button>

                {categoryList.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-sm font-medium w-[75px] h-[36px] rounded-[40px] flex-shrink-0 transition-colors border ${
                      selectedCategory === category
                        ? "bg-[#9996FF] text-white font-semibold shadow-sm border-[#9996FF]"
                        : "bg-[#E6E6E6] text-[#000000] border-[#E6E6E6]"
                    }`}
                    style={{ fontFamily: "Pretendard", fontWeight: 400, fontSize: "14px" }}
                  >
                    {categoryLabel[category]}
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
              <div className="flex flex-col px-4 py-2 gap-4">
                {isLoading ? (
                  <p className="text-center text-sm text-[#7F7F7F] py-10">불러오는 중...</p>
                ) : filteredPosts.length === 0 ? (
                  <p className="text-center text-sm text-[#7F7F7F] py-10">
                    해당 조건의 게시글이 없어요
                  </p>
                ) : (
                  filteredPosts.map((post) => (
                    <div
                      key={post.postId}
                      onClick={() => navigate(`/post/${post.postId}`)}
                      className="relative mx-auto cursor-pointer"
                      style={{
                        width: "370px",
                        height: "203px",
                        borderRadius: "40px",
                        border: "1px solid #CCCCCC",
                        background: "linear-gradient(90deg, #FFFFFF 51.91%, #E4E4FF 114.12%)",
                      }}
                    >
                      {/* 물건 사진 (90x90, radius 20, top 23 left 18) */}
                      <div
                        className="absolute bg-[#E6E6E6] overflow-hidden flex items-center justify-center"
                        style={{ width: "90px", height: "90px", top: "23px", left: "18px", borderRadius: "20px" }}
                      >
                        <img
                          src={post.imageUrlList[0] || "/logo3.png"}
                          alt={post.title}
                          className={post.imageUrlList[0] ? "w-full h-full object-cover" : "w-10 h-10 object-contain"}
                        />
                      </div>

                      {/* 대여가능 뱃지 (62x30, top 23 left 116) */}
                      <div
                        className={`absolute flex items-center justify-center text-[12px] ${
                          post.status === "ACTIVE"
                            ? "bg-[#E9F5EE] text-black"
                            : post.status === "RENTED"
                            ? "bg-[#FFF3CD] text-[#8A6D00]"
                            : "bg-[#FFE1E1] text-[#C93333]"
                        }`}
                        style={{ width: "65px", height: "30px", top: "23px", left: "116px", borderRadius: "40px" }}
                      >
                        {statusLabel[post.status]}
                      </div>

                      {/* 카테고리 뱃지 (내용에 따라 너비 자동) */}
<div
  className="absolute flex items-center justify-center text-[12px] bg-[#E4E4FF] text-[#000000] px-2.5 whitespace-nowrap"
  style={{ height: "30px", top: "23px", left: "186px", borderRadius: "40px" }}
>
  {categoryLabel[post.category]}
</div>

                      {/* 좋아요 버튼 (우측 상단 배치) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(post.postId)
                        }}
                        className="absolute flex items-center gap-0.5"
                        style={{ top: "23px", right: "20px" }}
                      >
                        <Heart size={20} className={post.liked ? "fill-[#9996FF] text-[#9996FF]" : "text-[#9996FF]"} />
                        <span className="text-xs text-[#000000]">{post.likeCount}</span>
                      </button>

                      {/* 제목 (226x18, top 61 left 121, font14 bold) */}
                      <p
                        className="absolute overflow-hidden text-ellipsis whitespace-nowrap"
                        style={{
                          width: "226px",
                          height: "18px",
                          top: "61px",
                          left: "121px",
                          fontFamily: "Pretendard",
                          fontWeight: 700,
                          fontSize: "14px",
                          lineHeight: "1.2",
                          color: "#1A1A1A",
                        }}
                      >
                        {post.title}
                      </p>

                      {/* 설명 (193x34, top 84 left 122, font12 regular) */}
                      <p
                        className="absolute whitespace-pre-line overflow-hidden"
                        style={{
                          width: "193px",
                          height: "34px",
                          top: "84px",
                          left: "122px",
                          fontFamily: "Pretendard",
                          fontWeight: 400,
                          fontSize: "12px",
                          lineHeight: "1.4",
                          color: "#000000",
                        }}
                      >
                        {post.description}
                      </p>

                      {/* 대여 신청일 (하단 고정) */}
<p
  className="absolute"
  style={{
    width: "200px",
    left: "122px",
    bottom: "55px",
    fontFamily: "Pretendard",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "1.2",
    color: "#43A860",
  }}
>
  대여 신청일 : {post.rentalStartTime}
</p>

                      {/* 사용자 사진 (25x25, radius 15, top 154 left 26) */}
                      <div
                        className="absolute bg-gray-300"
                        style={{ width: "25px", height: "25px", top: "154px", left: "26px", borderRadius: "15px" }}
                      />

                      {/* 사용자 이름 (32x14, top 160 left 62, font12 regular) */}
                      <p
                        className="absolute overflow-hidden text-ellipsis whitespace-nowrap"
                        style={{
                          width: "40px",
                          height: "14px",
                          top: "160px",
                          left: "62px",
                          fontFamily: "Pretendard",
                          fontWeight: 400,
                          fontSize: "12px",
                          lineHeight: "1.2",
                          color: "#000000",
                        }}
                      >
                        {post.authorNickname}
                      </p>

                      {/* 가격 (97x17, top 158 left 244, font14 bold, text-right) */}
                      <p
                        className="absolute text-right"
                        style={{
                          width: "97px",
                          height: "17px",
                          top: "158px",
                          left: "244px",
                          fontFamily: "Pretendard",
                          fontWeight: 700,
                          fontSize: "14px",
                          lineHeight: "1.2",
                          color: "#1A1A1A",
                        }}
                      >
                        {post.rentalPrice.toLocaleString()}원 / {priceUnitLabel[post.rentalPriceUnit]}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
  <>
  {/* 빈자리 핫클립 안내 문구 */}
<div className="px-3 -my-1 mb-3 flex items-center gap-0.5">
  <img src="/fire-icon.png" alt="불꽃" className="w-[25px] h-[30px]" />
  <span className="text-[13px] text-[#7F7F7F] font-medium">
    실시간으로 자리를 양도하는 게시글입니다
  </span>
</div>

    {/* 빈자리 카드 목록 */}
    <div className="flex flex-col px-4 gap-4">
      {filteredSpotPosts.length === 0 ? (
  <p className="text-center text-sm text-[#7F7F7F] py-10">
    해당 조건의 게시글이 없어요
  </p>
) : (
  filteredSpotPosts.map((spot) => (
    <div
  key={spot.id}
  onClick={() => navigate(`/post/spot/${spot.id}`)}
  className="relative mx-auto cursor-pointer"
  style={{
    width: "370px",
    minHeight: "191px",
    borderRadius: "40px",
    border: "2px solid #FF5E00",
    paddingTop: "30px",
    paddingLeft: "30px",
    paddingRight: "18px",
    paddingBottom: "18px",
  }}
>
      {/* 시간 뱃지 (80x25, radius 7) */}
      <div
        className="absolute flex items-center justify-center whitespace-nowrap"
        style={{
          width: "80px",
          height: "24px",
          top: "0px",
          right: "25px",
          borderRadius: "7px",
          backgroundColor: "#FF5E00",
        }}
      >
        <span
          style={{
            fontFamily: "Pretendard",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "1.2",
            color: "#FFFFFF",
          }}
        >
          {spot.timeLeft}
        </span>
      </div>

      {/* 번개 아이콘 + 제목 (22x24 아이콘, 226x18 제목 font14 bold) */}
      <div className="flex items-start gap-3 mb-3" style={{ paddingRight: "0px" }}>
        <Zap size={22} style={{ color: "#FF5E00", fill: "#FF5E00", flexShrink: 0 }} />
        <p
          style={{
            fontFamily: "Pretendard",
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "1.2",
            color: "#1A1A1A",
          }}
        >
          {spot.title}
        </p>
      </div>

      {/* 설명 (226x34, font12 regular) */}
      <p
        className="mb-4"
        style={{
          marginLeft: "34px",
          fontFamily: "Pretendard",
          fontWeight: 500,
          fontSize: "12px",
          lineHeight: "1.4",
          color: "#4A4A4A",
        }}
      >
        {spot.floor}층 / {spot.window ? "창가 자리" : "복도 자리"} / 콘센트 {spot.outlet ? "있음" : "없음"}
      </p>

      {/* 위치 (아이콘 12x15, 텍스트 font12 semibold) */}
      <div className="flex items-center gap-1 mb-6" style={{ marginLeft: "34px" }}>
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
  <path
    d="M12 2C7.58 2 4 5.58 4 10C4 16 12 22 12 22C12 22 20 16 20 10C20 5.58 16.42 2 12 2Z"
    fill="#43A860"
  />
  <circle cx="12" cy="10" r="4" fill="white" />
</svg>
<span
          style={{
            fontFamily: "Pretendard",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "1.2",
            color: "#43A860",
          }}
        >
          {spot.location}
        </span>
      </div>

      {/* 작성자 (원 25x25, 이름 font12 regular) */}
      <div className="flex items-center gap-2">
        <div
          className="bg-gray-700 flex-shrink-0"
          style={{ width: "25px", height: "25px", borderRadius: "15px" }}
        />
        <span
          style={{
            fontFamily: "Pretendard",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "1.2",
            color: "#000000",
          }}
        >
          {spot.author}
        </span>
      </div>
    </div>
  ))
)}
    </div>
  </>
)}
    
      </div>

      <BottomNav />
    </div>
  )
}