import axios, { AxiosError } from 'axios'
import discountEventStore from '@stores/discountEventStore'
import storeInfoStore from '@stores/storeInfoStore'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function handleDiscountEventRegister() {
  const { currentEvent } = discountEventStore.getState()
  const { storeInfos } = storeInfoStore.getState()

  // API 요청에 사용할 데이터 준비
  const eventData = {
    discountMenuDataDtoList: currentEvent.discounts
      .filter((discount) => discount.isChecked && discount.discountPrice > 0) // 체크된 항목만 필터링
      .map((discount) => ({
        menuId: discount.menuId,
        discountPrice: discount.discountPrice,
      })),
    title: currentEvent.discountTitle,
    startDate: currentEvent.startDate,
    endDate: currentEvent.endDate,
  }

  try {
    // 실제 API 호출
    const response = await axios.post(
      //솔미님 쪽에서 가게 등록되고 스토어에서 현재 사장님의 가게 id 가져와서 여기로 가져올 것 - 현재는 임의로
      `${API_BASE_URL}/v1/stores/${storeInfos[0].id}/menus/discounts`,
      eventData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    console.log('전체 응답 데이터:', response.data)
    console.log(
      '할인 이벤트가 성공적으로 생성되었습니다:',
      response.data.result,
    )

    return response.data
  } catch (error) {
    console.error('할인 이벤트 생성 중 오류가 발생했습니다:', error)

    if (error instanceof AxiosError && error.response) {
      return error.response.data // 에러 응답 데이터를 반환
    }

    return null
  }
}
