import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function fetchMenus(storeId: number) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/v1/stores/${storeId}/menus-name`,
    )

    if (response.data.isSuccess) {
      return response.data.result.menuNameDataDtoList
    } else {
      console.error('메뉴 가져오기 실패:', response.data.message)
      return []
    }
  } catch (error) {
    console.error('메뉴 가져오는 중 오류 발생:', error)
    return []
  }
}
