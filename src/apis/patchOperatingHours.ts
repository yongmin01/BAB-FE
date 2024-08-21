import axios, { AxiosResponse } from 'axios'

const API = import.meta.env.VITE_API_BASE_URL

interface OperatingHourPayload {
  day: string
  openTime: string
  closeTime: string
  breakTime: { startTime: string; endTime: string } | Record<string, never>
}

interface ApiResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    storeId: number
  }
}

export const patchOperatingHours = async (
  storeId: number,
  operatingHours: OperatingHourPayload[],
  token: string,
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.patch(
      `${API}/v1/stores/${storeId}/operating_hours`,
      operatingHours,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Error updating operating hours:', error)
    throw error
  }
}
