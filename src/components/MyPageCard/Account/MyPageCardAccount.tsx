
import { LoginStore } from '@stores/loginStore'
import { StyledCard } from '../MyPageCard.style'
import { CardTitle } from '../MyPageCard.style'
import { StyledAccount, Text, Btn } from './MyPageCardAccount.style'
import { studentInfoStore } from '@stores/studentInfoStore'

import { useNavigate } from 'react-router-dom'

export default function MyPageCardAccount() {
  const { id } = studentInfoStore((state) => state)
  const { setIsLogined, setToken, setMembertype } = LoginStore((state) => state)
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsLogined(false)
    setToken('')
    setMembertype('')
    alert('로그아웃되었습니다!')
    navigate('/')
  }

  return (
    <StyledCard $paddingtop="24px" $paddingbottom="21px">
      <CardTitle $paddingbottom="18px">계정</CardTitle>
      <StyledAccount>
        <Text>아이디</Text>
        <Text color="#9A9A9A">{id}</Text>
      </StyledAccount>
      <hr
        style={{
          border: '0',
          borderTop: '1.5px solid #F8F8F8',
          width: '294px',
          margin: '11px auto 14px',
          marginRight: '24px',
        }}
      />
      <StyledAccount>
        <Btn onClick={handleLogout}>로그아웃</Btn>
      </StyledAccount>
    </StyledCard>
  )
}
