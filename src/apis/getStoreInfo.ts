import axios from 'axios'
const API = import.meta.env.VITE_API_BASE_URL

interface StoreInfo {
  storeId: number
  storeName: string
  bannerImageUrl: string
  storeUniversity: string
  storeAddress: string
  storeLink: string
}

export const getStoreInfo = async (storeId: number): Promise<StoreInfo> => {
  try {
    const response = await axios.get(`${API}/v1/stores/${storeId}/inform`)
    return response.data.result as StoreInfo
  } catch (error) {
    console.error('가게 정보 가져오기 실패', error)
    throw error
  }
}
