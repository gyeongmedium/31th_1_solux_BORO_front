// 게시글 관련 API 함수 정의
// 서버한테 요청 보낼 때 사용
import api from "../lib/axios"
import type { ApiResponse, PostSummary } from "../types/post"

export const getPosts = (onlyAvailable: boolean) =>
  api.get<ApiResponse<PostSummary[]>>(`/api/v1/post?onlyAvailable=${onlyAvailable}`)

export const likePost = (postId: number) =>
  api.post(`/api/v1/post/${postId}/like`)

export const createPost = (data: {
  imageUrlList: string[]
  category: string
  title: string
  description: string
  rentalStartTime: string
  rentalEndTime: string
  rentalPrice: number
  rentalPriceUnit: string
}) => api.post("/api/v1/post", data)