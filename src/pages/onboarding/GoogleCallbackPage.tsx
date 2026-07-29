import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function GoogleCallbackPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // 백엔드가 처리 완료 후 프론트 콜백 URL 뒤에 붙여서 보내주는 파라미터들
        const accessToken = searchParams.get("accessToken");
        const authStatus = searchParams.get("authStatus");
        const signUpToken = searchParams.get("signUpToken");
        const email = searchParams.get("email");
        const name = searchParams.get("name");
        const error = searchParams.get("error");

        if (error) {
            alert("로그인 처리 중 오류가 발생했습니다.");
            navigate("/login");
            return;
        }

        // 1. 신규 회원 -> 회원가입 페이지로 이동
        if (authStatus === "NEED_SIGNUP") {
            navigate("/signup", {
                state: {
                    signUpToken,
                    email,
                    name,
                },
            });
        } 
        // 2. 기존 회원 -> Access Token 저장 후 메인 이동 (Refresh Token은 HttpOnly 쿠키로 이미 저장됨)
        else if (authStatus === "LOGIN" || accessToken) {
            if (accessToken) localStorage.setItem("accessToken", accessToken);
            alert("로그인에 성공하였습니다.");
            navigate("/");
        } 
        else {
            alert("로그인 정보가 유효하지 않거나 인증에 실패했습니다.");
            navigate("/login");
        }
    }, [searchParams, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <p className="text-[14px] text-gray-400">구글 로그인 처리 중입니다...</p>
        </div>
    );
}