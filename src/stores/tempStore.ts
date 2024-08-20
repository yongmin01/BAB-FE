export interface MarkerStoreInfo {
  storeId: number // 가게 ID
  storeName: string
  latitude: number | null | undefined // 경도
  longitude: number | null | undefined // 위도
  menuPrice: number
  discountPrice: number
}

export const stores: MarkerStoreInfo[] = []
