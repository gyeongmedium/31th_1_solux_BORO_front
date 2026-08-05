// 게시글 관련 API 함수(요청)

import api from "../lib/axios"
import type { ApiResponse, PostSummary } from "../types/post"

//게시글 목록 가져오기
export const getPosts = (onlyAvailable: boolean) =>
  api.get<ApiResponse<PostSummary[]>>(`/api/v1/post?onlyAvailable=${onlyAvailable}`)

//게시글 상세 정보 가져오기
export const getPostDetail = (postId: number) =>
  api.get<ApiResponse<PostSummary>>(`/api/v1/post/${postId}`)

//게시글 좋아요
export const likePost = (postId: number) =>
  api.post(`/api/v1/post/${postId}/like`)
  
//게시글 생성
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

//게시글 삭제
export const deletePost = (postId: number) =>
  api.delete(`/api/v1/post/${postId}`)