import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import nav from '@assets/RegisterStoreInfo/thirdstep.svg'
import errorIcon from '@assets/RegisterStoreInfo/warnning.svg'
import {
  StyledButton,
  StyledContainer,
  StyledFormContainer,
  StyledLabel,
  // StyledMenuAddButton,
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
import storeInfoStore from '@stores/storeInfoStore'
import { LoginStore } from '@stores/loginStore'
import { getMenus } from '@apis/getMenus'
import { patchMenu } from '@apis/patchMenu'

export default function EditThirdRegisterStoreInfo() {
  const { kakao_token } = LoginStore((state) => state)
  const storeInfo = storeInfoStore(
    (state) => state.storeInfos[state.storeInfos.length - 1],
  )
  const storeId = storeInfo?.id
  const [isError, setIsError] = useState<boolean>(false)
  const navigate = useNavigate()

  const [menus, setMenus] = useState<Menu[]>([])

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const fetchedMenus = await getMenus(storeId)
        const formattedMenus = fetchedMenus.map((menu) => ({
          id: menu.id,
          name: menu.name,
          price: menu.price,
          menuUrl: menu.menuUrl, // API의 menuImageUrl을 menuUrl로 매핑
          isSignature: menu.isSignature,
        }))
        console.log(formattedMenus)
        setMenus(formattedMenus)
      } catch (error) {
        console.error('메뉴 정보 가져오기 실패:', error)
      }
    }
    fetchMenus()
  }, [storeId])

  const handleBack = () => {
    navigate(-1)
  }

  // const handleAddMenu = () => {
  //   setMenus([
  //     ...menus,
  //     { id: , name: '', price: 0, menuUrl: '', isSignature: false },
  //   ])
  // }

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
      try {
        for (const menu of menus) {
          if (menu.id) {
            await patchMenu(
              menu.id,
              {
                menuName: menu.name,
                price: menu.price,
                menuUrl:
                  typeof menu.menuUrl === 'string'
                    ? menu.menuUrl
                    : (menu.menuUrl as { menuImageUrl: string }).menuImageUrl,
              },
              kakao_token,
            )
          }
        }
        navigate('/editsuccess')
      } catch (error) {
        console.error('메뉴 수정 중 오류 발생:', error)
      }
    } else {
      setIsError(true)
      console.log('모든 필드를 채워주세요.')
    }
  }

  return (
    <StyledContainer>
      <HeaderTitle title="가게 정보 수정" $icon="back" onClick={handleBack} />
      <StyledNavImgWrapper>
        <StyledNavImg src={nav} />
        <StyledNavText>
          <div>기본 정보</div>
          <div>영업 시간</div>
          <div>메뉴 수정</div>
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
            {/* <StyledMenuAddButton onClick={handleAddMenu}>
              메뉴 추가하기
            </StyledMenuAddButton> */}
          </StyledMenuTable>
          <StyledButton onClick={handleNext}>수정하기</StyledButton>
        </StyledFormContainer>
      </StyledScrollableContent>
    </StyledContainer>
  )
}
