import axios from 'axios'
const API = import.meta.env.VITE_API_BASE_URL
const token = import.meta.env.VITE_APP_API_TOKEN

export const getOwnerMypage = async () => {
  try {
    const response = await axios.get(`${API}/v1/users/owner/mypage`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('사장님 마이페이지 오류', error)
    throw error
  }
}
