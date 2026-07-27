import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/onboarding/LoginPage";
import SignUpPage from "./pages/onboarding/SignUpPage";
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
import LikedPostsPage from "./pages/mypage/LikedPostsPage";
import ProfileEditPage from "./pages/mypage/ProfileEditPage";
import MyPostsPage from "./pages/mypage/MyPostsPage";
import TradeHistoryPage from "./pages/mypage/TradeHistoryPage";


function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto h-dvh w-full max-w-[440px] bg-white shadow-lg flex flex-col overflow-hidden select-none">
      <div className="flex-1 w-full h-full vertical-scroll">
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MobileLayout>
        <Routes>
          {/* 온보딩 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* 메인 탭 전환 주소들 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/post/create" element={<PostCreatePage />} />
          <Route path="/post/edit/:postId" element={<PostCreatePage />} />
          <Route path="/spot/edit/:spotId" element={<PostCreatePage />} />
          <Route path="/post/:postId" element={<PostDetailPage />} />

          <Route path="/chat" element={<ChatListPage />} />
          <Route path="/chat/spot" element={<EmptySpotChatListPage />} />
          <Route path="/post/spot/:spotId" element={<SpotDetailPage />} />
          <Route path="/chat/:roomId" element={<DetailedChatPage />} />
          
          <Route element={<RentalLayout />}>
            <Route path="/rental" element={<LentalPage />} />
            <Route path="/rental/borrowed" element={<BorrowedPage />} />
          </Route>

          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/liked" element={<LikedPostsPage />} />
          <Route path="/mypage/edit" element={<ProfileEditPage />} />
          <Route path="/mypage/my-posts" element={<MyPostsPage />} />
          <Route path="/mypage/history" element={<TradeHistoryPage />} />

          {/* 예외 처리 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MobileLayout>
    </BrowserRouter>
  );
}