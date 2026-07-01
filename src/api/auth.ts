import api from "../lib/axios"
import type { SignUpRequest, SignUpResponse, SendEmailRequest, VerifyEmailRequest, ReissueResponse } from "../types/auth"


// 1. 회원가입
export const signUp = (data: SignUpRequest) =>
    api.post<SignUpResponse>("/api/v1/auth/sign-up", data)

// 소셜 로그인 안하는거 아닌가????
// export const socialLogin = (data: any) =>
//     api.post("/api/v1/auth/oauth2/callback", data)

// 이메일 인증 코드 발송
export const sendEmailCode = (data: SendEmailRequest) =>
    api.post("/api/v1/auth/email/send", data)

// 이메일 인증 코드 검증
export const verifyEmailCode = (data: VerifyEmailRequest) =>
    api.post("/api/v1/auth/email/verify", data)

// 액세스 토큰 재발급
export const reissueToken = () =>
    api.post<ReissueResponse>("/api/v1/auth/reissue")


// 로그아웃
export const logout = () =>
    api.post("/api/v1/auth/logout")

// 회원 탈퇴
export const withdraw = () =>
    api.patch("/api/v1/auth/withdraw")