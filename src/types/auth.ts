export type University = "숙명여자대학교"
export type Active = "활성" | "비활성" | "정지" | "영구탈퇴"


export interface SignUpRequest {
    email: string
    name: string
    university: University
    studentNumber: string
    password: string
    nickName: string
    active: Active
}


export interface SignUpResponse {
    name: string
    email: string
    socialId: string
    accessToken: string
    refreshToken: string
}

export interface SendEmailRequest {
    email: string
}


export interface VerifyEmailRequest {
    email: string
    code: string
}


export interface ReissueResponse {
    memberId: number
    accessToken: string
}