import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
//기본 엔드포인트는 추후 env에다가 설정해두는게 좋을 거 같네요
export const deleteStore = async (storeId: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/v1/stores/${storeId}`)
    console.log(response.data)
    return response.data.result.id
  } catch (error) {
    console.error('Error deleting store:', error)
    throw error
  }
}
