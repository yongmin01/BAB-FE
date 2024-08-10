import RegistrationPrompt from '@components/RegistrationPrompt'
import { ManagerRegisterState } from '@stores/managerRegisterInfoStore'
import managerRegisterInfoStore from '@stores/managerRegisterInfoStore'
import {
  ManagerPageContainer,
  Card,
  CardImage,
  CardTitle,
  Button,
  AccountInfo,
  AccountDetail,
  AccountActions,
} from './ManagerPage.style'
import icon from '@assets/managerMypage/등록증 아이콘.svg'
import menuIcon from '@assets/managerMypage/메뉴아이콘.svg'
import useModalStore from '@stores/modalStore'
import { useEffect, useState } from 'react'
import DiscountModal from '@components/Modal/DiscountModal'
import ManagerCompletedCard from '@components/ManagerCompletedCard/ManagerCompletedCard'
import storeInfoStore, { StoreInfo } from '@stores/storeInfoStore'
import discountEventStore from '@stores/discountEventStore'
import { generateUniqueId } from '@utils/generateUniqueId'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const { isRegistered, setIsRegistered, setManagerRegistrationInfo } =
    managerRegisterInfoStore()
  const { isStoreRegistered, setStoreRegistered } = storeInfoStore()
  const addStoreInfo = storeInfoStore((state) => state.addStoreInfo)
  const storeInfos = storeInfoStore((state) => state.storeInfos)
  const { discountEvents } = discountEventStore()
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
    console.log('Updated Store Infos:', storeInfos) // storeInfos 변경 시 로그 찍기
  }, [storeInfos])
  console.log(discountEvents)

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
    navigate('/businessdocupload')
  }

  const handleStoreRegisterClick = (): void => {
    const newStore: StoreInfo = {
      id: generateUniqueId(),
      name: '새로운 가게',
      storeLink: '',
      image: '',
      university: '',
      businessHours: [],
      breakTime: [],
      menu: [
        //임의로 메뉴 데이터가 입력된다고 가정
        {
          id: 0,
          image: '/assets/icons/bell.svg',
          name: '김치찌개',
          price: 8000,
          isDiscounted: false,
        },
        {
          id: 1,
          image: '/assets/icons/bell.svg',
          name: '된장찌개',
          price: 7500,
          isDiscounted: false,
        },
        {
          id: 2,
          image: '/assets/icons/bell.svg',
          name: '미역국',
          price: 5000,
          isDiscounted: false,
        },
      ],
    }
    addStoreInfo(newStore)
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
      {/* {isStoreRegistered ? (
        <ManagerCompletedCard />
      ) : (
        <Card>
          <CardTitle>
            <RegistrationPrompt
              isRegistered={isRegistered}
              businessData={businessData ? [businessData] : null}
            />
          </CardTitle>
          {isRegistered && businessData ? (
            <>
              <CardImage src={menuIcon} alt="메뉴 아이콘" />
              <Button onClick={handleStoreRegisterClick}>
                가게 등록하러 가기
              </Button>
            </>
          ) : (
            <>
              <CardImage src={icon} alt="등록증 아이콘" />
              <Button onClick={handleManagerRegisterClick}>
                사업자 정보 등록하기
              </Button>
            </>
          )}
        </Card>
      )} */}
      {/* <AccountInfo>
        <AccountDetail className="title">계정</AccountDetail>
        <AccountDetail className="subtitle">
          <span>아이디</span>
          <span>kosoohyeon1</span>
        </AccountDetail>
        <AccountDetail className="divider" />
        <AccountActions>
          <span>로그아웃</span>
        </AccountActions>
      </AccountInfo> */}
    </ManagerPageContainer>
  )
}
