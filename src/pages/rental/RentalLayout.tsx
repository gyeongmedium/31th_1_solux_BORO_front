// 각 페이지의 게시글 개수 관리, 자식들에게 보내줌

import { Outlet } from "react-router-dom";

export default function RentalLayout() {
    // 임시로 숫자 지정 (나중에 백엔드 연결하면 자동으로 바뀜)
    const lentCount = 0; 
    const borrowedCount = 0;

    return (
        // context를 통해 아래에 올 자식 페이지들에게 숫자를 공유
        <Outlet context={{ lentCount, borrowedCount }} />
    );
}