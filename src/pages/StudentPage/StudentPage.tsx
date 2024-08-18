import MyPageCardTop from '@components/MyPageCard/MyPageCardTop/MyPageCardTop'
import MyPageCardAccount from '@components/MyPageCard/Account/MyPageCardAccount'
import DiscountInfo from '@components/MyPageCard/DiscountInfo/DiscountInfo'
import { StudentPageContainer, Content } from '../StudentPage/StudentPage.style'
import HeaderTitle from '@components/HeaderTitle/HeaderTitle'
import { useStudentInfoStore } from '@stores/studentInfoStore'
import { useEffect } from 'react'
import { getStudentMyPageInfo } from '@apis/getStudentMyPageInfo'
import { useSchoolInfoStore } from '@stores/schoolInfoStore'
const token = import.meta.env.VITE_KAKAO_LOGIN_TEST_TOKEN

export default function StudentPage() {
  const { isSchoolSet, setIsSchoolSet, setStudentName, setAccountId } =
    useStudentInfoStore((state) => state)
  const { setSchoolName, setAddress } = useSchoolInfoStore((state) => state)
  useEffect(() => {
    const request = async () => {
      try {
        const res = await getStudentMyPageInfo(token)
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
    request()
  }, [])

  return (
    <StudentPageContainer>
      <HeaderTitle title={'마이페이지'} icon="notification" />
      <Content>
        <MyPageCardTop />
        {isSchoolSet ? <DiscountInfo /> : null}
        <MyPageCardAccount />
      </Content>
    </StudentPageContainer>
  )
}
