import axios from 'axios'
import discountEventStore, { DiscountEvent } from '@stores/discountEventStore'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
//미리 작성해둔 진행했던 할인 행사 페이지 api 로직
export const fetchDiscountEvents = async (storeId: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/v1/stores/${storeId}/discounts`,
    )
    console.log(response.data)
    if (response.data.isSuccess) {
      const fetchedDiscountEvents: DiscountEvent[] =
        response.data.result.getDiscountDataDtoList.map(
          (item: DiscountEvent) => ({
            discountId: item.discountId,
            storeName: item.storeName,
            startDate: item.startDate,
            endDate: item.endDate,
            discountTitle: item.discountTitle,
            //discounts: [],  // 필요에 따라 실제 할인 항목을 여기에 추가
          }),
        )

      return fetchedDiscountEvents
    } else {
      console.error('Failed to fetch discount events:', response.data.message)
    }
  } catch (error) {
    console.error('Error fetching discount events:', error)
  }
}
