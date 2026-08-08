import { ArrowLeft, Heart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getLikedPosts } from "../../api/member"
import { likePost } from "../../api/post"
import { categoryLabel, priceUnitLabel } from "../../utils/postMapper"
import type { LikedPostItem } from "../../types/likedPosts"
import type { PostCategory, RentalPriceUnit } from "../../types/post"

export default function LikedPostsPage() {
  const navigate = useNavigate()

  const [likedPosts, setLikedPosts] = useState<LikedPostItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLikedPosts = async () => {
      setIsLoading(true)
      try {
        const res = await getLikedPosts()
        setLikedPosts(res.data.result)
      } catch (err) {
        console.error("좋아요한 게시물 조회 실패:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchLikedPosts()
  }, [])

  return (
    <div className="w-full h-full relative bg-white flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto overflow-x-hidden vertical-scroll">
        <div className="w-[402px] flex flex-col bg-white pb-10">
          {/* 헤더 */}
          <div className="flex items-center gap-3 px-4 pt-8 pb-4">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft size={22} className="text-[#1A1A1A]" />
            </button>
            <span className="text-[17px] font-bold text-[#1A1A1A]">좋아요한 게시물</span>
          </div>

          {/* 게시글 카드 목록 */}
          <div className="flex flex-col px-4 py-2 gap-4">
            {isLoading ? (
              <p className="text-center text-sm text-[#7F7F7F] py-10">불러오는 중...</p>
            ) : likedPosts.length === 0 ? (
              <p className="text-center text-sm text-[#7F7F7F] py-10">
                좋아요한 게시물이 없어요
              </p>
            ) : (
              likedPosts.map((post) => (
                <div
                  key={post.postId}
                  onClick={() => navigate(`/post/${post.postId}`)}
                  className="relative mx-auto flex gap-3 p-[18px] cursor-pointer"
                  style={{
                    width: "370px",
                    minHeight: "190px",
                    borderRadius: "40px",
                    border: "1px solid #CCCCCC",
                    background: "linear-gradient(90deg, #FFFFFF 51.91%, #E4E4FF 114.12%)",
                  }}
                >
                  {/* 왼쪽: 물건 사진 + 작성자 */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0 " style={{ width: "90px" }}>
                    <div
                      className="bg-[#E6E6E6] overflow-hidden flex items-center justify-center"
                      style={{ width: "90px", height: "90px", borderRadius: "20px", marginTop: "5px"  }}
                    >
                      <img
                        src={post.postImageUrl || "/logo3.png"}
                        alt={post.postTitle}
                        className={post.postImageUrl ? "w-full h-full object-cover" : "w-10 h-10 object-contain"}
                      />
                    </div>

                    <div className="flex items-center gap-3 mt-8">
                      <div
                        className="bg-gray-300 flex-shrink-0 overflow-hidden flex items-center justify-center"
                        style={{ width: "25px", height: "25px", borderRadius: "15px" }}
                      >
                        {post.profileImageUrl && (
                          <img src={post.profileImageUrl} alt={post.postMemberNickname} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <p
                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                        style={{ maxWidth: "60px", fontFamily: "Pretendard", fontWeight: 400, fontSize: "12px", color: "#000000" }}
                      >
                        {post.postMemberNickname}
                      </p>
                    </div>
                  </div>

                  {/* 오른쪽: 뱃지 + 제목 + 설명 + 신청일 + 가격 */}
                  <div className="flex flex-col flex-1 gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <span
                          className={`flex items-center justify-center text-[12px] px-3 whitespace-nowrap ${
                            post.postStatus === "ACTIVE" ? "bg-[#E9F5EE] text-black" : post.postStatus === "RENTED" ? "bg-[#FFF3CD] text-[#000000]" : "bg-[#FFE1E1] text-[#000000]"
                          }`}
                          style={{ height: "30px", borderRadius: "40px" }}
                        >
                          {post.postStatus === "ACTIVE" ? "대여가능" : post.postStatus === "RENTED" ? "대여중" : "대여완료"}
                        </span>
                        <span
                          className="flex items-center justify-center text-[12px] bg-[#E4E4FF] text-[#000000] px-3 whitespace-nowrap"
                          style={{ height: "30px", borderRadius: "40px" }}
                        >
                          {categoryLabel[post.postCategory as PostCategory]}
                        </span>
                      </div>
                      <button
                        onClick={async (e) => {
                          e.stopPropagation()
                          try {
                            await likePost(post.postId)
                            setLikedPosts((prev) => prev.filter((p) => p.postId !== post.postId))
                          } catch (err) {
                            console.error("좋아요 취소 실패:", err)
                          }
                        }}
                        className="flex items-center gap-0.5"
                      >
                        <Heart size={20} className="fill-[#9996FF] text-[#9996FF]" />
                        <span className="text-xs text-[#000000]">{post.likeCount}</span>
                      </button>
                    </div>
                    
                    {/* 제목 */}
                    <p
                      className="px-1 absolute overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{
                        width: "200px",
                        top: "61px",
                        left: "121px",
                        fontFamily: "Pretendard",
                        fontWeight: 700,
                        fontSize: "14px",
                        lineHeight: "1.2",
                        color: "#1A1A1A",
                      }}
                    >
                      {post.postTitle}
                    </p>

                    {/* 설명 */}
                    <p
                      className="px-1 absolute whitespace-pre-line overflow-hidden"
                      style={{
                        width: "200px",
                        height: "36px",
                        top: "85px",
                        left: "121px",
                        fontFamily: "Pretendard",
                        fontWeight: 400,
                        fontSize: "12px",
                        lineHeight: "1.4",
                        color: "#000000",
                      }}
                    >
                      {post.postDescription}
                    </p>

                    <div className="relative" style={{ marginTop: "8px", height: "20px" }}>
                      <p style={{ 
                        position: "absolute",
                        left: "6px",
                        top: "70px",
                        fontFamily: "Pretendard", 
                        fontWeight: 400, 
                        fontSize: "12px", 
                        lineHeight: "0.9", 
                        color: "#43A860",
                      }}>
                        대여 신청일 : {post.requestCreatedAt}
                      </p>
                      <p
                        className="whitespace-nowrap"
                        style={{ 
                          position: "absolute",
                          right: "0px",
                          top: "95px",
                          fontFamily: "Pretendard", 
                          fontWeight: 700, 
                          fontSize: "14px", 
                          lineHeight: "0.9", 
                          color: "#1A1A1A",
                        }}
                      >
                        {post.price.toLocaleString()}원 / {priceUnitLabel[post.priceUnit as RentalPriceUnit]}
                      </p>
                    </div>
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