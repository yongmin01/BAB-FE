import axios from 'axios'
import { LoginStore } from '@stores/loginStore'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default async function loginApi(membertype: string) {
  // 인가코드
  let code = new URL(window.location.href).searchParams.get('code')
  let options = {} //ifelse 안에 선언하면 밖에서 사용못해서 빼놓음

  //회원유형별로 다른 api 사용
  const url =
    membertype === 'student'
      ? `${API_BASE_URL}/v1/users/student`
      : `${API_BASE_URL}/v1/users/owner`

  options = {
    url: url,
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
    data: {
      token: code, // 인가코드 서버로 넘기기
    },
  }

  try {
    const response = await axios(options)
    if (response.data.isSuccess) {
      console.log(response)
      const result = response.data.result
      return result
    } else {
      console.log('login 실패')
      return null
    }
  } catch (error) {
    console.error('Error during OAuth process:', error)
    return null
  }
}
