import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const fetchMarker = async () => {
  try {
    const res = await axios.get(`${baseUrl}/v1/stores`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6Nywicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3MjM5NzY4NzksImV4cCI6MTcyNTE4NjQ3OX0.AV3UHwB_XGiMCttKhs7T-8GaVBGlnUWFE0q3WJ-aLVA`,
      },
    })
    return res.data.result.storeDataDtoList
  } catch (error) {
    console.log(error)
    return []
  }
}
