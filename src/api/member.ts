import api from "../lib/axios"
import type { ApiResponse, PostSummary } from "../types/post"
import type { MyPostItem } from "../types/myPost"
import type { LikedPostItem } from "../types/likedPosts"

// 내가 작성한 게시물 조회
export const getMyPosts = () =>
  api.get<ApiResponse<MyPostItem[]>>("/api/v1/members/posts")

// 내가 좋아요한 게시물 조회
export const getLikedPosts = () =>
  api.get<ApiResponse<PostSummary[]>>("/api/v1/members/liked-posts")