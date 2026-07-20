export type AssetCategory = 'CLOTHES' | 'ACCESSORY' | 'ETC';

// 상점 상품 조회 Response
export interface AssetItem {
    itemId: number;             // 명세서엔 없지만 프론트엔드 컴포넌트 key나 구매 API 호출(assetId)에 필요하므로 추가
    itemName: string;
    itemCategory: AssetCategory;
    itemPrice: number;
}

// 상품 구매 Response
    export interface PurchaseAssetResponse {
    assetId: number;
}