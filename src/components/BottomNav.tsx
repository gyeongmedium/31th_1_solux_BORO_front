import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { name: "홈", path: "/" },
        { name: "대여 현황", path: "/rental" },
        { name: "채팅", path: "/chat" },
        { name: "마이 페이지", path: "/mypage" },
    ];

    const isActive = (path: string) => {
        if (path === "/") {
        return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    return (
        /* fixed를 absolute로 변경하여 부모 모바일 컨테이너 최하단에 달라붙게 만듭니다 */
        <div className="absolute bottom-0 left-0 right-0 w-full bg-white border-t border-gray-100 flex justify-around items-end h-[61px] pb-1 z-50">
        {navItems.map((item) => {
            const active = isActive(item.path);

            return (
            <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-between h-full w-full pt-2 flex-1 relative cursor-pointer"
            >
                <span
                className={`text-[13px] font-bold transition-colors duration-200 ${
                    active ? "text-[#A393EB]" : "text-[#111111] opacity-40"
                }`}
                >
                {item.name}
                </span>

                <div className="w-full flex justify-center h-[3px] mt-1.5">
                <div
                    className={`w-12 h-full rounded-full transition-all duration-200 ${
                    active ? "bg-[#A393EB]" : "bg-transparent"
                    }`}
                />
                </div>
            </button>
            );
        })}
        </div>
    );
}