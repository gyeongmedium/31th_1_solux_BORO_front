// src/pages/GoogleCallbackPage.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { googleCallback } from "../../api/auth";

export default function GoogleCallbackPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");

    useEffect(() => {
        if (!code) {
            alert("인증 코드가 존재하지 않습니다.");
            navigate("/login");
            return;
        }

        const handleAuth = async () => {
            try {
                // 1. 프론트가 받은 code를 가지고 백엔드 로그인 API 호출
                const response = await googleCallback({ code });

                if (response.isSuccess) {
                    const { authStatus, accessToken, refreshToken, signUpToken, email, name } = response.result;

                    // 2. 신규 회원인 경우 -> 회원가입 페이지로 이동 (state 데이터 전달)
                    if (authStatus === "NEED_SIGNUP") {
                        navigate("/signup", {
                            state: {
                                signUpToken,
                                email,
                                name,
                            },
                        });
                    } 
                    // 3. 기존 회원인 경우 -> 토큰 저장 후 홈 화면 이동
                    else if (authStatus === "LOGIN") {
                        if (accessToken) localStorage.setItem("accessToken", accessToken);
                        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
                        alert("로그인에 성공하였습니다.");
                        navigate("/");
                    }
                } else {
                    alert(response.message || "로그인 처리 중 오류가 발생했습니다.");
                    navigate("/login");
                }
            } catch (error) {
                console.error("구글 콜백 처리 중 에러 발생:", error);
                alert("로그인 처리 중 오류가 발생했습니다. 다시 시도해 주세요.");
                navigate("/login");
            }
        };

        handleAuth();
    }, [code, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <p className="text-[14px] text-gray-400">구글 로그인 처리 중입니다...</p>
            <p className="text-[12px] text-gray-400 mt-2">잠시만 기다려 주세요.</p>
        </div>
    );
}