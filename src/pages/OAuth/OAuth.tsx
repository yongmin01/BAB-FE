import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import SyncLoader from 'react-spinners/SyncLoader'
import { LoadContainer } from './OAuth.style'
import { LoginStore } from '@stores/loginStore'

export default function OAuth() {
  const navigate = useNavigate()
  const { membertype, setIsLogined, setToken } = LoginStore((state) => state)
  useEffect(() => {
    // 인가코드
    let code = new URL(window.location.href).searchParams.get('code')
    console.log(code)

    let options = {} //ifelse 안에 선언하면 밖에서 사용x해서 빼놓음
    if (membertype === 'student') {
      //회원유형별로 다른 api 사용
      options = {
        url: 'http://43.201.218.182:8080/v1/users/student', // 임시 서버 주소
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
        data: {
          token: code, // 인가코드 서버로 넘기기
        },
      }
    } else {
      options = {
        url: 'http://43.201.218.182:8080/v1/users/owner', // 임시 서버 주소
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
        data: {
          token: code, // 인가코드 서버로 넘기기
        },
      }
    }

    axios(options)
      .then((response) => {
        if (response.data.isSuccess) {
          console.log(response)
          setToken(response.data.result.jwt)
          setIsLogined(true)
          navigate('/map')
        } else {
          alert(response.data.message)
          navigate('/signup')
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error('Server responded with an error:', error.response.data)
        } else {
          console.error('Error during OAuth process:', error)
        }
      })
  }, [navigate, setIsLogined])

  return (
    <LoadContainer>
      <SyncLoader />
    </LoadContainer>
  )
}
