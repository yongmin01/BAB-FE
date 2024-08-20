import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getStudentMyPageInfo = async (token: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/v1/users/student/mypage`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    if (response.data.isSuccess) {
      return response.data.result
    } else {
      console.log('내 정보 가져오기 실패', response.data.message)
    }
  } catch (error) {
    console.log('내 정보 가져오기 실패', error)
  }
}
