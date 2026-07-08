// 대여현황 (빌려준 탭)

import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";        //  useNavigate,
import { mockLentRentals } from "../../api/mockRental";
import type { LentRentalResponse, RequestStatus } from "../../types/rental";
import BottomNav from "../../components/BottomNav";
import Tab from "../../components/Tab";

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
    return styles[status] || styles["요청중"]
}


export default function LentPage() {
    //const navigate = useNavigate();
    const { borrowedCount } = useOutletContext<{ borrowedCount: number }>();


    // 초기값으로 mock 데이터를 넣어 리스트가 보이게 유지합니다.
    const [rentals, setRentals] = useState<LentRentalResponse[]>([
        mockLentRentals,
        { ...mockLentRentals, title: "공대 과잠 대여하고 싶어요", borrower: "해적왕" },
        { ...mockLentRentals, title: "공대 과잠 대여하고 싶어요", borrower: "공부왕" }

    ]);

    const [modalState, setModalState] = useState<{
        show: boolean
        index: number | null
        action: 'approve' | 'reject' | null
    }>({ show: false, index: null, action: null })

    const [toast, setToast] = useState<string | null>(null)

    // useEffect 내부에 에러를 유발하는 동기적 setState를 지우고 구조만 남겨둡니다.
    useEffect(() => {
        /* [연결 후 적용 방법]
        실제 API가 연결되면 아래 주석을 풀고 사용하세요. 
        (이때 컴포넌트 상단의 useState 변수도 const [rentals, setRentals] = useState... 처럼 setRentals를 다시 추가해야 합니다.)

        getLentRentals().then(res => setRentals(res.data));
        */
    }, []);

    const handleApprove = (index: number) => {
        setModalState({ show: true, index, action: 'approve' })
    }

    const handleReject = (index: number) => {
        setModalState({ show: true, index, action: 'reject' })
    }

    const confirmAction = () => {
        if (modalState.index === null) return

        const newRentals = [...rentals]
        const newStatus: RequestStatus = modalState.action === 'approve' ? '대여중' : '대여가능'
        newRentals[modalState.index].requestStatus = newStatus

        setRentals(newRentals)
        setModalState({ show: false, index: null, action: null })

        setToast(`상태가 "${newStatus}"으로 변경되었습니다`)
        setTimeout(() => setToast(null), 2000)
    }

    const cancelAction = () => {
        setModalState({ show: false, index: null, action: null })
    }


    return (
        <div className="relative min-w-[402px] max-w-[402px] min-height-[874px] max-height-[874px] w-[402px] h-[874px] overflow-hidden flex flex-col bg-white">
            {/* 상단 헤더 */}
            <div className="pl-[30px] pt-[30px] pb-5 flex-shrink-0">
                <h1 className="text-2xl font-bold leading-none text-black">대여현황</h1>
            </div>

            {/* 탭 메뉴 */}
            <Tab 
                activeTab="first"
                firstLabel="내가 빌려준 것"
                firstCount={`(${rentals.length})`}
                firstPath="/rental/"
                secondLabel="내가 빌린 것"
                secondCount={`(${borrowedCount})`}
                secondPath="/rental/borrowed"
            />

            {/* 콘텐츠 리스트 영역 */}
            <div className="flex-1 overflow-y-auto px-4 space-y-4 pt-2 pb-[75px] scrollbar-thin">                
                {rentals.map((item, index) => {
                        const statusStyle = getStatusStyle(item.requestStatus)
                        return (
                            <div key={index} className="w-[370px] h-[254px] border border-[#CCCCCC] rounded-[40px] p-5 bg-white mb-5">
                                <div className="flex gap-4 mb-4">
                                    {/* 이미지 영역 */}
                                    <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <div className="text-gray-400">
                                            {/*여기에 BARO 아이콘 이미지 넣기*/}
                                        </div>
                                    </div>

                                    {/* 우측 정보 영역 */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex gap-1.5 mb-1.5">
                                            <span className={`text-[12px] px-3 py-1.5 rounded-[40px] ${statusStyle.bg} ${statusStyle.text}`}>
                                                {item.requestStatus}
                                            </span>
                                            <span className="text-[12px] px-3 py-1.5 rounded-[40px] bg-[#E4E4FF] text-[#000000]">
                                                과잠
                                            </span>
                                        </div>
                                        <h2 className="text-[14px] font-bold text-black mt-3.5 mb-3 truncate leading-none">
                                            {item.title}
                                        </h2>
                                        <p className="text-[12px] text-[#000000]-600 mb-3">
                                            대여자 : {item.borrower}
                                        </p>
                                        <p className="text-[12px] text-[#43A860]">
                                            대여 신청일 : {item.rentalStartTime}
                                        </p>
                                    </div>
                                </div>

                                {/* 하단 버튼 그룹 */}
                                <div className="flex flex-col gap-2 items-center">
                                    <div className="flex gap-4">
                                        <button 
                                            onClick={() => handleApprove(index)}
                                            className="w-[142px] h-[34px] py-1 bg-[#9996FF] text-white rounded-[40px] text-sm font-bold active:bg-[#8e7dd1] transition-colors"
                                        >대여 승인</button>
                                        <button 
                                            onClick={() => handleReject(index)}
                                            className="w-[142px] h-[34px] py-1 bg-white border border-[#7F7F7F] text-[#1A1A1A] text-sm rounded-[40px] active:bg-gray-50 transition-colors"
                                        >거절</button>
                                    </div>
                                    <button className="w-[304px] h-[40px] bg-white border border-black rounded-[40px] text-sm flex items-center justify-center mt-1 gap-2 active:bg-gray-50 transition-colors">
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
                    message={modalState.action === 'approve' ? '대여를 승인하시겠어요?' : '대여 요청을 거절하시겠어요?'}
                    subMessage={modalState.action === 'approve' ? '승인 후 거래가 시작됩니다.' : '거절 후 상태가 대여 가능으로 변경됩니다.'}
                    onConfirm={confirmAction}
                    onCancel={cancelAction}
                />
            )}

            {/* Toast */}
            {toast && <Toast message={toast} />}
        </div>
    );
}