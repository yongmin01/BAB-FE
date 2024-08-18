import React, { useState } from 'react'
import {
  PageContainer,
  SubTitle,
  EditOptions,
  OptionButton,
  NextButton,
} from '@pages/StoreInfoEditPage/StoreInfoEditPage.style'
import { Option } from 'src/types/ButtonOpionTypes'
import { useNavigate } from 'react-router-dom'
import HeaderTitle from '@components/HeaderTitle/HeaderTitle'

export default function StoreInfoEditPage() {
  const navigate = useNavigate()

  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const options: Option[] = [
    {
      label: '기본 정보',
      type: 'default',
      route: '/editfirstregisterstoreinfo',
    },
    {
      label: '영업 시간',
      type: 'default',
      route: '/editsecondregisterstoreinfo',
    },
    {
      label: '메뉴 등록',
      type: 'default',
      route: '/editthirdregisterstoreinfo',
    },
    { label: '가게 삭제', type: 'destructive', route: '/storeInfo-delete' },
  ]

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
  }

  const handleNextClick = () => {
    const selected = options.find((option) => option.label === selectedOption)
    if (selected) {
      navigate(selected.route)
    }
  }

  return (
    <PageContainer>
      <HeaderTitle
        title="가게 정보 수정"
        $icon="back"
        onClick={() => navigate('/manager')}
      />
      <SubTitle>
        {/* 고서현 사장님 부분은 로그인 정보 받아와서 이름으로 랜더링 해주기 */}
        고서현 사장님! <br />
        어떤 정보를 수정할까요?
      </SubTitle>
      <EditOptions>
        {options.map((option) => (
          <OptionButton
            key={option.label}
            active={selectedOption === option.label ? option.type : undefined}
            onClick={() => handleOptionClick(option.label)}
            type={option.type}
          >
            {option.label}
          </OptionButton>
        ))}
      </EditOptions>
      <NextButton onClick={handleNextClick}>다음</NextButton>
    </PageContainer>
  )
}
