import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL

interface MenuList {
  id: number
  menuName: string
  price: number
  discountPrice: number | null
}
export interface SearchStore {
  storeId: number
  storeName: string
  distanceFromUniversityKm: number
  latitude: number
  longitude: number
  menuList: MenuList[]
}
export const fetchSearchStore = async (
  kakao_token: string,
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
          Authorization: `Bearer ${kakao_token}`,
        },
      },
    )
    return res.data.result
  } catch (error) {
    console.log(error)
    return []
  }
}
