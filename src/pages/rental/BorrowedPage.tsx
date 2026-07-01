// 대여현황 (빌린 탭)

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockBorrowedRentals } from "../../api/mockRental";
import type { BorrowedRentalResponse } from "../../types/rental";
import BottomNav from "../../components/BottomNav";

export default function BorrowedPage() {
    const navigate = useNavigate();

    // 초기값 배열 설정
    const [rentals] = useState<BorrowedRentalResponse[]>([mockBorrowedRentals]);

    // 에러를 내던 동기식 setRentals 구문을 지우고 클린하게 비워둡니다.
    useEffect(() => {
        /*
        [연결 후 적용 방법]
        getBorrowedRentals().then(res => setRentals(res.data));
        */
    }, []);

    return (
        <div className="w-full h-full flex flex-col bg-white relative pb-[61px]">
        {/* 상단 헤더 */}
        <div className="px-6 pt-10 pb-4">
            <h1 className="text-2xl font-extrabold text-black">대여현황</h1>
        </div>

        {/* 탭 메뉴 */}
        <div className="px-6 mb-6">
            <div className="flex bg-gray-100 rounded-full p-1">
            <button
                onClick={() => navigate("/rental")}
                className="flex-1 py-2.5 text-center text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors"
            >
                내가 빌려준 것 (2)
            </button>
            <button className="flex-1 py-2.5 text-center bg-[#A393EB] text-white rounded-full text-sm font-bold shadow-sm">
                내가 빌린 것 (1)
            </button>
            </div>
        </div>

        {/* 콘텐츠 리스트 영역 */}
        <div className="flex-1 overflow-y-auto px-6 space-y-6">
            {rentals.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-[32px] p-5 shadow-sm bg-white">
                <div className="flex gap-4 mb-4">
                {/* 이미지 구역 */}
                <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <div className="text-gray-400">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    </div>
                </div>

                {/* 정보 기입 구역 */}
                <div className="flex-1 min-w-0">
                    <div className="flex gap-1.5 mb-1.5">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FCE6D6] text-[#E2833B]">
                        대여중
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E1EDFF] text-[#558FF3]">
                        전공서적
                    </span>
                    </div>
                    
                    <h2 className="text-[15px] font-bold text-black mb-1 leading-tight">
                    {item.title}
                    </h2>
                    
                    <p className="text-[12px] text-gray-600 mb-1">
                    대여자 : {item.lender}
                    </p>
                    
                    <p className="text-[11px] text-[#8AC174] font-medium leading-normal">
                    대여 신청일 : {item.rentalStartTime} ~ <br />
                    반납 예정 : {item.rentalEndTime}
                    </p>
                </div>
                </div>

                {/* 하단 버튼 구조 */}
                <div className="flex flex-col gap-2">
                <button className="w-full py-3 bg-[#A393EB] text-white rounded-full text-sm font-bold active:bg-[#8e7dd1] transition-colors">
                    반납 하기
                </button>
                <button className="w-full py-3 bg-white border border-black rounded-full text-sm font-bold flex items-center justify-center gap-2 active:bg-gray-50 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    채팅하기
                </button>
                </div>
            </div>
            ))}
        </div>

        {/* 하단 공통 네비게이션 */}
        <BottomNav />
        </div>
    );
}