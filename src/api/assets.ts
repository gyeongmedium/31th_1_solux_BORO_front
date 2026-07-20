import api from "../lib/axios";
import type { AssetItem, PurchaseAssetResponse } from '../types/assets';

/* 1. 상점 상품 목록 조회 */
export const getStoreAssets = async (): Promise<AssetItem[]> => {
    const response = await api.get<AssetItem[]>('/api/v1/assets');
    return response.data;
};

/* 2. 상품 구매 */
export const purchaseAsset = async (assetId: number): Promise<PurchaseAssetResponse> => {
    const response = await api.post<PurchaseAssetResponse>(`/api/v1/assets/${assetId}`);
    return response.data;
};