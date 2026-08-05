import api from "../lib/axios"
import type { ApiResponse } from "../types/post"
import type { MyPostItem } from "../types/myPost"

// 내가 작성한 게시물 조회
export const getMyPosts = () =>
  api.get<ApiResponse<MyPostItem[]>>("/api/v1/members/posts")