// 채팅 목록 (빈자리채팅 탭)

import BottomNav from "../../components/BottomNav";
import Tab from "../../components/Tab";


export default function EmptySpotChatListPage() {
    return (
        <div className="relative min-w-[402px] max-w-[402px] min-height-[874px] max-height-[874px] w-[402px] h-[874px] overflow-hidden flex flex-col bg-white">
            {/* 상단 헤더 */}
            <div className="pl-[30px] pt-[30px] pb-5 flex-shrink-0">
                <h1 className="text-2xl font-bold leading-none text-black">채팅</h1>
            </div>

            {/* 탭 메뉴 */}
            <Tab 
                activeTab="second"
                firstLabel="거래 채팅"
                firstPath="/chat/"
                secondLabel={(
                    <div className="flex items-center gap-1.5 justify-center">
                        <svg 
                            width="11" 
                            height="12" 
                            viewBox="0 0 11 12" 
                            xmlns="http://www.w3.org/2000/svg"
                            className="flex-shrink-0"
                        >
                            <path d="M9.90776 1.46182C10.266 1.06642 9.92838 0.500017 9.333 0.500017H4.71566C4.59063 0.49922 4.46747 0.526508 4.35802 0.579258C4.24858 0.632007 4.15652 0.708444 4.09071 0.801217L0.596763 5.87483C0.32107 6.27443 0.667577 6.77303 1.22102 6.77303H3.57851L1.35784 11.612C1.03677 12.224 1.90441 12.7838 2.48742 12.341L11.5 4.89862H6.79126L9.90776 1.46182Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                fill="#FFFFFF"
                            />
                        
                        </svg>
                        <span>빈자리 채팅</span>
                    </div>
                )}
                secondPath="/chat/spot"
            />


            <BottomNav/>
        </div>
    );
}