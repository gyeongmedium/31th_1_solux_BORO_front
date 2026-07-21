
// 포인트 이력 아이템 타입
export interface PointHistoryItem {
    pointDescription: string;
    point: number;
    createdAt: string;
}

// API 공통 응답 타입
export interface PointHistoryResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: PointHistoryItem[];
}

// 아이템 카테고리 타입
import type { AssetCategory } from "./assets";

// 보유 캐릭터 아이템 정보 타입
export interface CharacterItem {
    itemId: number;
    itemName: string;
    itemCategory: AssetCategory; // 'CLOTHES' | 'ACCESSORY' | 'ETC'
    equipped: boolean;           // 보유 여부
}

// GET /api/v1/members/assets 응답 규격
export interface MemberAssetsResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: CharacterItem[];
}