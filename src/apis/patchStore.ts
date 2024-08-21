import axios, { AxiosResponse } from 'axios'

const API = import.meta.env.VITE_API_BASE_URL

interface StoreUpdateRequest {
  name: string
  longitude: number
  latitude: number
  address: string
  streetAddress: string
  storeLink: string
  registration: string
  university: string
}

interface StoreUpdateResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    storeId: number
    storeName: string
  }
}

export const patchStore = async (
  storeId: number,
  storeData: StoreUpdateRequest,
  token: string,
): Promise<StoreUpdateResponse> => {
  try {
    const response: AxiosResponse<StoreUpdateResponse> = await axios.patch(
      `${API}/v1/stores/${storeId}`,
      storeData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data
  } catch (error) {
    console.error('가게 정보 수정 중 오류 발생:', error)
    throw error
  }
}
