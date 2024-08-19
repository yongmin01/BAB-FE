import axios, { AxiosResponse } from 'axios'

const API = import.meta.env.VITE_API_BASE_URL

interface StoreUpdateResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    storeId: number
    name: string
    longitude: number
    latitude: number
    address: string
    streetAddress: string
    storeLink: string
    registration: string
    university: string
  }
}

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
    console.error(error)
    throw error
  }
}
