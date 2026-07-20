import { ArrowLeft, ImagePlus, ChevronDown, Calendar, Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function PostCreatePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"post" | "spot">("post")
  const [hasOutlet, setHasOutlet] = useState(false)
  const [hasWindow, setHasWindow] = useState(true)

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto pb-10 vertical-scroll">
      {/* 헤더 */}
      <div className="flex items-center gap-3 px-4 pt-5 pb-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={22} className="text-[#1A1A1A]" />
        </button>
        <span className="text-[17px] font-bold text-[#1A1A1A]">게시글 작성</span>
      </div>

      {/* 게시글 작성 / 빈자리 작성 탭 */}
      <div className="w-full px-4 mb-5 flex justify-center">
        <div className="bg-[#E6E6E6] w-full h-[44px] rounded-[40px] flex items-center justify-between p-[4px]">
          <button
            onClick={() => setActiveTab("post")}
            className={`flex-1 h-[34px] text-sm font-semibold rounded-[40px] transition-colors ${
              activeTab === "post" ? "bg-[#9996FF] text-white shadow-sm" : "text-[#7F7F7F]"
            }`}
          >
            게시글 작성
          </button>
          <button
            onClick={() => setActiveTab("spot")}
            className={`flex-1 h-[34px] text-sm font-semibold rounded-[40px] transition-colors ${
              activeTab === "spot" ? "bg-[#9996FF] text-white shadow-sm" : "text-[#7F7F7F]"
            }`}
          >
            빈자리 작성
          </button>
        </div>
      </div>

      {activeTab === "post" ? (
        <>
          {/* 사진 추가하기 */}
          <div className="px-4 mb-5">
            <button className="w-full h-[220px] bg-[#E6E6E6] rounded-3xl flex flex-col items-center justify-center gap-2">
              <ImagePlus size={48} className="text-[#7F7F7F]" strokeWidth={1.5} />
              <span className="text-sm font-bold text-[#1A1A1A] mt-1">사진 추가하기</span>
              <span className="text-xs text-[#7F7F7F]">최대 10장</span>
            </button>
          </div>

          {/* 카테고리 */}
          <div className="px-4 mb-4">
            <div className="border border-[#E6E6E6] rounded-3xl p-4">
              <p className="text-[13px] font-bold text-[#1A1A1A] mb-3">
                카테고리 <span className="text-[#9996FF]">*</span>
              </p>
              <button className="bg-[#E6E6E6] rounded-[40px] w-[110px] h-[36px] flex items-center justify-center gap-2 text-sm">
                과잠 <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* 제목 */}
          <div className="px-4 mb-4">
            <div className="border border-[#E6E6E6] rounded-3xl p-4">
              <p className="text-[13px] font-bold text-[#1A1A1A] mb-3">
                제목 <span className="text-[#9996FF]">*</span>
              </p>
              <input
                className="bg-[#E6E6E6] rounded-[40px] w-full h-[40px] px-4 text-sm outline-none placeholder:text-[#7F7F7F]"
                placeholder="예 : 컴퓨터 공학과 과잠 빌리고 싶습니다"
              />
            </div>
          </div>

          {/* 설명 */}
          <div className="px-4 mb-4">
            <div className="border border-[#E6E6E6] rounded-3xl p-4">
              <p className="text-[13px] font-bold text-[#1A1A1A] mb-3">
                설명 <span className="text-[#9996FF]">*</span>
              </p>
              <input
                className="bg-[#E6E6E6] rounded-[40px] w-full h-[40px] px-4 text-sm outline-none placeholder:text-[#7F7F7F]"
                placeholder="대여 조건 등을 자세히 설명해주세요"
              />
            </div>
          </div>

          {/* 대여 신청 날짜 및 기간 */}
          <div className="px-4 mb-4">
            <div className="border border-[#E6E6E6] rounded-3xl p-4">
              <p className="text-[13px] font-bold text-[#1A1A1A] mb-3">
                대여 신청 날짜 및 기간 <span className="text-[#9996FF]">*</span>
              </p>
              <div className="flex items-center gap-2">
                <div className="bg-[#E6E6E6] rounded-[40px] flex-1 h-[40px] px-4 flex items-center justify-between">
                  <span className="text-sm text-[#7F7F7F]">연도. 월. 일</span>
                  <Calendar size={16} className="text-[#1A1A1A]" />
                </div>
                <button className="bg-[#E6E6E6] rounded-[40px] w-[110px] h-[40px] flex items-center justify-center gap-1 text-sm text-[#7F7F7F]">
                  대여 기간 <ChevronDown size={16} />
                </button>
              </div>
              <p className="text-[11px] text-[#7F7F7F] mt-3">
                언제부터 언제까지 대여를 원하는지 알려주세요
              </p>
            </div>
          </div>

          {/* 대여 비용 */}
          <div className="px-4 mb-5">
            <div className="border border-[#E6E6E6] rounded-3xl p-4">
              <p className="text-[13px] font-bold text-[#1A1A1A] mb-3">
                대여 비용 <span className="text-[#9996FF]">*</span>
              </p>
              <div className="flex items-center gap-2">
                <input
                  className="bg-[#E6E6E6] rounded-[40px] w-[150px] h-[40px] px-4 text-sm outline-none placeholder:text-[#7F7F7F]"
                  placeholder="예 : 3000"
                />
                <span className="text-sm text-[#1A1A1A]">원</span>
              </div>
              <p className="text-[11px] text-[#7F7F7F] mt-3">
                최대 5,000원 까지 설정 가능합니다 (숫자만 입력)
              </p>
            </div>
          </div>

          {/* 작성 가이드 */}
          <div className="px-4 mb-6">
            <div className="bg-[#EFEFFE] rounded-2xl p-4">
              <p className="text-[13px] font-bold text-[#9996FF] mb-2">작성 가이드</p>
              <ul className="text-[12px] text-[#1A1A1A] space-y-1">
                <li>• 대여 물품을 정확히 설명해주세요</li>
                <li>• 대여 신청 기간을 명확히 해주세요</li>
                <li>• 보증금은 거래 시 채팅으로 협의해주세요</li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 빈자리 카테고리 */}
          <div className="px-4 mb-4">
            <div className="border border-[#E6E6E6] rounded-3xl p-4">
              <p className="text-[13px] font-bold text-[#1A1A1A] mb-3">
                카테고리 <span className="text-[#9996FF]">*</span>
              </p>
              <button className="bg-[#E6E6E6] rounded-[40px] w-[110px] h-[36px] flex items-center justify-center gap-2 text-sm">
                빈자리 <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* 장소 */}
          <div className="px-4 mb-4">
            <div className="border border-[#E6E6E6] rounded-3xl p-4">
              <p className="text-[13px] font-bold text-[#1A1A1A] mb-3">
                장소 <span className="text-[#9996FF]">*</span>
              </p>
              <input
                className="bg-[#E6E6E6] rounded-[40px] w-full h-[40px] px-4 text-sm outline-none placeholder:text-[#7F7F7F]"
                placeholder="예 : 중앙도서관"
              />
            </div>
          </div>

          {/* 층 */}
          <div className="px-4 mb-4">
            <div className="border border-[#E6E6E6] rounded-3xl p-4">
              <p className="text-[13px] font-bold text-[#1A1A1A] mb-3">
                층 <span className="text-[#9996FF]">*</span>
              </p>
              <input
                className="bg-[#E6E6E6] rounded-[40px] w-full h-[40px] px-4 text-sm outline-none placeholder:text-[#7F7F7F]"
                placeholder="예 : 2"
              />
            </div>
          </div>

          {/* 좌석 번호 */}
          <div className="px-4 mb-4">
            <div className="border border-[#E6E6E6] rounded-3xl p-4">
              <p className="text-[13px] font-bold text-[#1A1A1A] mb-3">
                좌석 번호 <span className="text-[#9996FF]">*</span>
              </p>
              <input
                className="bg-[#E6E6E6] rounded-[40px] w-full h-[40px] px-4 text-sm outline-none placeholder:text-[#7F7F7F]"
                placeholder="예 : DICA 28번"
              />
            </div>
          </div>

          {/* 콘센트 여부 */}
          <div className="px-4 mb-4">
            <div className="border border-[#E6E6E6] rounded-3xl p-4">
              <p className="text-[13px] font-bold text-[#1A1A1A] mb-3">
                콘센트 여부 <span className="text-[#9996FF]">*</span>
              </p>
              <button
                onClick={() => setHasOutlet(!hasOutlet)}
                className={`w-11 h-6 rounded-full relative transition-colors ${
                  hasOutlet ? "bg-[#9996FF]" : "bg-[#E6E6E6]"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                    hasOutlet ? "right-0.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 창가자리 여부 */}
          <div className="px-4 mb-4">
            <div className="border border-[#E6E6E6] rounded-3xl p-4">
              <p className="text-[13px] font-bold text-[#1A1A1A] mb-3">
                창가자리 여부 <span className="text-[#9996FF]">*</span>
              </p>
              <button
                onClick={() => setHasWindow(!hasWindow)}
                className={`w-11 h-6 rounded-full relative transition-colors ${
                  hasWindow ? "bg-[#9996FF]" : "bg-[#E6E6E6]"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                    hasWindow ? "right-0.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 퇴실 예정 시간 */}
          <div className="px-4 mb-5">
            <div className="border border-[#E6E6E6] rounded-3xl p-4">
              <p className="text-[13px] font-bold text-[#1A1A1A] mb-3">
                퇴실 예정 시간 <span className="text-[#9996FF]">*</span>
              </p>
              <div className="bg-[#E6E6E6] rounded-[40px] w-full h-[40px] px-4 flex items-center justify-between">
                <span className="text-sm text-[#7F7F7F]">Time</span>
                <Clock size={16} className="text-[#1A1A1A]" />
              </div>
            </div>
          </div>

          {/* 빈자리 작성 가이드 */}
          <div className="px-4 mb-6">
            <div className="bg-[#EFEFFE] rounded-2xl p-4">
              <p className="text-[13px] font-bold text-[#9996FF] mb-2">작성 가이드</p>
              <ul className="text-[12px] text-[#1A1A1A] space-y-1">
                <li>• 자리 양도는 가격 설정 및 영리 거래가 절대 불가합니다.</li>
                <li>• 퇴실 시간은 실 퇴실시간으로 부터 5분 이내로 설정해주세요.</li>
                <li>• 양도자에게는 자리 양도 한정 아이템이 지급됩니다.</li>
              </ul>
            </div>
          </div>
        </>
      )}

      {/* 등록하기 버튼 (공통) */}
      <div className="px-4 mb-6">
        <button className="w-full h-[48px] bg-[#9996FF] text-white text-sm font-bold rounded-[40px]">
          등록하기
        </button>
      </div>
    </div>
  )
}