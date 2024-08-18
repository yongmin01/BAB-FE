import MyPageCardTop from '@components/MyPageCard/MyPageCardTop/MyPageCardTop'
import MyPageCardAccount from '@components/MyPageCard/Account/MyPageCardAccount'
import DiscountInfo from '@components/MyPageCard/DiscountInfo/DiscountInfo'
import { StudentPageContainer, Content } from '../StudentPage/StudentPage.style'
import HeaderTitle from '@components/HeaderTitle/HeaderTitle'
import { studentInfoStore } from '@stores/studentInfoStore'

export default function StudentPage() {
  const { isSchoolSet } = studentInfoStore((state) => state)
  return (
    <StudentPageContainer>
      <HeaderTitle title={'마이페이지'} $icon="notification" />
      <Content>
        <MyPageCardTop />
        {isSchoolSet ? <DiscountInfo /> : null}
        <MyPageCardAccount />
      </Content>
    </StudentPageContainer>
  )
}
