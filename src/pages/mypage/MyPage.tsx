import { ChevronRight, Clock, Star, Heart, ShoppingCart, UserCog, Settings, LogOut, AlertCircle } from "lucide-react"
import BottomNav from "../../components/BottomNav"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function MyPage() {
  const navigate = useNavigate()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const user = {
    name: "김윤지",
    nickname: "김눈송",
    isVerified: true,
    universityInfo: "숙명여대 25학번 / 재학생",
    departmentInfo: "경영학과 24*****",
    points: "1,250",
  }

  const menuItems = [
    { icon: Clock, label: "거래 내역", path: "/mypage/history" },
    { icon: Star, label: "받은 후기", path: "/mypage/review" },
    { icon: Heart, label: "찜한 게시물 보기", path: "/mypage/liked" },
    { icon: ShoppingCart, label: "포인트 / 상점", path: "/mypage/store" },
    { icon: UserCog, label: "프로필 수정", path: "/mypage/edit" },
    { icon: Settings, label: "설정", path: "/mypage/settings" },
  ]

  const handleLogout = () => {
    setShowLogoutModal(false)
    navigate("/login")
  }

  return (
    <div className="flex flex-col bg-white pb-24 vertical-scroll">
      {/* 헤더: 마이페이지 (font 24 bold) */}
      <div className="px-[30px] pt-[30px] pb-3">
        <span
          className="text-[24px] text-[#1A1A1A]"
          style={{ fontFamily: "Pretendard", fontWeight: 700, lineHeight: "1.2" }}
        >
          마이페이지
        </span>
      </div>

      {/* 프로필 영역 */}
      <div className="flex items-center gap-[14px] px-[42px] mt-4 mb-6">
        {/* 원형 배경 105x105 */}
        <div className="w-[105px] h-[105px] bg-[#E6E6E6] rounded-full flex items-center justify-center flex-shrink-0">
          {/* 커스텀 사람 아이콘 (37x37) */}
          <svg width="37" height="37" viewBox="0 0 37 37" fill="none">
            <circle cx="18.5" cy="10" r="6.5" stroke="#7F7F7F" strokeWidth="2.5" />
            <path
              d="M6 32C6 24.5 11 20 18.5 20C26 20 31 24.5 31 32"
              stroke="#7F7F7F"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          {/* 이름/닉네임 + 인증완료 뱃지 */}
          <div className="flex items-center gap-4">
            <span
              className="text-[16px] text-[#1A1A1A]"
              style={{ fontFamily: "Pretendard", fontWeight: 700, lineHeight: "1.2" }}
            >
              {user.name} / {user.nickname}
            </span>
            {user.isVerified && (
              <span
                className="flex items-center justify-center"
                style={{
                  width: "69px",
                  height: "30px",
                  borderRadius: "40px",
                  backgroundColor: "#F0F0FF",
                }}
              >
                <span
                  style={{
                    fontFamily: "Pretendard",
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "1",
                    color: "#8C86FF",
                  }}
                >
                  인증완료
                </span>
              </span>
            )}
          </div>

          {/* 학교/학번 정보 */}
          <span
            className="text-[14px] text-[#1A1A1A]"
            style={{ fontFamily: "Pretendard", fontWeight: 400, lineHeight: "1.2" }}
          >
            {user.universityInfo}
          </span>
          <span
            className="text-[14px] text-[#1A1A1A]"
            style={{ fontFamily: "Pretendard", fontWeight: 400, lineHeight: "1.2" }}
          >
            {user.departmentInfo}
          </span>
        </div>
      </div>

      {/* 캐릭터 꾸미기 카드 (370x180, radius 40, 그라데이션) */}
      <div className="px-4 mb-4 flex justify-center">
        <div
          className="flex flex-col items-center px-5"
          style={{
            width: "370px",
            height: "180px",
            borderRadius: "40px",
            background: "linear-gradient(180deg, rgba(153, 150, 255, 0.2) 0%, rgba(228, 228, 255, 0.2) 100%)",
            paddingTop: "16px",
          }}
        >
          <div className="w-full flex justify-between items-center mb-1">
            <span
              style={{
                width: "45px",
                height: "19px",
                fontFamily: "Pretendard",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "1.2",
                color: "#1A1A1A",
                marginTop: "8px",
                marginLeft: "12px",
              }}
            >
              {user.nickname}
            </span>
            <button
              onClick={() => navigate("/mypage/noonsong")}
              className="text-[15px] text-[#8E8E93] flex items-center gap-0.5"
              style={{ width: "80px", marginTop: "8px" }}
            >
              꾸미기
              <ChevronRight size={22} strokeWidth={3} className="flex-shrink-0" style={{ width: "22px", height: "22px" }} />
            </button>
          </div>
          <div className="w-[150px] h-[120px] my-1 flex items-center justify-center">
            <div className="text-6xl">👻</div>
          </div>
        </div>
      </div>

      {/* 포인트 카드 (370x59, radius 40) */}
      <div className="px-4 mb-4 flex justify-center">
        <div
          className="flex items-center justify-between px-5"
          style={{
            width: "370px",
            height: "59px",
            borderRadius: "40px",
            backgroundColor: "#F2F0FF",
          }}
        >
          {/* 좌측: 아이콘 + 포인트 글자 */}
          <div className="flex items-center gap-2.5">
            <svg width="28" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.5 6C2.5 3.79 6.75 2 12 2C17.25 2 21.5 3.79 21.5 6V8.5C21.5 10.71 17.25 12.5 12 12.5C6.75 12.5 2.5 10.71 2.5 8.5V6Z"
                fill="#9996FF"
              />
              <path
                d="M2.5 10.8C2.5 12.6 6.75 14.2 12 14.2C17.25 14.2 21.5 12.6 21.5 10.8V13.2C21.5 15.4 17.25 17 12 17C6.75 17 2.5 15.4 2.5 13.2V10.8Z"
                fill="#9996FF"
              />
              <path
                d="M2.5 15.3C2.5 17.1 6.75 18.7 12 18.7C17.25 18.7 21.5 17.1 21.5 15.3V17.7C21.5 19.9 17.25 21.5 12 21.5C6.75 21.5 2.5 19.9 2.5 17.7V15.3Z"
                fill="#9996FF"
              />
            </svg>
            <span
              style={{
                fontFamily: "Pretendard",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "1",
                color: "#1A1A1A",
              }}
            >
              포인트
            </span>
          </div>

          {/* 우측: 포인트 금액 + 충전 버튼 */}
          <div className="flex items-center gap-3">
            <span
              className="text-[16px] text-[#1A1A1A]"
              style={{ fontFamily: "Pretendard", fontWeight: 800 }}
            >
              {user.points} p
            </span>
            <button
              onClick={() => navigate("/mypage/store")}
              className="bg-[#9996FF] text-white text-[13px] font-medium px-4 py-1.5 rounded-full"
            >
              충전
            </button>
          </div>
        </div>
      </div>

      {/* 내 대여 기록 카드 (370x58, radius 40, border 1px solid #CCCCCC) */}
      <div className="px-4 mb-6 flex justify-center">
        <div
          className="flex items-center justify-between px-6 bg-white"
          style={{
            width: "370px",
            height: "58px",
            borderRadius: "40px",
            border: "1px solid #CCCCCC",
          }}
        >
          {/* 좌측: 내 대여 기록 + 화살표 */}
          <button
            onClick={() => navigate("/mypage/my-posts")}
            className="flex items-center gap-1"
          >
            <span
              style={{
                fontFamily: "Pretendard",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "100%",
                color: "#1A1A1A",
              }}
            >
              내가 작성한 게시글
            </span>
            <ChevronRight
              size={26}
              strokeWidth={2.5}
              style={{
                color: "#7F7F7F",
                marginLeft: "-2px",
                marginTop: "3px",
              }}
            />
          </button>

          {/* 우측: 새 게시글 작성 */}
          <button
            onClick={() => navigate("/post/create")}
            style={{
              fontFamily: "Pretendard",
              fontWeight: 700,
              fontSize: "14px",
              lineHeight: "100%",
              color: "#9996FF",
            }}
          >
            새 게시글 작성
          </button>
        </div>
      </div>

      {/* 메뉴 리스트 카드 (370x343, radius 40, border 1px solid #CCCCCC) */}
      <div className="px-4 mb-6 flex justify-center">
        <div
          className="flex flex-col justify-between bg-white py-3 px-3"
          style={{
            width: "370px",
            height: "343px",
            borderRadius: "40px",
            border: "1px solid #CCCCCC",
          }}
        >
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-[20px] transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-5">
                <item.icon size={20} strokeWidth={1.5} className="text-[#1A1A1A]" />
                <span
                  style={{
                    fontFamily: "Pretendard",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "100%",
                    color: "#1A1A1A",
                  }}
                >
                  {item.label}
                </span>
              </div>
              <ChevronRight size={18} strokeWidth={1.5} className="text-[#7F7F7F]" />
            </button>
          ))}
        </div>
      </div>

      {/* 로그아웃 버튼 (하단 여백 mb-10 추가) */}
      <div className="px-4 mb-10">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full h-[48px] rounded-[40px] border border-[#9996FF] bg-white flex items-center justify-center gap-2 text-[#9996FF] text-[14px]"
          style={{ fontFamily: "Pretendard", fontWeight: 500 }}
        >
          <LogOut size={18} />
          로그아웃
        </button>
      </div>

      {/* 로그아웃 모달 */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 max-w-[402px] mx-auto">
          <div
            className="bg-white flex flex-col items-center"
            style={{
              width: "350px",
              borderRadius: "40px",
              paddingTop: "24px",
              paddingBottom: "20px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            {/* 느낌표 아이콘 영역 (배경 64x64 유지, 내부 아이콘만 24px로 축소) */}
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: "64px",
                height: "64px",
                backgroundColor: "#FFDBC8",
                borderRadius: "50%",
                marginBottom: "14px",
              }}
            >
              <AlertCircle style={{ width: "24px", height: "24px" }} className="text-[#FF5E00]" strokeWidth={2.2} />
            </div>

            <p
              className="text-[#1A1A1A] text-center"
              style={{ fontFamily: "Pretendard", fontWeight: 700, fontSize: "19px", marginBottom: "20px" }}
            >
              로그아웃 하시겠어요?
            </p>

            {/* 한 줄로 정렬되도록 whitespace-nowrap 및 폰트 12.5px 처리 */}
            <p
              className="text-[#8E8E93] text-center whitespace-nowrap"
              style={{ fontSize: "12.5px", marginBottom: "30px" }}
            >
              로그아웃 후 다시 로그인해야 서비스를 이용할 수 있습니다.
            </p>

            <div className="flex justify-center gap-3 w-full">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 h-[44px] rounded-[40px] border border-[#A0A0A0] bg-white font-semibold text-[14px] text-[#1A1A1A]"
              >
                취소
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 h-[44px] rounded-[40px] bg-[#9996FF] font-semibold text-[14px] text-white"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 하단 네비게이션 */}
      <BottomNav />
    </div>
  )
}