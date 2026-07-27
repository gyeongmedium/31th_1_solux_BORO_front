import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function MyPostsPage() {
  const navigate = useNavigate()

  // mock 데이터 (실제로는 내가 올린 게시글 + 빈자리 API로 조회, 시간순 정렬)
  const [myPosts] = useState([
    {
      id: 1,
      postType: "post" as const,
      status: "대여가능",
      category: "전공서적",
      title: "미분적분학 교재 빌리고 싶어요.",
      description: "스튜어트 8판 입니다.\n한 학기 대여 희망합니다.",
      wishDate: "2026. 4. 8",
      price: "10,000원 / 학기",
    },
    {
      id: 2,
      postType: "spot" as const,
      status: "대여가능",
      category: "빈자리",
      title: "중앙도서관 4층 열람실",
      description: "4층 / 창가 자리 / 콘센트 있음",
      wishDate: "2026. 4. 10",
      price: "무료",
    },
  
  {
      id: 3,
      postType: "spot" as const,
      status: "대여가능",
      category: "빈자리",
      title: "중앙도서관 4층 열람실",
      description: "4층 / 창가 자리 / 콘센트 있음",
      wishDate: "2026. 4. 10",
      price: "무료",
    },
    ,
  
  {
      id: 4,
      postType: "spot" as const,
      status: "대여가능",
      category: "빈자리",
      title: "중앙도서관 4층 열람실",
      description: "4층 / 창가 자리 / 콘센트 있음",
      wishDate: "2026. 4. 10",
      price: "무료",
    }
    ])

  return (
    <div className="w-full h-full relative bg-white flex flex-col overflow-hidden">
    <div className="flex-1 overflow-y-auto overflow-x-hidden vertical-scroll">
      <div className="w-[402px] flex flex-col bg-white pb-10">
    {/* 상단 고정 헤더 (402x80, 스크롤해도 고정) */}
  <div
    className="sticky top-0 bg-white z-30 w-full"
    style={{ height: "70px" }}
  >
    <button onClick={() => navigate(-1)} style={{ position: "absolute", top: "35px", left: "30px" }}>
      <ArrowLeft size={20} strokeWidth={2} className="text-black" />
    </button>
    <span
      style={{
      position: "absolute",
      top: "35px",
      left: "60px",
      fontFamily: "Pretendard",
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: "1.2",
      color: "#1A1A1A",
    }}
  >
    내가 작성한 게시글
  </span>
</div>

{/* 게시글 목록 */}
<div className="flex flex-col gap-4 pt-4">
  {myPosts.length === 0 ? (
    <p className="text-center text-sm text-[#7F7F7F] py-10">
      등록한 대여글이 없어요
    </p>
  ) : (
    myPosts.map((post) => (
      <div
        key={post.id}
        className="relative mx-auto"
        style={{
          width: "370px",
          height: "194px",
          borderRadius: "40px",
          border: "1px solid #CCCCCC",
        }}
      >
        {/* 대여가능 뱃지 */}
        <span
          className="absolute flex items-center justify-center whitespace-nowrap px-3"
          style={{
            height: "29px",
            top: "26px",
            left: "38px",
            borderRadius: "40px",
            backgroundColor: "#E9F5EE",
            fontFamily: "Pretendard",
            fontWeight: 400,
            fontSize: "12px",
            color: "#1A1A1A",
          }}
        >
          {post.status}
        </span>

        {/* 카테고리 뱃지 */}
        <span
          className="absolute flex items-center justify-center whitespace-nowrap px-3"
          style={{
            height: "29px",
            top: "26px",
            left: "109px",
            borderRadius: "40px",
            backgroundColor: "#E4E4FF",
            fontFamily: "Pretendard",
            fontWeight: 400,
            fontSize: "12px",
            color: "#1A1A1A",
          }}
        >
          {post.category}
        </span>

        {/* 가격 */}
        <p
          className="absolute text-right whitespace-nowrap"
          style={{
            top: "28px",
            right: "42px",
            fontFamily: "Pretendard",
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "1.2",
            color: "#1A1A1A",
          }}
        >
          {post.price}
        </p>

        {/* 제목 */}
        <p
          className="absolute overflow-hidden text-ellipsis whitespace-nowrap"
          style={{
            width: "226px",
            top: "68px",
            left: "44px",
            fontFamily: "Pretendard",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "1.2",
            color: "#1A1A1A",
          }}
        >
          {post.title}
        </p>

        {/* 설명 */}
        <p
          className="absolute whitespace-pre-line overflow-hidden"
          style={{
            width: "184px",
            height: "34px",
            top: "97px",
            left: "44px",
            fontFamily: "Pretendard",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "1.4",
            color: "#4A4A4A",
          }}
        >
          {post.description}
        </p>

        {/* 대여 신청일 */}
        <p
          className="absolute"
          style={{
            width: "166px",
            top: "145px",
            left: "44px",
            fontFamily: "Pretendard",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "1.2",
            color: "#7F7F7F",
          }}
        >
          {post.postType === "post" ? "대여 신청일" : "대여 제공일"} : {post.wishDate}
        </p>

        {/* 수정 버튼 */}
        <button
          onClick={() =>
            post.postType === "post"
              ? navigate(`/post/edit/${post.id}`)
              : navigate(`/spot/edit/${post.id}`)
          }
          className="absolute flex items-center justify-center text-white"
          style={{
            width: "68px",
            height: "34px",
            top: "135px",
            left: "271px",
            borderRadius: "40px",
            backgroundColor: "#9996FF",
            fontFamily: "Pretendard",
            fontWeight: 600,
            fontSize: "13px",
          }}
        >
          수정
        </button>
      </div>
    ))
  )}
</div>
    </div>
     </div>
  </div>
  )
}