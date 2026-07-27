import { Clock, Check, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function TradeHistoryPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"all" | "lent">("lent")
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [selectedTradeId, setSelectedTradeId] = useState<number | null>(null)

  type Trade = {
    id: number
    isSpot?: boolean
    status: string
    category: string
    role: string
    title: string
    counterpart: string
    price: string
    startDate: string | null
    endDate: string | null
    showCompleteButton?: boolean
    showReviewButton?: boolean
  }

  const [trades, setTrades] = useState<Trade[]>([
    {
      id: 1,
      status: "대여중",
      category: "과잠",
      role: "빌려줌",
      title: "컴퓨터 공학과 과잠 대여하고 싶어요",
      counterpart: "코딩왕",
      price: "5,000원 / 일",
      startDate: "2026. 4. 8",
      endDate: null,
      showCompleteButton: true,
    },
    {
      id: 2,
      status: "반납완료",
      category: "전공서적",
      role: "빌림",
      title: "데이터구조 전공서적 빌릴 수 있을까요",
      counterpart: "책벌레 99",
      price: "5,000원 / 일",
      startDate: "2026. 4. 8",
      endDate: "2026. 4. 8",
      showReviewButton: true,
    },
    {
      id: 3,
      status: "양도완료",
      category: "빈자리",
      role: "",
      title: "중앙도서관 2층 DICA 8번 좌석",
      counterpart: "김도비",
      price: "빈자리 양도",
      startDate: null,
      endDate: "2026. 04. 20",
      isSpot: true,
      showReviewButton: true,
    },
  ])

  const filteredTrades =
    activeTab === "all" ? trades : trades.filter((t) => t.role === "빌려줌" || t.isSpot)

  const statusColor = (status: string) => {
    switch (status) {
      case "대여중":
        return { backgroundColor: "#FFF3CD", color: "#8A6D00" }
      case "반납완료":
      case "양도완료":
        return { backgroundColor: "#E9F5EE", color: "#1A1A1A" }
      case "취소됨":
        return { backgroundColor: "#FFE1E1", color: "#C93333" }
      default:
        return { backgroundColor: "#E9F5EE", color: "#1A1A1A" }
    }
  }

  const statusIcon = (status: string) => {
    if (status === "대여중") return <Clock size={15} className="text-[#8A6D00]" />
    return <Check size={15} className="text-[#1A1A1A]" />
  }

  const handleCompleteClick = (id: number) => {
    setSelectedTradeId(id)
    setShowCompleteModal(true)
  }

  const handleConfirmComplete = () => {
    setTrades((prev) =>
      prev.map((t) =>
        t.id === selectedTradeId
          ? { ...t, status: "반납완료", showCompleteButton: false, showReviewButton: true }
          : t
      )
    )
    setShowCompleteModal(false)
  }

  return (
    <div className="w-full h-full relative bg-white flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto overflow-x-hidden vertical-scroll">
        <div className="w-[402px] flex flex-col bg-white pb-10">
          {/* 상단 고정 헤더 (402x80, 스크롤해도 고정) */}
          <div className="sticky top-0 bg-white z-30 w-full" style={{ height: "80px" }}>
            <button onClick={() => navigate(-1)} style={{ position: "absolute", top: "35px", left: "30px" }}>
              <ArrowLeft size={20} strokeWidth={2} className="text-black" />
            </button>
            <span
              style={{
                position: "absolute",
                top: "35px",
                left: "60px",
                fontFamily: "Pretendard",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "1.2",
                color: "#1A1A1A",
              }}
            >
              거래 내역
            </span>
          </div>

          {/* 탭바 (359x44, radius 40, 배경 #E6E6E6) */}
          <div className="w-full flex justify-center mb-6" style={{ marginTop: "8px" }}>
            <div
              className="relative"
              style={{
                width: "359px",
                height: "44px",
                borderRadius: "40px",
                backgroundColor: "#E6E6E6",
              }}
            >
              <button
                onClick={() => setActiveTab("all")}
                className="absolute flex items-center justify-center"
                style={{
                  top: "5px",
                  left: "10px",
                  width: "172px",
                  height: "34px",
                  fontFamily: "Pretendard",
                  fontWeight: activeTab === "all" ? 700 : 400,
                  fontSize: "14px",
                  lineHeight: "1.2",
                  color: activeTab === "all" ? "#FFFFFF" : "#1A1A1A",
                  borderRadius: "40px",
                  backgroundColor: activeTab === "all" ? "#9996FF" : "transparent",
                }}
              >
                전체
              </button>
              <button
                onClick={() => setActiveTab("lent")}
                className="absolute flex items-center justify-center"
                style={{
                  top: "5px",
                  right: "10px",
                  width: "172px",
                  height: "34px",
                  fontFamily: "Pretendard",
                  fontWeight: activeTab === "lent" ? 700 : 400,
                  fontSize: "14px",
                  lineHeight: "1.2",
                  color: activeTab === "lent" ? "#FFFFFF" : "#1A1A1A",
                  borderRadius: "40px",
                  backgroundColor: activeTab === "lent" ? "#9996FF" : "transparent",
                }}
              >
                대여 제공 목록
              </button>
            </div>
          </div>

          {/* 거래 목록 */}
          <div className="flex flex-col gap-4 px-4">
            {filteredTrades.map((trade) => {
              const colors = statusColor(trade.status)
              return (
                <div
                  key={trade.id}
                  className="relative mx-auto"
                  style={{
                    width: "370px",
                    minHeight: "194px",
                    borderRadius: "40px",
                    border: "1px solid #CCCCCC",
                    padding: "24px 28px",
                  }}
                >
                  {/* 상단: 상태 아이콘 + 뱃지들 + 가격 */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      {statusIcon(trade.status)}
                      <span
                        className="flex items-center justify-center px-2.5 whitespace-nowrap"
                        style={{
                          height: "29px",
                          borderRadius: "40px",
                          fontFamily: "Pretendard",
                          fontWeight: 400,
                          fontSize: "12px",
                          ...colors,
                        }}
                      >
                        {trade.status}
                      </span>
                      <span
                        className="flex items-center justify-center px-2.5 whitespace-nowrap"
                        style={{
                          height: "29px",
                          borderRadius: "40px",
                          backgroundColor: "#E4E4FF",
                          color: "#1A1A1A",
                          fontFamily: "Pretendard",
                          fontWeight: 400,
                          fontSize: "12px",
                        }}
                      >
                        {trade.category}
                      </span>
                      {trade.role && (
                        <span
                          className="flex items-center justify-center px-2.5 whitespace-nowrap"
                          style={{
                            height: "29px",
                            borderRadius: "40px",
                            backgroundColor: "#F0F0FF",
                            color: "#1A1A1A",
                            fontFamily: "Pretendard",
                            fontWeight: 400,
                            fontSize: "12px",
                          }}
                        >
                          {trade.role}
                        </span>
                      )}
                    </div>
                    <span
                      className="whitespace-nowrap"
                      style={{
                        fontFamily: "Pretendard",
                        fontWeight: 700,
                        fontSize: "14px",
                        color: "#1A1A1A",
                      }}
                    >
                      {trade.price}
                    </span>
                  </div>

                  {/* 제목 */}
                  <p
                    className="mb-2 overflow-hidden text-ellipsis whitespace-nowrap"
                    style={{
                      fontFamily: "Pretendard",
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "#1A1A1A",
                    }}
                  >
                    {trade.title}
                  </p>

                  {/* 대여자/양도자 */}
                  <p
                    className="mb-3"
                    style={{
                      fontFamily: "Pretendard",
                      fontWeight: 400,
                      fontSize: "13px",
                      color: "#4A4A4A",
                    }}
                  >
                    {trade.isSpot ? "양도자" : "대여자"} : {trade.counterpart}
                  </p>

                  {/* 하단: 날짜 + 버튼 */}
                  <div className="flex items-end justify-between">
                    <div
                      style={{
                        fontFamily: "Pretendard",
                        fontWeight: 400,
                        fontSize: "12px",
                        color: "#7F7F7F",
                        lineHeight: "1.5",
                      }}
                    >
                      {trade.startDate && <p>대여 시작 : {trade.startDate}</p>}
                      {trade.endDate && (
                        <p>{trade.isSpot ? "양도 완료일" : "반납 완료"} : {trade.endDate}</p>
                      )}
                    </div>

                    {trade.showCompleteButton && (
                      <button
                        onClick={() => handleCompleteClick(trade.id)}
                        className="flex items-center justify-center"
                        style={{
                          width: "94px",
                          height: "34px",
                          borderRadius: "40px",
                          border: "1px solid #9996FF",
                          color: "#9996FF",
                          fontFamily: "Pretendard",
                          fontWeight: 600,
                          fontSize: "13px",
                        }}
                      >
                        거래 완료
                      </button>
                    )}
                    {trade.showReviewButton && (
                      <button
                        onClick={() => navigate(`/mypage/review/create/${trade.id}`)}
                        className="flex items-center justify-center"
                        style={{
                          width: "94px",
                          height: "34px",
                          borderRadius: "40px",
                          border: "1px solid #9996FF",
                          color: "#9996FF",
                          fontFamily: "Pretendard",
                          fontWeight: 600,
                          fontSize: "13px",
                        }}
                      >
                        후기 보내기
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 거래 완료 확인 모달 */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 max-w-[402px] mx-auto">
          <div
            className="bg-white flex flex-col items-center"
            style={{
              width: "334px",
              borderRadius: "40px",
              paddingTop: "32px",
              paddingBottom: "24px",
              paddingLeft: "24px",
              paddingRight: "24px",
            }}
          >
            <p
              className="text-center"
              style={{ fontFamily: "Pretendard", fontWeight: 700, fontSize: "18px", color: "#1A1A1A", marginBottom: "12px" }}
            >
              거래를 완료하시겠어요?
            </p>
            <p
              className="text-center"
              style={{ fontFamily: "Pretendard", fontWeight: 400, fontSize: "13px", color: "#7F7F7F", lineHeight: "1.5", marginBottom: "28px" }}
            >
              상대방도 거래 완료를 확인해야 최종 완료됩니다.
              <br />
              완료 후 후기를 남겨주세요.
            </p>
            <div className="flex justify-center gap-3 w-full">
              <button
                onClick={() => setShowCompleteModal(false)}
                className="flex-1"
                style={{ height: "44px", borderRadius: "40px", border: "1px solid #E6E6E6", fontFamily: "Pretendard", fontWeight: 600, fontSize: "14px", color: "#1A1A1A" }}
              >
                취소
              </button>
              <button
                onClick={handleConfirmComplete}
                className="flex-1 text-white"
                style={{ height: "44px", borderRadius: "40px", backgroundColor: "#9996FF", fontFamily: "Pretendard", fontWeight: 600, fontSize: "14px" }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}