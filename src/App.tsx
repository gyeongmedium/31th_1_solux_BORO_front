import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/onboarding/LoginPage";
import SignUpPage from "./pages/onboarding/SignUpPage";
import HomePage from "./pages/home/HomePage";

import ChatListPage from "./pages/chat/ChatListPage";
import EmptySpotChatListPage from "./pages/chat/EmptySpotChatListPage";

import LentalPage from "./pages/rental/LentPage";
import BorrowedPage from "./pages/rental/BorrowedPage";
import RentalLayout from "./pages/rental/RentalLayout";

import MyPage from "./pages/mypage/MyPage";


function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto h-dvh w-full max-w-[440px] bg-white shadow-lg flex flex-col overflow-hidden select-none">
      {/* - mx-auto: PC로 볼 때 화면 가운데 정렬
        - h-dvh: 모바일 상/하단 주소창 변동에 대응하는 동적 높이 100%
        - max-w-[440px]: 피그마 시안 비율대로 가로폭 제한
        - flex flex-col: 상단헤더 - 메인콘텐츠 - 바텀네비 정렬용 구조
      */}
      <div className="flex-1 overflow-y-auto w-full h-full">
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

          <Route path="/chat" element={<ChatListPage />} />
          <Route path="/chat/spot" element={<EmptySpotChatListPage/>} />
          
          <Route element={<RentalLayout />}>
            <Route path="/rental" element={<LentalPage />} />
            <Route path="/rental/borrowed" element={<BorrowedPage />} />
          </Route>

          <Route path="/mypage" element={<MyPage />} />

          {/* 예외 처리 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MobileLayout>
    </BrowserRouter>
  );
}
