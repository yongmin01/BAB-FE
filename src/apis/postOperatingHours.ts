import axios, { AxiosResponse } from 'axios'

const API = import.meta.env.VITE_API_BASE_URL

interface OperatingHour {
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
    id: number
    name: string
  }
}

export const postOperatingHours = async (
  storeId: number,
  operatingHours: OperatingHour[],
  token: string,
) => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API}/v1/stores/${storeId}/operating_hours`,
      operatingHours,
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
