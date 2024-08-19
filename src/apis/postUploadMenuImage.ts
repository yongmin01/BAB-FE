import axios, { AxiosResponse } from 'axios'

const API = import.meta.env.VITE_API_BASE_URL

interface ImageUploadResponse {
  isSuccess: boolean
  code: string
  message: string
  result: string
}

export const postUploadMenuImage = async (imageFile: File, token: string) => {
  try {
    const formData = new FormData()
    formData.append('imageFile', imageFile)

    const response: AxiosResponse<ImageUploadResponse> = await axios.post(
      `${API}/v1/menus/upload-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data.result
  } catch (error) {
    console.error('메뉴 이미지 업로드 에러:', error)
    throw error
  }
}
