import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const studentUniversityRegister = async (
  universityId: number,
  token: string,
) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/v1/users/student/university`,
      {
        universityId: universityId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data.result
  } catch (error) {
    console.log('학교 등록 실패', error)
    throw error
  }
}
