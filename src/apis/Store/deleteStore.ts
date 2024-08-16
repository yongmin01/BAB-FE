import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function deleteStore(storeId: number) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/v1/stores/${storeId}`)
    console.log(response.data)
    return response.data.result.id
  } catch (error) {
    console.error('Error deleting store:', error)
    throw error
  }
}
