// 
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    title: string;
    showBackButton?: boolean; // 뒤로가기 버튼 표시 여부 (선택 사항, 기본값 true)
}

export default function Header({ title, showBackButton = true }: HeaderProps) {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 w-full h-14 bg-white border-b border-gray-100 flex items-center px-4 justify-between z-10 select-none">
        {/* 1. 좌측 뒤로가기 버튼 영역 */}
        <div className="w-8 flex items-center">
            {showBackButton && (
            <button
                onClick={() => navigate(-1)}
                className="text-gray-600 text-xl font-light hover:opacity-60 active:scale-95 transition-all p-1"
                aria-label="뒤로가기"
            >
                ⟨
            </button>
            )}
        </div>

        {/* 2. 중앙 타이틀 영역 */}
        <h1 className="font-bold text-base text-gray-900 tracking-tight text-center flex-1">
            {title}
        </h1>

        {/* 3. 우측 레이아웃 균형을 위한 더미 공간 (타이틀 정중앙 배치를 위함) */}
        <div className="w-8"></div>
        </header>
    );
}