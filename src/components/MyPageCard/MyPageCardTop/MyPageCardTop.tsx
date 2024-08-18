import { StyledCard, CardTitle } from '../MyPageCard.style'
import {
  ImgBtnContainer,
  Btn,
  StyledArrow,
  EditSchool,
} from './MyPageCardTop.style'
import { useStudentInfoStore } from '@stores/studentInfoStore'
import { useSchoolInfoStore } from '@stores/schoolInfoStore'

import StudentIDCardImg from '@assets/StudentPage/studentIDCard.svg'
import ArrowImg from '@assets/StudentPage/arrow.svg'
import PinImg from '@assets/StudentPage/pin.svg'

import { useNavigate } from 'react-router-dom'

export default function MyPageCardTop() {
  const navigate = useNavigate()
  const { studentName, isSchoolSet } = useStudentInfoStore((state) => state)
  const schoolName = useSchoolInfoStore((state) => state.schoolName)

  const handleSchoolEdit = () => {
    navigate('/schoolSearch')
  }
  return (
    <StyledCard
      $paddingtop="35px"
      $paddingbottom={isSchoolSet ? '16px' : '26px'}
    >
      <CardTitle>{studentName}님!</CardTitle>
      {isSchoolSet ? (
        <>
          <CardTitle>{schoolName} 근처 식당으로</CardTitle>
          <CardTitle $paddingbottom="21px">할인 정보를 알려드릴게요!</CardTitle>
          <ImgBtnContainer>
            <img
              src={PinImg}
              width="64px"
              height="69px"
              style={{ marginBottom: '18px' }}
            />
          </ImgBtnContainer>
          <EditSchool onClick={handleSchoolEdit}>대학 수정하기</EditSchool>
        </>
      ) : (
        <>
          <CardTitle $paddingbottom="22px">
            학생이라면 정보를 알려주세요.
          </CardTitle>
          <ImgBtnContainer $gap="18px">
            <img src={StudentIDCardImg} width="115px" height="73px" />
            <Btn onClick={() => navigate('/schoolSearch')} $padding="22px">
              학교찾기
              <StyledArrow src={ArrowImg} />
            </Btn>
          </ImgBtnContainer>
        </>
      )}
    </StyledCard>
  )
}
