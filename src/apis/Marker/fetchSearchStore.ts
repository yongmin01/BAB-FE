import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export interface SearchStore {
  storeId: number
  storeName: string
  distanceFromUniversityKm: number
  latitude: number
  longitude: number
  menuList: {
    id: number
    menuName: string
    price: number
    discountPrice: number | null
  }
}
export const fetchSearchStore = async (
  keyword: string,
  latitude?: number,
  longitude?: number,
) => {
  try {
    const res = await axios.get(
      `${baseUrl}/v1/stores/menus/search?keyword=${encodeURIComponent(keyword)}&
    ${
      latitude !== undefined && longitude !== undefined
        ? `&latitude=${latitude}&longitude=${longitude}`
        : ''
    }`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6Nywicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3MjM5NzY4NzksImV4cCI6MTcyNTE4NjQ3OX0.AV3UHwB_XGiMCttKhs7T-8GaVBGlnUWFE0q3WJ-aLVA',
        },
      },
    )
    return res.data.result
  } catch (error) {
    console.log(error)
    return []
  }
}
