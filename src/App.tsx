import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/onboarding/LoginPage";
import SignUpPage from "./pages/onboarding/SignUpPage";
import HomePage from "./pages/home/HomePage";
import ChatListPage from "./pages/chat/ChatListPage";
import RentalPage from "./pages/rental/LentPage";
import BorrowedPage from "./pages/rental/BorrowedPage";
import MyPage from "./pages/mypage/MyPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 온보딩 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* 메인 탭 전환 주소들 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatListPage />} />
        
        <Route path="/rental" element={<RentalPage />} />
        <Route path="/rental/borrowed" element={<BorrowedPage />} />

        <Route path="/mypage" element={<MyPage />} />

        {/* 예외 처리 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
