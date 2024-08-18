import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RegistrationPrompt from '@components/RegistrationPrompt'
import ManagerCompletedCard from '@components/ManagerCompletedCard/ManagerCompletedCard'
import MyPageCardAccount from '@components/MyPageCard/Account/MyPageCardAccount'
import DiscountModal from '@components/Modal/DiscountModal'
import HeaderTitle from '@components/HeaderTitle/HeaderTitle'
import icon from '@assets/managerMypage/등록증 아이콘.svg'
import menuIcon from '@assets/managerMypage/메뉴아이콘.svg'
import ArrowImg from '@assets/StudentPage/arrow.svg'
import {
  ImgBtnContainer,
  Btn,
  StyledArrow,
} from '@components/MyPageCard/MyPageCardTop/MyPageCardTop.style'
import { StyledCard } from '@components/MyPageCard/MyPageCard.style'
import { ManagerPageContainer } from './ManagerPage.style'
import axios from 'axios'
import managerRegisterInfoStore from '@stores/managerRegisterInfoStore'

export default function ManagerPage() {
  const navigate = useNavigate()
  const { isRegistered, isStoreRegistered, ownerNickname, updateFromApi } =
    managerRegisterInfoStore()

  const fetchOwnerData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/v1/users/owner/mypage`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`,
          },
        },
      )

      if (response.data.isSuccess) {
        const { ownerId, ownerNickname, storeId, storeName } =
          response.data.result

        updateFromApi({
          ownerId,
          ownerNickname,
          storeId,
          storeName,
        })
      } else {
        console.error(
          'Failed to fetch owner mypage data:',
          response.data.message,
        )
      }
    } catch (error) {
      console.error('사장님 마이페이지 오류', error)
    }
  }

  const handleManagerRegisterClick = async () => {
    await fetchOwnerData()
    navigate('/businessdocupload')
  }

  const handleStoreRegisterClick = async () => {
    await fetchOwnerData()
    navigate('/firstregisterstoreinfo')
  }

  useEffect(() => {
    fetchOwnerData()
  }, [])

  const renderRegisteredContent = () => (
    <>
      <RegistrationPrompt
        isRegistered={true}
        businessData={[managerRegisterInfoStore.getState()]}
        ownerNickname={ownerNickname}
      />
      <ImgBtnContainer $gap="12px">
        <img src={menuIcon} alt="메뉴 아이콘" />
        <Btn onClick={handleStoreRegisterClick} $padding="18px">
          가게 등록하러 가기
          <StyledArrow src={ArrowImg} />
        </Btn>
      </ImgBtnContainer>
    </>
  )

  const renderUnregisteredContent = () => (
    <>
      <RegistrationPrompt
        ownerNickname={ownerNickname}
        isRegistered={false}
        businessData={null}
      />
      <ImgBtnContainer $gap="18px">
        <img src={icon} alt="등록증 아이콘" />
        <Btn onClick={handleManagerRegisterClick} $padding="18px">
          사업자 정보 등록하기
          <StyledArrow src={ArrowImg} />
        </Btn>
      </ImgBtnContainer>
    </>
  )

  return (
    <ManagerPageContainer>
      <HeaderTitle title="마이페이지" $icon="notification" />
      {isStoreRegistered ? (
        <ManagerCompletedCard />
      ) : (
        <StyledCard $paddingtop="35px" $paddingbottom="26px">
          {isRegistered
            ? renderRegisteredContent()
            : renderUnregisteredContent()}
        </StyledCard>
      )}
      <MyPageCardAccount />
      {isStoreRegistered && <DiscountModal />}
    </ManagerPageContainer>
  )
}
