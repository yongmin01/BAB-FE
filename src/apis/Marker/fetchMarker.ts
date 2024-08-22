import axios from 'axios'
import { LoginStore } from '@stores/loginStore'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const fetchMarker = async () => {
  const { kakao_token } = LoginStore((state) => state)
  try {
    const res = await axios.get(`${baseUrl}/v1/stores`, {
      headers: {
        Authorization: `Bearer ${kakao_token}`,
      },
    })
    return res.data.result.storeDataDtoList
  } catch (error) {
    console.log(error)
    return []
  }
}
