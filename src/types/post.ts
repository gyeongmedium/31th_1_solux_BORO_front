//게시글 데이터 type 정의
export type PostCategory =
  | "DEPARTMENT_JACKET"
  | "MAJOR_BOOKS"
  | "ELECTRONICS"
  | "LIVING_SUPPLIES"
  | "ETC"
  | "EMPTY_SPOTS"

export type PostStatus = "ACTIVE" | "PENDING" | "RENTED" | "COMPLETED" | "DELETED"

export type RentalPriceUnit = "HOUR" | "DAY" | "WEEK" | "MONTH" | "SEMESTER"

export interface PostSummary {
  postId: number
  status: PostStatus
  imageUrlList: string[]
  category: PostCategory
  title: string
  description: string
  rentalStartTime: string
  rentalEndTime: string
  rentalPrice: number
  rentalPriceUnit: RentalPriceUnit
  authorNickname: string
  likeCount: number
  liked: boolean
  createdAt: string
}

export interface ApiResponse<T> {
  isSuccess: boolean
  code: string
  message: string
  result: T
}