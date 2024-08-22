import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const fetchMarker = async (kakao_token: string) => {
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
