import axios from 'axios'
const API = import.meta.env.VITE_API_BASE_URL

export const getUniversities = async (university: string) => {
  try {
    const response = await axios.get(`${API}/v1/universities`, {
      params: {
        universityName: university,
      },
    })
    return response.data.result
  } catch (error) {
    console.error('대학교 정보 가져오기', error)
    throw error
  }
}
