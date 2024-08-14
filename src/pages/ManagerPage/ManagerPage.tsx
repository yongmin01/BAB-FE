import RegistrationPrompt from '@components/RegistrationPrompt'
import { ManagerRegisterState } from '@stores/managerRegisterInfoStore'
import managerRegisterInfoStore from '@stores/managerRegisterInfoStore'
import { ManagerPageContainer } from './ManagerPage.style'
import icon from '@assets/managerMypage/등록증 아이콘.svg'
import menuIcon from '@assets/managerMypage/메뉴아이콘.svg'
import useModalStore from '@stores/modalStore'
import { useEffect, useState } from 'react'
import DiscountModal from '@components/Modal/DiscountModal'
import ManagerCompletedCard from '@components/ManagerCompletedCard/ManagerCompletedCard'
import storeInfoStore, { StoreInfo } from '@stores/storeInfoStore'
import discountEventStore from '@stores/discountEventStore'
import { generateUniqueId } from '@utils/generateUniqueId'
import HeaderTitle from '@components/HeaderTitle/HeaderTitle'
import MyPageCardAccount from '@components/MyPageCard/Account/MyPageCardAccount'
import { StyledCard } from '@components/MyPageCard/MyPageCard.style'
import {
  ImgBtnContainer,
  Btn,
  StyledArrow,
} from '@components/MyPageCard/MyPageCardTop/MyPageCardTop.style'
import ArrowImg from '@assets/StudentPage/arrow.svg'

export default function ManagerPage() {
  const { isRegistered, setIsRegistered, setManagerRegistrationInfo } =
    managerRegisterInfoStore()
  const { isStoreRegistered, setStoreRegistered } = storeInfoStore()
  const storeInfos = storeInfoStore((state) => state.storeInfos)
  const discountEvents = discountEventStore.getState().discountEvents
  const { openModal } = useModalStore()
  const [businessData, setBusinessData] = useState<ManagerRegisterState | null>(
    null,
  )

  useEffect(() => {
    if (isRegistered) {
      setBusinessData(managerRegisterInfoStore.getState())
    } else {
      setBusinessData(null)
    }
  }, [isRegistered])

  useEffect(() => {
    console.log('Updated Store Infos:', storeInfos)
  }, [storeInfos])

  const handleManagerRegisterClick = (): void => {
    setIsRegistered(true)
    setManagerRegistrationInfo({
      managerName: '고서현',
      isRegistered: true,
      registrationNumber: 12345678,
      businessName: '예제 사업자명',
      businessAddress: '예제 주소',
      industry: '업태',
      item: '종목',
    })
  }

  const handleStoreRegisterClick = (): void => {
    setStoreRegistered(true)
    openModal()
  }
  return (
    <ManagerPageContainer>
      <HeaderTitle title="마이페이지" icon="notification" />

      {isStoreRegistered ? (
        <ManagerCompletedCard />
      ) : (
        <StyledCard paddingTop="35px" paddingBottom="26px">
          <RegistrationPrompt
            isRegistered={isRegistered}
            businessData={businessData ? [businessData] : null}
          />
          {isRegistered && businessData ? (
            <>
              <ImgBtnContainer gap="12px">
                <img src={menuIcon} alt="메뉴 아이콘" />
                <Btn onClick={handleStoreRegisterClick} padding="18px">
                  가게 등록하러 가기
                  <StyledArrow src={ArrowImg} />
                </Btn>
              </ImgBtnContainer>
            </>
          ) : (
            <>
              <ImgBtnContainer gap="18px">
                <img src={icon} alt="등록증 아이콘" />
                <Btn onClick={handleManagerRegisterClick} padding="18px">
                  사업자 정보 등록하기
                  <StyledArrow src={ArrowImg} />
                </Btn>
              </ImgBtnContainer>
            </>
          )}
        </StyledCard>
      )}
      <MyPageCardAccount />
      {isStoreRegistered ? <DiscountModal /> : null}
    </ManagerPageContainer>
  )
}
