import {
  SchoolSearchPageContainer,
  PageContent,
  Step,
  StyledForm,
  StyledInput,
  Result,
  School,
  SchoolLogo,
  SchoolName,
  SchoolAddress,
  ControlBtn,
  Alert,
  Text,
  SubText,
  SearchValue,
  CandidateSchoolBox,
  CandidateSchool,
} from './SchoolSearchPage.style'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import Button from '@components/Button/Button'
import HeaderTitle from '@components/HeaderTitle/HeaderTitle'

import { SchoolTypes } from 'src/types/SchoolTypes'
import { studentUniversityRegister } from '@apis/studentUniversityRegister'
import { useStudentInfoStore } from '@stores/studentInfoStore'
import { useSchoolInfoStore } from '@stores/schoolInfoStore'
import { getUniversities } from '@apis/getUnivetsities'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginStore } from '@stores/loginStore'

export default function SchoolSearchPage() {
  const [selectedSchool, setSelectedSchool] = useState<SchoolTypes>()
  const [searchVal, setSearchVal] = useState<string>('')
  const { studentName, setIsSchoolSet } = useStudentInfoStore((state) => state)
  const { setSchoolName, setAddress } = useSchoolInfoStore((state) => state)

  const [candidateSchool, setCandidateSchool] = useState<SchoolTypes[]>([])
  const [showAlert, setShowAlert] = useState<boolean>(false)

  const { kakao_token } = LoginStore((state) => state)

  const navigate = useNavigate()

  // 학교 검색 결과 관리
  const getUniversitiesRequest = async () => {
    if (showAlert) {
      if (searchVal == '') {
        setShowAlert(false)
      }
    }
    if (searchVal !== '') {
      try {
        const response = await getUniversities(searchVal)
        if (response.length >= 1) {
          setCandidateSchool(response)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  // 대학교 검색 api 호출 디바운싱
  useEffect(() => {
    const timer = setTimeout(() => {
      getUniversitiesRequest()
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [searchVal])

  const handleSearchBtn = () => {
    if (candidateSchool.length == 1) {
      // 검색어에 부합하는 대학교(candidateSchool)가 1개일 때에는 등록할 학교(selectedSchool)로 지정
      setSelectedSchool(candidateSchool[0])
    } else if (candidateSchool.length == 0) {
      // 검색어에 부합하는 대학교가 없을 때에는 검색어 확인 경고
      setShowAlert(true)
    } else {
      // 검색어가 없거나 부합하는 학교가 여러 개일 경우 return
      return
    }
  }

  // 학교 등록 여부 결정 함수
  const backToSearch = () => {
    setSelectedSchool(undefined)
    setSearchVal('')
    setCandidateSchool([])
  }
  const handleSetSchool = async () => {
    if (selectedSchool) {
      try {
        const res = await studentUniversityRegister(
          selectedSchool.universityId,
          kakao_token,
        )
        setSchoolName(res.university.universityName)
        setAddress(res.university.universityAddress)
        setIsSchoolSet(true)
        navigate('/studentPage')
      } catch (error) {
        console.log('학교 등록 실패', error)
      }
    }
  }

  return (
    <SchoolSearchPageContainer>
      <HeaderTitle
        title="학생 정보 입력"
        $icon="back"
        onClick={() => navigate('/studentPage')}
      />
      <PageContent>
        {selectedSchool ? (
          <>
            <Step>
              아래 학교로
              <br />
              {studentName}님의 학교를 등록할게요.
            </Step>
            <Result>
              <SchoolLogo src={selectedSchool.universityLogo} />
              <School>
                <SchoolName>{selectedSchool.universityName}</SchoolName>
                <SchoolAddress>
                  {selectedSchool.universityAddress}
                </SchoolAddress>
              </School>
            </Result>
            <ControlBtn>
              <Button onClick={backToSearch} width="half" $colortype="gray">
                다시 입력할게요.
              </Button>
              <Button
                onClick={handleSetSchool}
                width="half"
                $colortype="yellow"
              >
                좋아요!
              </Button>
            </ControlBtn>
          </>
        ) : (
          <>
            <Step>
              {studentName}님,
              <br />
              재학 중인 학교를 검색해주세요.
            </Step>
            <StyledForm onSubmit={(e) => e.preventDefault()}>
              <StyledInput
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
              ></StyledInput>
              <HiMagnifyingGlass onClick={handleSearchBtn} />
            </StyledForm>
            {candidateSchool.length >= 1 && searchVal && (
              <CandidateSchoolBox>
                {candidateSchool.map((school) => (
                  <CandidateSchool
                    key={school.universityId}
                    onClick={() => setSearchVal(school.universityName)}
                  >
                    {school.universityName}
                  </CandidateSchool>
                ))}
              </CandidateSchoolBox>
            )}
            {showAlert && (
              <Alert>
                <Text>
                  <SearchValue>'{searchVal}'</SearchValue>를 찾을 수 없습니다.
                </Text>
                <SubText>입력하신 정보를 다시 한번 확인해주세요!</SubText>
              </Alert>
            )}
          </>
        )}
      </PageContent>
    </SchoolSearchPageContainer>
  )
}
