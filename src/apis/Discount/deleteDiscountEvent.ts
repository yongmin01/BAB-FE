import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function deleteDiscountEvent(storeId: number, discountId: number) {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/v1/stores/${storeId}/menus/discounts/${discountId}`,
    )
    if (response.status === 200) {
      return response.data.result.id
    } else {
      console.error(
        'Failed to delete discount:',
        response.status,
        response.data,
      )
      return null
    }
  } catch (error) {
    console.error('Error deleting discount:', error)
    return null
  }
}
