import MyPageCardTop from '@components/MyPageCard/MyPageCardTop/MyPageCardTop'
import MyPageCardAccount from '@components/MyPageCard/Account/MyPageCardAccount'
import DiscountInfo from '@components/MyPageCard/DiscountInfo/DiscountInfo'
import { StudentPageContainer, Content } from '../StudentPage/StudentPage.style'
import HeaderTitle from '@components/HeaderTitle/HeaderTitle'
import { useStudentInfoStore } from '@stores/studentInfoStore'
import { useEffect } from 'react'
import { getStudentMyPageInfo } from '@apis/getStudentMyPageInfo'
import { useSchoolInfoStore } from '@stores/schoolInfoStore'
import { LoginStore } from '@stores/loginStore'

export default function StudentPage() {
  const {
    isSchoolSet,
    accountId,
    setIsSchoolSet,
    setStudentName,
    setAccountId,
  } = useStudentInfoStore((state) => state)
  const { setSchoolName, setAddress } = useSchoolInfoStore((state) => state)
  const { kakao_token } = LoginStore((state) => state)

  useEffect(() => {
    const setStudentInfo = async () => {
      try {
        const res = await getStudentMyPageInfo(kakao_token)
        if (res) {
          setIsSchoolSet(res.isUniversityExist)
          setStudentName(res.account.name)
          setAccountId(res.account.email)
          setSchoolName(res.university.universityName)
          setAddress(res.university.universityAddress)
        }
      } catch (error) {
        console.log(error)
      }
    }

    setStudentInfo()
  }, [])

  return (
    <StudentPageContainer>
      <HeaderTitle title={'마이페이지'} $icon="notification" />
      <Content>
        <MyPageCardTop />
        {isSchoolSet ? <DiscountInfo /> : null}
        <MyPageCardAccount accountID={accountId} />
      </Content>
    </StudentPageContainer>
  )
}
