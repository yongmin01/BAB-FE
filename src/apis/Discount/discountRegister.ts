import axios from 'axios'
import discountEventStore from '@stores/discountEventStore'
import storeInfoStore from '@stores/storeInfoStore'

const API_BASE_URL = 'http://43.201.218.182:8080'

export async function handleDiscountRegister() {
  const { currentEvent } = discountEventStore.getState()
  const { storeInfos } = storeInfoStore.getState()

  // API 요청에 사용할 데이터 준비
  const eventData = {
    discountMenuDataDtoList: currentEvent.discounts.map((discount) => ({
      menuId: discount.id,
      discountPrice: discount.discountPrice,
    })),
    title: currentEvent.eventMessage,
    startDate: currentEvent.startDate,
    endDate: currentEvent.endDate,
  }

  try {
    // 실제 API 호출
    const response = await axios.post(
      `${API_BASE_URL}/v1/stores/${storeInfos[0].id}/menus/discounts`,
      eventData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    console.log('할인 이벤트가 성공적으로 생성되었습니다:')
    return response.data.result.discountId
  } catch (error) {
    console.error('할인 이벤트 생성 중 오류가 발생했습니다:', error)
  }
}
