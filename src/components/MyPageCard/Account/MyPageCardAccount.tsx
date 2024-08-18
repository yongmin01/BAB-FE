import { StyledCard } from '../MyPageCard.style'
import { CardTitle } from '../MyPageCard.style'
import { StyledAccount, Text, Btn } from './MyPageCardAccount.style'

interface MyPageAccountId {
  accountID?: string
}

export default function MyPageCardAccount({ accountID }: MyPageAccountId) {
  return (
    <StyledCard $paddingtop="24px" $paddingbottom="21px">
      <CardTitle $paddingbottom="18px">계정</CardTitle>
      <StyledAccount>
        <Text>아이디</Text>
        <Text color="#9A9A9A">{accountID ? accountID : 'testID'}</Text>
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
        <Btn>로그아웃</Btn>
      </StyledAccount>
    </StyledCard>
  )
}
