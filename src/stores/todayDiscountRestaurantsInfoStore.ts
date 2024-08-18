import { create } from 'zustand'

interface MenuData {
  menuName: string
  discountPrice: number
  price: number
}

interface DiscountData {
  discountId: number
  storeId: number
  storeName: string
  discountTitle: string
  getOnSaleStoreMenuDataDtoList: MenuData[]
}

interface TodayDiscountStoreState {
  discounts: DiscountData[]
  setDiscounts: (discounts: DiscountData[]) => void
}

export const useTodayDiscountStore = create<TodayDiscountStoreState>((set) => ({
  discounts: [],
  setDiscounts: (discounts) => set({ discounts }),
}))
