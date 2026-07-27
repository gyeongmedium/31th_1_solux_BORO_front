import { ArrowLeft, Heart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function LikedPostsPage() {
  const navigate = useNavigate()

  // mock 데이터 (실제로는 좋아요한 게시물 API로 조회)
  const [likedPosts, setLikedPosts] = useState([
    {
      id: 1,
      imageUrl: null,
      status: "대여가능",
      category: "전공서적",
      title: "경영학원론 교재 빌리고 싶어요",
      description: "경영학원론 최신판 필요합니다.\n한 학기만 빌릴 수 있을까요?!",
      likes: 6,
      author: "경영광",
      date: "2026. 4. 3",
      price: "20,000원 / 80일",
    },
    {
      id: 2,
      imageUrl: null,
      status: "대여가능",
      category: "실험복",
      title: "경영학원론 교재 빌리고 싶어요",
      description: "실험 수업이 있어 일주일만 빌립니다",
      likes: 3,
      author: "생시전공",
      date: "2026. 4. 3",
      price: "3,000원 / 7일",
    },
    {
      id: 3,
      imageUrl: null,
      status: "대여가능",
      category: "빈자리",
      title: "숙명여자대학교 중앙도서관 4층",
      description: "4층 / 창가 자리 X / 콘센트 있음",
      likes: 6,
      author: "경영짱",
      date: "2026. 4. 3",
      price: "빈자리 양도",
    },
    {
      id: 4,
      imageUrl: null,
      status: "대여가능",
      category: "빈자리",
      title: "숙명여자대학교 중앙도서관 4층",
      description: "4층 / 창가 자리 X / 콘센트 있음",
      likes: 6,
      author: "경영짱",
      date: "2026. 4. 3",
      price: "빈자리 양도",
    },
    {
      id: 5,
      imageUrl: null,
      status: "대여가능",
      category: "빈자리",
      title: "숙명여자대학교 중앙도서관 4층",
      description: "4층 / 창가 자리 X / 콘센트 있음",
      likes: 6,
      author: "경영짱",
      date: "2026. 4. 3",
      price: "빈자리 양도",
    },
    {
      id: 6,
      imageUrl: null,
      status: "대여가능",
      category: "빈자리",
      title: "숙명여자대학교 중앙도서관 4층",
      description: "4층 / 창가 자리 X / 콘센트 있음",
      likes: 6,
      author: "경영짱",
      date: "2026. 4. 3",
      price: "빈자리 양도",
    },
  ])

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => prev.filter((post) => post.id !== postId))
  }

  return (
    /* 1. 최상단 부모: 고정된 #root 크기를 벗어나는 레이아웃 완전 차단 */
    <div className="w-full h-full relative bg-white flex flex-col overflow-hidden">
      
      {/* 2. 스크롤 컨테이너: 세로 스크롤만 활성화하며 가로 튕김 방지 */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden vertical-scroll">
        
        {/* 3. 콘텐츠 래퍼: 가로 폭을 정확히 w-[402px]로 고정하여 스크롤바가 생겨도 내부 컴포넌트 크기 유지 */}
        <div className="w-[402px] flex flex-col bg-white pb-6">
          
          {/* 헤더 */}
          <div className="flex items-center gap-3 px-4 pt-5 pb-4">
            <button onClick={() => navigate(-1)} className="flex items-center justify-center">
              <ArrowLeft size={22} className="text-[#1A1A1A]" />
            </button>
            <span className="text-[17px] font-bold text-[#1A1A1A]">좋아요한 게시물</span>
          </div>

          {/* 게시글 카드 목록 */}
          <div className="flex flex-col px-4 gap-4 w-full">
            {likedPosts.length === 0 ? (
              <p className="text-center text-sm text-[#7F7F7F] py-10">
                좋아요한 게시물이 없어요
              </p>
            ) : (
              likedPosts.map((post) => (
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
                        <span className="text-[12px] bg-[#E9F5EE] text-black px-2.5 py-1 rounded-full">
                          {post.status}
                        </span>
                        <span className="text-[12px] bg-[#E4E4FF] text-[#000000] px-2.5 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(post.id)
                        }}
                        className="flex items-center gap-0.5"
                      >
                        <Heart size={20} className="fill-[#9996FF] text-[#9996FF]" />
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

        </div>
      </div>
    </div>
  )
}