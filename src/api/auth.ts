import axios from 'axios';
import api from '../lib/axios';
import type {
    SignUpRequest,
    SignUpResponse,
    ReissueResponse,
    GoogleCallbackRequest,
    GoogleCallbackResponse,
} from '../types/auth';

const BASE_URL = import.meta.env.VITE_API_URL;

// 1. [POST] 회원가입 API
export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
    const response = await api.post<SignUpResponse>('/api/v1/auth/sign-up', data);
    return response.data;
};

// 2. [POST] Access Token 재발급 API
export const reissueToken = async (): Promise<ReissueResponse> => {
    const response = await axios.post<ReissueResponse>(
        `${BASE_URL}/api/v1/auth/reissue`,
        {},
        { withCredentials: true } // 쿠키의 refreshToken 전달
    );
    return response.data;
};

// 3. [GET] 구글 소셜 로그인 API
export const googleCallback = async (
    params: GoogleCallbackRequest
): Promise<GoogleCallbackResponse> => {
    const response = await api.get<GoogleCallbackResponse>(
        '/api/v1/auth/google/callback',
        { params }
    );
    return response.data;
};