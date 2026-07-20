import { ArrowLeft, Camera, User, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function ProfileEditPage() {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState("홍길동")
  const [phone, setPhone] = useState("010 - 1234 - 5678")
  const [intro, setIntro] = useState("안녕하세요! 성실하게 거래합니다.")
  const [showCancelModal, setShowCancelModal] = useState(false)

  const school = "숙명여자대학교"
  const studentId = "2611111"

  const handleBack = () => {
    setShowCancelModal(true)
  }

  const handleSave = () => {
    // 실제로는 여기서 API 호출
    navigate(-1)
  }

  return (
    <div className="relative flex flex-col bg-white pb-10">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 pt-5 pb-4">
        <button onClick={handleBack}>
          <ArrowLeft size={22} className="text-[#1A1A1A]" />
        </button>
        <span className="text-[17px] font-bold text-[#1A1A1A]">프로필 수정</span>
        <button
          onClick={handleSave}
          className="bg-[#9996FF] text-white text-[13px] font-semibold px-4 py-2 rounded-full"
        >
          저장
        </button>
      </div>

      {/* 프로필 사진 영역 */}
      <div className="mx-4 mb-5 bg-[#E6E6E6] rounded-3xl py-8 flex flex-col items-center gap-3">
        <div className="w-20 h-20 bg-[#B3B3B3] rounded-full flex items-center justify-center">
          <User size={36} className="text-white" />
        </div>
        <button className="bg-[#9996FF] w-9 h-9 rounded-full flex items-center justify-center">
          <Camera size={16} className="text-white" />
        </button>
        <span className="text-[13px] text-[#7F7F7F]">프로필 사진 변경</span>
      </div>

      {/* 입력 폼 카드 */}
      <div className="mx-4 border border-[#E6E6E6] rounded-3xl px-5 py-5">
        {/* 닉네임 */}
        <div className="mb-4">
          <p className="text-[14px] font-bold text-[#1A1A1A] mb-2">닉네임</p>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full bg-[#F5F5F5] rounded-2xl px-4 py-3 text-[14px] outline-none"
          />
        </div>

        {/* 전화번호 */}
        <div className="mb-4">
          <p className="text-[14px] font-bold text-[#1A1A1A] mb-2">전화번호</p>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-[#F5F5F5] rounded-2xl px-4 py-3 text-[14px] outline-none"
          />
        </div>

        {/* 자기소개 */}
        <div className="mb-1">
          <p className="text-[14px] font-bold text-[#1A1A1A] mb-2">자기소개</p>
          <textarea
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            maxLength={200}
            rows={2}
            className="w-full bg-[#F5F5F5] rounded-2xl px-4 py-3 text-[14px] outline-none resize-none"
            placeholder="안녕하세요! 성실하게 거래합니다."
          />
        </div>
        <p className="text-[12px] text-[#B3B3B3] text-right mb-4">{intro.length}/200</p>

        {/* 구분선 */}
        <div className="border-t border-[#E6E6E6] pt-4 mb-4">
          <p className="text-[13px] text-[#7F7F7F] mb-1">대학교</p>
          <p className="text-[15px] font-bold text-[#1A1A1A] mb-1">{school}</p>
          <p className="text-[12px] text-[#B3B3B3]">학교 정보는 변경할 수 없습니다</p>
        </div>

        <div>
          <p className="text-[13px] text-[#7F7F7F] mb-1">학번</p>
          <p className="text-[15px] font-bold text-[#1A1A1A] mb-1">{studentId}</p>
          <p className="text-[12px] text-[#B3B3B3]">학번 정보는 변경할 수 없습니다</p>
        </div>
      </div>

      {/* 취소 확인 모달 */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 max-w-[440px] mx-auto">
          <div className="bg-white rounded-3xl mx-8 px-6 py-8 flex flex-col items-center">
            <div className="w-14 h-14 bg-[#FFE8D6] rounded-full flex items-center justify-center mb-4">
              <AlertCircle size={28} className="text-orange-400" />
            </div>
            <p className="text-[17px] font-bold text-[#1A1A1A] mb-2 text-center">
              프로필 수정을 취소하시겠어요?
            </p>
            <p className="text-[13px] text-[#7F7F7F] mb-6 text-center">
              변경사항이 저장되지 않습니다.
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 h-[44px] border border-[#E6E6E6] rounded-full text-[14px] font-semibold text-[#1A1A1A]"
              >
                계속 수정
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex-1 h-[44px] bg-[#9996FF] rounded-full text-[14px] font-semibold text-white"
              >
                취소하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}