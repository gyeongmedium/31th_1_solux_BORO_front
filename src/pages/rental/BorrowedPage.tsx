// 대여현황 (빌린 탭)

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockBorrowedRentals } from "../../api/mockRental";
import type { BorrowedRentalResponse, RequestStatus } from "../../types/rental";
import BottomNav from "../../components/BottomNav";


// 팝업 컴포넌트 (취소/확인)
function ConfirmModal({ 
    message, 
    subMessage,
    onConfirm, 
    onCancel 
}: { 
    message: string
    subMessage: string
    onConfirm: () => void
    onCancel: () => void 
}) {
    return (
        <div className="absolute inset-0 bg-black/45 flex items-center justify-center z-50 px-[26px]">
            <div className="absolute top-[336px] left-1/2 -translate-x-1/2 bg-white rounded-[40px] shadow-lg w-[350px] h-[190px] flex flex-col items-center justify-center pt-9 pb-5 px-6">
                <h3 className="text-[20px] font-bold text-center text-black mb-3 leading-tight whitespace-pre-line">
                    {message}
                </h3>
                <p className="text-[14px] text-[#7F7F7F] text-center leading-normal">
                    {subMessage}
                </p>
                <div className="flex justify-center gap-4.5 w-full mt-5">
                    <button 
                        onClick={onCancel}
                        className="w-[120px] h-[40px] border border-[#7F7F7F] text-[#1A1A1A] rounded-[40px] text-sm font-medium cursor-pointer bg-white active:bg-gray-50 transition-colors"
                    >
                        취소
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="w-[128px] h-[40px] bg-[#9996FF] text-white rounded-[40px] text-sm font-bold cursor-pointer active:bg-[#8582eb] transition-colors"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    )
}

// Toast 메시지 컴포넌트
function Toast({ message }: { message: string }) {
    return (
        <div className="absolute top-[755px] left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white pl-[19px] pr-4 w-[332px] h-[46px] rounded-[40px] flex items-center gap-[35px] z-50 shadow-md">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="9" fill="#FFFFFF"/>
                <path d="M5.5 9L8 11.5L12.5 6.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[14px] text-[#FFFFFF] truncate leading-none">
                {message}
            </span>
        </div>
    )
}


// 상태별 배경색 반환
function getStatusStyle(status: RequestStatus) {
    const styles = {
        "요청중": { bg: "bg-[#FFF4AB]", text: "text-[#1A1A1A]" },
        "대여중": { bg: "bg-[#FFD4BB]", text: "text-[#1A1A1A]" },
        "대여가능": { bg: "bg-[#E9F5EE]", text: "text-[#1A1A1A]" },
        "반납완료": { bg: "bg-[#E4E4FF]", text: "text-[#1A1A1A]" }
    }
    return styles[status] || styles["대여중"]
}


export default function BorrowedPage() {
    const navigate = useNavigate();

    // 초기값 배열 설정
    const [rentals, setRentals] = useState<BorrowedRentalResponse[]>([
        mockBorrowedRentals,
        mockBorrowedRentals,
        mockBorrowedRentals
    ]);

    const [modalState, setModalState] = useState<{
        show: boolean
        index: number | null
    }>({ show: false, index: null })

    const [toast, setToast] = useState<string | null>(null)

    useEffect(() => {
        /*
        [연결 후 적용 방법]
        getBorrowedRentals().then(res => setRentals(res.data));
        */
    }, []);

    const handleReturn = (index: number) => {
        setModalState({ show: true, index })
    }

    const confirmReturn = () => {
        if (modalState.index === null) return

        const newRentals = [...rentals]
        newRentals[modalState.index].requestStatus = '반납완료'

        setRentals(newRentals)
        setModalState({ show: false, index: null })

        setToast('상태가 "반납완료"로 변경되었습니다')
        setTimeout(() => setToast(null), 2000)
    }

    const cancelReturn = () => {
        setModalState({ show: false, index: null })
    }


    return (
        <div className="relative min-w-[402px] max-w-[402px] min-height-[874px] max-height-[874px] w-[402px] h-[874px] overflow-hidden flex flex-col bg-white">
            {/* 상단 헤더 */}
            <div className="pl-[30px] pt-[30px] pb-5 flex-shrink-0">
                <h1 className="text-2xl font-bold leading-none text-black">대여현황</h1>
            </div>

            {/* 탭 메뉴 */}
            <div className="px-6 mb-4 h-[44px] flex-shrink-0 relative">
                <div className="absolute top-0 left-[22px] flex bg-[#E6E6E6] rounded-[40px] w-[359px] h-[44px] p-1">
                    <button
                        onClick={() => navigate("/rental/")}
                        className="flex-1 py-1.5 text-center text-[#7F7F7F] text-sm hover:text-gray-600 transition-colors"
                    >
                        내가 빌려준 것 (2)
                    </button>
                    <button className="w-[175px] h-[34px] mt-[1px] mr-[6px] flex items-center justify-center bg-[#9996FF] text-[#FFFFFF] rounded-[40px] text-sm font-bold">
                        내가 빌린 것 ({rentals.length})
                    </button>
                </div>
            </div>

            {/* 콘텐츠 리스트 영역 */}
            <div className="flex-1 overflow-y-auto px-4 space-y-4 pt-2 pb-[75px] scrollbar-thin">
                {rentals.map((item, index) => {
                    const statusStyle = getStatusStyle(item.requestStatus)
                    return (
                        <div key={index} className="w-[370px] h-[254px] border border-[#CCCCCC] rounded-[40px] p-5 bg-white mb-5">
                            <div className="flex gap-4 mb-4">
                                {/* 이미지 구역 */}
                                <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <div className="text-gray-400">
                                        {/*여기에 BARO 아이콘 이미지 넣기*/}
                                    </div>
                                </div>

                                {/* 정보 기입 구역 */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex gap-1.5 mb-1.5">
                                        <span className={`text-[12px] px-3 py-1.5 rounded-[40px] ${statusStyle.bg} ${statusStyle.text}`}>
                                            {item.requestStatus}
                                        </span>
                                        <span className="text-[12px] px-3 py-1.5 rounded-[40px] bg-[#E4E4FF] text-[#000000]">
                                            전공서적
                                        </span>
                                    </div>

                                    <h2 className="text-[14px] font-bold text-black mt-3.5 mb-3 truncate leading-none">
                                        {item.title}
                                    </h2>

                                    <p className="text-[12px] text-[#000000]-600 mb-2">
                                        대여자 : {item.lender}
                                    </p>

                                    <p className="text-[12px] text-[#43A860] leading-[14px]">
                                        대여 신청일 : {item.rentalStartTime} ~ <br />
                                        반납 예정 : {item.rentalEndTime}
                                    </p>
                                </div>
                            </div>

                            {/* 하단 버튼 구조 */}
                            <div className="flex flex-col gap-3 items-center">
                                <button 
                                    onClick={() => handleReturn(index)}
                                    className="w-[300px] h-[34px] py-1 mt-[-5px] bg-[#9996FF] text-white rounded-[40px] text-sm font-bold active:bg-[#8582eb] transition-colors"
                                >
                                    반납 하기
                                </button>
                                <button className="w-[300px] h-[34px] bg-white border border-black rounded-[40px] text-sm flex items-center justify-center gap-2 active:bg-gray-50 transition-colors">
                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
                                        <path d="M14.6667 6.33333C14.6667 9.46294 11.6819 12 8 12C7.3065 12 6.6433 11.9016 6.02428 11.7171L3 13V10.3837C1.76185 9.33642 1 7.91719 1 6.33333C1 3.20372 3.98477 0.666664 7.66667 0.666664C11.3486 0.666664 14.6667 3.20372 14.6667 6.33333Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    채팅하기
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* 하단 공통 네비게이션 */}
            <BottomNav />

            {/* 모달 */}
            {modalState.show && (
                <ConfirmModal
                    message="반납 완료 처리하시겠어요?"
                    subMessage="완료 후 상대방에게 후기를 남길 수 있습니다."
                    onConfirm={confirmReturn}
                    onCancel={cancelReturn}
                />
            )}

            {/* Toast */}
            {toast && <Toast message={toast} />}
        </div>
    )
}