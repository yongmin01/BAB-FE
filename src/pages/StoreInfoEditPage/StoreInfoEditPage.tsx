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
import managerRegisterInfoStore from '@stores/managerRegisterInfoStore'

export default function StoreInfoEditPage() {
  const navigate = useNavigate()
  const { ownerNickname } = managerRegisterInfoStore()

  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const options: Option[] = [
    { label: '기본 정보', type: 'default', route: '/basic-info' },
    { label: '영업 시간', type: 'default', route: '/business-hours' },
    { label: '메뉴 등록', type: 'default', route: '/menu-registration' },
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
        {ownerNickname} 사장님! <br />
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
