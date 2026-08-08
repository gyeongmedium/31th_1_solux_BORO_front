import { Clock, Check, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getMemberRentals } from "../../api/member"
import { getChatRooms } from "../../api/chat"
import { categoryLabel, priceUnitLabel } from "../../utils/postMapper"
import type { TradeHistoryItem } from "../../types/tradeHistory"
import type { PostCategory, RentalPriceUnit } from "../../types/post"
import type { ChatRoomPreview } from "../../types/chat"

export default function TradeHistoryPage() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<"all" | "lent">("all")
    const [trades, setTrades] = useState<TradeHistoryItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // 채팅 목록 상태
    const [tradeRooms, setTradeRooms] = useState<ChatRoomPreview[]>([])
    const [spotRooms, setSpotRooms] = useState<ChatRoomPreview[]>([])

    useEffect(() => {
        const fetchTrades = async () => {
            setIsLoading(true)
            try {
                const [res, tradeRes, spotRes] = await Promise.all([
                    getMemberRentals(activeTab === "all" ? "ALL" : "PROVIDED"),
                    getChatRooms("ITEM"),
                    getChatRooms("EMPTY_SPOT"),
                ])
                console.log("거래내역 전체 응답:", res.data.result)

                const completedOnly = res.data.result.filter((trade) => trade.postStatus === "COMPLETED")
                setTrades(completedOnly)

                if (tradeRes.isSuccess && tradeRes.result?.chatRoomList) {
                    setTradeRooms(tradeRes.result.chatRoomList)
                }
                if (spotRes.isSuccess && spotRes.result?.chatRoomList) {
                    setSpotRooms(spotRes.result.chatRoomList)
                }
            } catch (err) {
                console.error("거래내역 조회 실패:", err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchTrades()
    }, [activeTab])

    const isSpot = (item: TradeHistoryItem) => !!item.location

    const statusColor = (status: string, spot: boolean) => {
        if (spot && status === "COMPLETED") {
            return { backgroundColor: "#FFD4BB", color: "#000000" }
        }
        return { backgroundColor: "#E4E4FF", color: "#000000" }
    }

    const statusIcon = (status: string) => {
        if (status === "ACTIVE" || status === "RENTED") return <Clock size={15} className="text-[#8A6D00]" />
        return <Check size={15} className="text-[#1A1A1A]" />
    }

    const statusText = (status: string, spot: boolean) => {
        if (status === "ACTIVE" || status === "RENTED") return "대여중"
        if (spot) return "양도완료"
        return "반납완료"
    }

    // 채팅목록에서 상대방 닉네임 가져오기 헬퍼 함수
    const getTargetChatName = (
        trade: TradeHistoryItem,
        tradeRoomsList: ChatRoomPreview[],
        spotRoomsList: ChatRoomPreview[]
    ): string => {
        const spot = isSpot(trade)

        // 1. chatRoomId가 존재할 경우 ID 매칭
        if ((trade as any).chatRoomId) {
            const matchedRoom = [...tradeRoomsList, ...spotRoomsList].find(
                (room) => room.chatRoomId === (trade as any).chatRoomId
            )
            if (matchedRoom?.chatName) return matchedRoom.chatName
        }

        // 2. 장소/제목으로 매칭
        if (spot) {
            const matchedSpot = spotRoomsList.find(
                (spotRoom) => spotRoom.location && trade.location && spotRoom.location === trade.location
            )
            return matchedSpot?.chatName || trade.postMemberNickname || "거래상대"
        } else {
            const matchedTrade = tradeRoomsList.find(
                (tradeRoom) => tradeRoom.postTitle && trade.postTitle && tradeRoom.postTitle === trade.postTitle
            )
            return matchedTrade?.chatName || trade.postMemberNickname || "거래상대"
        }
    }

    return (
        <div className="w-full h-full relative bg-white flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto overflow-x-hidden vertical-scroll">
                <div className="w-[402px] flex flex-col bg-white pb-10">
                    {/* 상단 고정 헤더 */}
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

                    {/* 탭바 */}
                    <div className="w-full flex justify-center mb-6" style={{ marginTop: "8px" }}>
                        <div
                            className="relative"
                            style={{ width: "359px", height: "44px", borderRadius: "40px", backgroundColor: "#E6E6E6" }}
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
                        {isLoading ? (
                            <p className="text-center text-sm text-[#7F7F7F] py-10">불러오는 중...</p>
                        ) : trades.length === 0 ? (
                            <p className="text-center text-sm text-[#7F7F7F] py-10">거래 내역이 없어요</p>
                        ) : (
                            trades.map((trade) => {
                                const spot = isSpot(trade)
                                const colors = statusColor(trade.postStatus, spot)
                                const partnerName = getTargetChatName(trade, tradeRooms, spotRooms)
                                console.log("전체 데이터:", trade)
                                return (
                                    <div
                                        key={trade.rentalRequestId}
                                        onClick={() => (spot ? navigate(`/post/spot/${trade.postId}`) : navigate(`/post/${trade.postId}`))}
                                        className="relative mx-auto cursor-pointer"
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
                                                {statusIcon(trade.postStatus)}
                                                <span
                                                    className="flex items-center justify-center px-2.5 whitespace-nowrap"
                                                    style={{
                                                        height: "29px",
                                                        borderRadius: "40px",
                                                        backgroundColor: "#E4E4FF",
                                                        color: "#000000",
                                                        fontFamily: "Pretendard",
                                                        fontWeight: 400,
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    {statusText(trade.postStatus, spot)}
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
                                                    {spot ? "빈자리" : categoryLabel[trade.postCategory as PostCategory]}
                                                </span>
                                            </div>
                                            <span
                                                className="whitespace-nowrap"
                                                style={{ fontFamily: "Pretendard", fontWeight: 700, fontSize: "14px", color: "#1A1A1A" }}
                                            >
                                                {spot
                                                    ? "빈자리 양도"
                                                    : `${trade.price.toLocaleString()}원 / ${priceUnitLabel[trade.priceUnit as RentalPriceUnit]}`}
                                            </span>
                                        </div>

                                        {/* 제목 */}
                                        <p
                                            className="mb-2 px-5 overflow-hidden text-ellipsis whitespace-nowrap"
                                            style={{ fontFamily: "Pretendard", fontWeight: 700, fontSize: "16px", color: "#1A1A1A" }}
                                        >
                                            {spot ? `${trade.location} ${trade.floor}층 ${trade.seatNumber}번` : trade.postTitle}
                                        </p>

                                        {/* 상대방 닉네임 */}
                                        <p
                                            className="mb-3 px-5"
                                            style={{ fontFamily: "Pretendard", fontWeight: 400, fontSize: "12px", color: "#1A1A1A" }}
                                        >
                                            {spot ? "거래상대" : "거래상대"} : {partnerName}
                                        </p>

                                        {/* 하단: 날짜 + 후기 보내기 버튼 */}
                                        <div className="flex items-end justify-between">
                                            <div
                                                style={{
                                                    fontFamily: "Pretendard",
                                                    fontWeight: 400,
                                                    fontSize: "12px",
                                                    color: "#1A1A1A",
                                                    lineHeight: "1.5",
                                                }}
                                            >
                                                {spot ? (
                                                    <p style={{ marginLeft: "20px" }}>양도 완료일 : {trade.rentalEndTime}</p>
                                                ) : (
                                                    <>
                                                        <p style={{ marginLeft: "20px" }}>대여 시작 : {trade.rentalStartTime}</p>
                                                        <p style={{ marginLeft: "20px" }}>반납 완료 : {trade.rentalEndTime}</p>
                                                    </>
                                                )}
                                            </div>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    // 대여 요청 ID (API 경로 및 URL 파라미터로 사용)
                                                    const targetRentalRequestId = trade.rentalRequestId;

                                                    // 양도 완료(빈자리) 및 일반 대여 상품의 제목 처리
                                                    const displayTitle = spot 
                                                        ? `${trade.location} ${trade.floor}층 ${trade.seatNumber}번` 
                                                        : trade.postTitle;

                                                    navigate(`/mypage/review-create/${targetRentalRequestId}`, {
                                                        state: {
                                                            rentalId: targetRentalRequestId,
                                                            partnerName: partnerName,
                                                            title: displayTitle,
                                                        },
                                                    });
                                                }}
                                                className="flex items-center justify-center"
                                                style={{
                                                    width: "142px",
                                                    height: "34px",
                                                    borderRadius: "40px",
                                                    border: "1px solid #7F7F7F",
                                                    color: "#000000",
                                                    fontFamily: "Pretendard",
                                                    fontWeight: 400,
                                                    fontSize: "12px",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                후기 보내기
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}