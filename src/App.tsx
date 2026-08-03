import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom";

import LoginPage from "./pages/onboarding/LoginPage";
import SignUpPage from "./pages/onboarding/SignUpPage";
import GoogleCallbackPage from "./pages/onboarding/GoogleCallbackPage";

import HomePage from "./pages/home/HomePage";
import PostCreatePage from "./pages/home/PostCreatePage";
import PostDetailPage from "./pages/home/PostDetailPage";
import SpotDetailPage from "./pages/home/SpotDetailPage";

import ChatListPage from "./pages/chat/ChatListPage";
import EmptySpotChatListPage from "./pages/chat/EmptySpotChatListPage";
import DetailedChatPage from "./pages/chat/DetailedChatPage";

import LentalPage from "./pages/rental/LentPage";
import BorrowedPage from "./pages/rental/BorrowedPage";
import RentalLayout from "./pages/rental/RentalLayout";

import MyPage from "./pages/mypage/MyPage";
import StorePage from "./pages/mypage/StorePage";
import PointPage from "./pages/mypage/PointPage";
import NoonsongDecoPage from "./pages/mypage/NoonsongDecoPage";
import ReviewCreatePage from "./pages/mypage/ReviewCreatePage";
import ReviewPage from "./pages/mypage/ReviewPage";
import MyReviewPage from "./pages/mypage/MyReviewPage";
import LikedPostsPage from "./pages/mypage/LikedPostsPage";
import ProfileEditPage from "./pages/mypage/ProfileEditPage";
import MyPostsPage from "./pages/mypage/MyPostsPage";
import TradeHistoryPage from "./pages/mypage/TradeHistoryPage";


function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto h-dvh w-full max-w-[440px] bg-white shadow-lg flex flex-col overflow-hidden select-none">
      <div className="flex-1 overflow-y-auto w-full h-full">
        {children}
      </div>
    </div>
  );
}

function RootPage() {
  const token = localStorage.getItem("accessToken");

  // 토큰이 없으면 주소창은 / 그대로 유지하면서 LoginPage를 렌더링
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 토큰이 있으면 HomePage 렌더링
  return <HomePage />;
}

function ProtectedRoute() {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const isAlertShown = useRef(false);

  useEffect(() => {
    if (!token && !isAlertShown.current) {
      isAlertShown.current = true; // 플래그를 true로 변경해서 중복 실행 방지
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return <Outlet />;
}



export default function App() {
  return (
    <BrowserRouter>
      <MobileLayout>
        <Routes>
          {/* 루트 경로 (주소 변경 없이 로그인 여부에 따라 화면 결정) */}
          <Route path="/" element={<RootPage />} />

          {/* 온보딩 (누구나 접근 가능)*/}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/auth/google/callback" element={<GoogleCallbackPage />} />

          {/* 로그인 토큰 필수 */}
          <Route element={<ProtectedRoute />}>
            {/* 홈 */}
            <Route path="/" element={<HomePage />} />
            <Route path="/post/create" element={<PostCreatePage />} />
            <Route path="/post/edit/:postId" element={<PostCreatePage />} />
            <Route path="/spot/edit/:spotId" element={<PostCreatePage />} />
            <Route path="/post/:postId" element={<PostDetailPage />} />
            <Route path="/post/spot/:spotId" element={<SpotDetailPage />} />


            {/* 채팅 */}
            <Route path="/chat" element={<ChatListPage />} />
            <Route path="/chat/spot" element={<EmptySpotChatListPage />} />
            <Route path="/chat/:roomId" element={<DetailedChatPage />} />
            
            {/* 대여 현황 */}
            <Route element={<RentalLayout />}>
              <Route path="/rental" element={<LentalPage />} />
              <Route path="/rental/borrowed" element={<BorrowedPage />} />
            </Route>

            {/* 마이페이지 */}
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/store" element={<StorePage />} />
            <Route path="/mypage/point" element={<PointPage />} />
            <Route path="/mypage/noonsong" element={<NoonsongDecoPage />} />
            <Route path="/mypage/review-create/:rentalId" element={<ReviewCreatePage />} />
            <Route path="/mypage/review" element={<ReviewPage />} />
            <Route path="/mypage/my-review" element={<MyReviewPage />} />
            <Route path="/mypage/liked" element={<LikedPostsPage />} />
            <Route path="/mypage/edit" element={<ProfileEditPage />} />
            <Route path="/mypage/my-posts" element={<MyPostsPage />} />
            <Route path="/mypage/history" element={<TradeHistoryPage />} />
          </Route>

          {/* 예외 처리 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MobileLayout>
    </BrowserRouter>
  );
}