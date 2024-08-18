import axios from 'axios'
import { useTodayDiscountStore } from '@stores/todayDiscountRestaurantsInfoStore'
const token = import.meta.env.VITE_KAKAO_LOGIN_TEST_TOKEN
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getTodayDiscountRestaurants = async () => {
  const setDiscounts = useTodayDiscountStore.getState().setDiscounts
  try {
    const response = await axios.get(`${API_BASE_URL}/v1/stores/discounts`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (response.data.isSuccess == true) {
      const discountData = response.data.result.getOnSaleStoreDataDtoList
      setDiscounts(discountData)
      return discountData
    } else {
      console.log('할인 식당 정보를 가져올 수 없습니다.', response.data.message)
    }
  } catch (error) {
    console.log('할인 식당 정보를 가져올 수 없습니다.', error)
  }
}
