import axios, { AxiosResponse } from 'axios'
const API = import.meta.env.VITE_API_BASE_URL

type MenuUrl = string | { menuImageUrl: string }

interface Menu {
  name: string
  price: number
  menuUrl: MenuUrl
  isSignature: boolean
}

interface MenuAddResponse {
  isSuccess: boolean
  code: string
  message: string
}

export const postAddMenu = async (
  storeId: number,
  menus: Menu[],
  token: string,
) => {
  try {
    const response: AxiosResponse<MenuAddResponse> = await axios.post(
      `${API}/v1/stores/${storeId}/menus`,
      { menus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data
  } catch (error) {
    console.error('메뉴 등록 오류', error)
    throw error
  }
}
