import {
  SchoolSearchPageContainer,
  Title,
  TitleText,
  BackArrow,
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
} from './SchoolSearchPage.style'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import Button from '@components/Button/Button'

import { studentInfoStore } from '@stores/studentInfoStore'
import { schoolInfoStore } from '@stores/schoolInfoStore'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function SchoolSearchPage() {
  const [selectedSchool, setSelectedSchool] = useState<School>()
  const [searchVal, setSearchVal] = useState<string>('')
  const { studentName, setIsSchoolSet } = studentInfoStore((state) => state)
  const { setSchoolName, setAddress } = schoolInfoStore((state) => state)
  const [candidateSchool, setCandidateSchool] = useState<School[]>([])
  const [showAlert, setShowAlert] = useState(false)
  const token = import.meta.env.VITE_KAKAO_LOGIN_TEST_TOKEN
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  interface School {
    universityId: number
    universityName: string
    universityLogo: string
    universityAddress: string
  }

  const navigate = useNavigate()
  const request = async () => {
    if (showAlert) {
      if (searchVal == '') {
        setShowAlert(false)
      }
    }
    if (searchVal !== '') {
      try {
        const response = await axios.get(`${API_BASE_URL}/v1/universities`, {
          params: { universityName: searchVal },
        })
        setCandidateSchool(response.data.result)
      } catch (error) {
        console.log(error)
      }
    }
  }
  const setSchoolRequest = async (universityId: number) => {
    // 토큰 만료 에러
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/v1/users/student/university`,
        {
          params: { universityId: universityId },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      console.log('응답 : ', response)
    } catch (error) {
      console.log('에러 :', error)
    }
  }

  const search = () => {
    if (candidateSchool.length == 1) {
      setSelectedSchool(candidateSchool[0])
    } else if (candidateSchool.length == 0) {
      setShowAlert(true)
    }
  }
  const backToSearch = () => {
    setSelectedSchool(undefined)
    setSearchVal('')
    setCandidateSchool([])
  }
  const handleSetSchool = () => {
    if (selectedSchool) {
      setIsSchoolSet(true)
      setSchoolRequest(selectedSchool.universityId)
      setSchoolName(selectedSchool.universityName)
      setAddress(selectedSchool.universityAddress)
      navigate('/studentPage')
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      request()
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [searchVal])
  return (
    <SchoolSearchPageContainer>
      <Title>
        <BackArrow to="/studentPage">&lt;</BackArrow>
        <TitleText>학생 정보 입력</TitleText>
      </Title>
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
              <Button onClick={backToSearch} width="half" colorType="gray">
                다시 입력할게요.
              </Button>
              <Button onClick={handleSetSchool} width="half" colorType="yellow">
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
              <HiMagnifyingGlass onClick={search} />
            </StyledForm>
            {candidateSchool ? (
              <div>
                {candidateSchool.map((school) => (
                  <div onClick={() => setSelectedSchool(school)}>
                    {school.universityName}
                  </div>
                ))}
              </div>
            ) : null}
            {showAlert ? (
              <Alert>
                <Text>
                  <SearchValue>'{searchVal}'</SearchValue>를 찾을 수 없습니다.
                </Text>
                <SubText>입력하신 정보를 다시 한번 확인해주세요!</SubText>
              </Alert>
            ) : null}
          </>
        )}
      </PageContent>
    </SchoolSearchPageContainer>
  )
}
