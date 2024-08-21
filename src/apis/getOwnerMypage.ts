import axios from 'axios'
const API = import.meta.env.VITE_API_BASE_URL

export const getOwnerMypage = async (token: string) => {
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
