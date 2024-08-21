import axios, { AxiosResponse } from 'axios'

const API = import.meta.env.VITE_API_BASE_URL

interface MenuUpdateResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    id: number
    menuName: string
    price: number
    menuImageUrl: string
    store: {
      id: number
      name: string
    }
    isSignature: boolean
  }
}

interface MenuUpdateRequest {
  menuName: string
  price: number
  menuUrl: string
}

export const patchMenu = async (
  menuId: number,
  menuData: MenuUpdateRequest,
  token: string,
): Promise<MenuUpdateResponse> => {
  try {
    const response: AxiosResponse<MenuUpdateResponse> = await axios.patch(
      `${API}/v1/menus/${menuId}`,
      menuData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
