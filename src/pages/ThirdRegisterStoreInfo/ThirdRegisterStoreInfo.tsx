import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import nav from '@assets/RegisterStoreInfo/thirdstep.svg'
import errorIcon from '@assets/RegisterStoreInfo/warnning.svg'
import {
  StyledButton,
  StyledContainer,
  StyledFormContainer,
  StyledLabel,
  StyledMenuAddButton,
  StyledMenuTable,
  StyledNavImg,
  StyledNavImgWrapper,
  StyledNavText,
  StyledScrollableContent,
  StyledUploadText,
  StyledErrorMessage,
  StyledInputContainer,
  StyledMenuLabel,
} from './ThirdRegisterStoreInfo.style'
import { RegisterMenu } from '@components/RegisterMenu/RegisterMenu'
import { Menu } from 'src/types/ThirdRegisterStoreInfoTypes'
import HeaderTitle from '@components/HeaderTitle/HeaderTitle'
import { postAddMenu } from '@apis/postAddMenu'
import storeInfoStore from '@stores/storeInfoStore'

const token = import.meta.env.VITE_APP_API_TOKEN

export default function ThirdRegisterStoreInfo() {
  const storeInfo = storeInfoStore(
    (state) => state.storeInfos[state.storeInfos.length - 1],
  )
  const storeId = storeInfo?.id
  const [isError, setIsError] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const [menus, setMenus] = useState<Menu[]>([
    { name: '', price: 0, menuUrl: '', isSignature: false },
    { name: '', price: 0, menuUrl: '', isSignature: false },
  ])

  const handleAddMenu = () => {
    setMenus([
      ...menus,
      { name: '', price: 0, menuUrl: '', isSignature: false },
    ])
  }

  const handleMenuChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = e.target
    const updatedMenus = menus.map((menu, i) =>
      i === index ? { ...menu, [name]: value } : menu,
    )
    setMenus(updatedMenus)
  }

  const handleNext = async () => {
    const signatureMenuCount = menus.filter((menu) => menu.isSignature).length

    if (signatureMenuCount > 1) {
      setIsError(true)
      return
    }
    const isFormValid = menus.every(
      (menu) =>
        menu.name &&
        menu.price &&
        (typeof menu.menuUrl === 'string' ||
          (menu.menuUrl as { menuImageUrl: string }).menuImageUrl),
    )

    if (isFormValid) {
      setIsError(false)
      try {
        const formattedMenus = menus.map((menu) => ({
          ...menu,
          menuUrl:
            typeof menu.menuUrl === 'string'
              ? menu.menuUrl
              : (menu.menuUrl as { menuImageUrl: string }).menuImageUrl,
        }))
        const response = await postAddMenu(storeId, formattedMenus, token)
        if (response.isSuccess) {
          console.log('성공')
          alert('성공')

          // navigate('/manager') // 다음 페이지로 이동
        } else {
          console.error('실패', response.message)
        }
      } catch (error) {
        console.error('메뉴 추가 중 오류 발생:', error)
      }
    } else {
      setIsError(true)
      console.log('모든 필드를 채워주세요.')
    }
  }

  return (
    <StyledContainer>
      <HeaderTitle title="가게 정보 등록" $icon="back" onClick={handleBack} />
      <StyledNavImgWrapper>
        <StyledNavImg src={nav} />
        <StyledNavText>
          <div>기본 정보</div>
          <div>영업 시간</div>
          <div>메뉴 등록</div>
        </StyledNavText>
      </StyledNavImgWrapper>
      <StyledScrollableContent>
        <StyledFormContainer>
          <StyledInputContainer>
            <StyledLabel>메뉴 정보</StyledLabel>
            {isError && (
              <StyledErrorMessage>
                <img src={errorIcon} alt="Error icon" />
                {menus.filter((menu) => menu.isSignature).length > 1
                  ? '대표 메뉴는 하나만 선택할 수 있습니다.'
                  : '모든 필드를 채워주세요.'}
              </StyledErrorMessage>
            )}
          </StyledInputContainer>
          <StyledMenuTable className={isError ? 'invalid' : ''}>
            <StyledUploadText>
              * 가격은 1인분 기준으로 입력해주세요.
            </StyledUploadText>
            {menus.map((menu, index) => (
              <div key={index}>
                <StyledMenuLabel>메뉴 {index + 1}</StyledMenuLabel>
                <RegisterMenu
                  index={index}
                  menu={menu}
                  onChange={handleMenuChange}
                />
              </div>
            ))}
            <StyledMenuAddButton onClick={handleAddMenu}>
              메뉴 추가하기
            </StyledMenuAddButton>
          </StyledMenuTable>
          <StyledButton onClick={handleNext}>완료</StyledButton>
        </StyledFormContainer>
      </StyledScrollableContent>
    </StyledContainer>
  )
}
