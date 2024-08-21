import axios from 'axios'
const API = import.meta.env.VITE_API_BASE_URL

type MenuUrl = string | { menuImageUrl: string }

export interface Menu {
  id?: number
  name: string
  price: number
  menuUrl: MenuUrl
  isSignature: boolean
}
interface APIResponseMenu {
  id: number
  menuName: string
  price: number
  menuImageUrl: string
  isSignature: boolean
  store: {
    id: number
    name: string
  }
}

export const getMenus = async (storeId: number): Promise<Menu[]> => {
  try {
    const response = await axios.get(`${API}/v1/stores/${storeId}/menus`)
    const menus = response.data.result.map((menu: APIResponseMenu) => ({
      id: menu.id,
      name: menu.menuName,
      price: menu.price,
      menuUrl: menu.menuImageUrl,
      isSignature: menu.isSignature,
    })) as Menu[]
    return menus
  } catch (error) {
    console.error('메뉴 정보 가져오기 실패', error)
    throw error
  }
}
