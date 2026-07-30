import type { StoreAsset } from "../types/assets";

export const mockAssets: StoreAsset[] = [
    { itemId: 1, itemName: "후드티", itemCategory: "CLOTHING", itemPrice: 500, owned:false },
    { itemId: 2, itemName: "정장", itemCategory: "CLOTHING", itemPrice: 500, owned:false },
    { itemId: 3, itemName: "프린세스 송이", itemCategory: "CLOTHING", itemPrice: 1000, owned:false },
    { itemId: 4, itemName: "정장 송이", itemCategory: "CLOTHING", itemPrice: 1500, owned:false },
    { itemId: 5, itemName: "헤드셋", itemCategory: "ACCESSORY", itemPrice: 500, owned:false },
    { itemId: 6, itemName: "모자", itemCategory: "ACCESSORY", itemPrice: 300, owned:false },
    { itemId: 7, itemName: "안경", itemCategory: "ACCESSORY", itemPrice: 300, owned:false },
    { itemId: 8, itemName: "가방", itemCategory: "ACCESSORY", itemPrice: 300, owned:false },
    { itemId: 9, itemName: "마스크", itemCategory: "ETC", itemPrice: 200, owned:false },
    { itemId: 10, itemName: "커피", itemCategory: "ETC", itemPrice: 500, owned:false },
];