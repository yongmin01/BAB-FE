import axios from 'axios'

export default async function shopDetailApi(
  storeId: number,
  kakao_token: string,
) {
  const options = {
    url: `https://babedeuk.shop:8080/v1/stores/${storeId}`, // storeId 제대로 사용
    method: 'GET',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${kakao_token}`,
    },
  }

  try {
    const response = await axios(options)
    if (response.data.isSuccess) {
      const result = response.data.result
      console.log(result)
      return result
    } else {
      console.log(response.data.message)
      return null
    }
  } catch (error) {
    console.error('Error during storedetail api process:', error)
    return null
  }
}
