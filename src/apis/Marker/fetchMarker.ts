import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL
const token = import.meta.env.VITE_KAKAO_TEST_TOKEN

export const fetchMarker = async () => {
  try {
    const res = await axios.get(`${baseUrl}/v1/stores`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data.result.storeDataDtoList
  } catch (error) {
    console.log(error)
    return []
  }
}
