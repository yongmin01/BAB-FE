import storeInfoStore from '@stores/storeInfoStore'
import {
  CardContent,
  CardSubtitle,
  CardButton,
  EditButton,
  ArrowIcon,
} from './ManagerCompletedCard.style'
import managerRegisterInfoStore from '@stores/managerRegisterInfoStore'
import { useNavigate } from 'react-router-dom'
import {
  StyledCard,
  CardTitle,
  CardSubTitle,
} from '@components/MyPageCard/MyPageCard.style'

export default function ManagerCompletedCard() {
  const { storeInfos } = storeInfoStore()
  const navigate = useNavigate()
  const { ownerNickname } = managerRegisterInfoStore()

  return (
    <StyledCard $paddingtop="24px" $paddingbottom="20px" $paddingright="19px">
      {storeInfos && storeInfos.length > 0 ? (
        <>
          <CardSubTitle>{ownerNickname} 사장님의</CardSubTitle>
          <CardTitle $paddingbottom="13px">{storeInfos[0].name}</CardTitle>
          <CardContent>
            <CardButton onClick={() => navigate('/discount-event')}>
              <span>할인행사</span>
              <span>진행하기</span>
            </CardButton>
            <CardButton onClick={() => navigate('/discount-record')}>
              <span>진행했던</span>
              <span>할인행사 보기</span>
            </CardButton>
          </CardContent>
          <EditButton onClick={() => navigate('/storeInfo-edit')}>
            가게 정보 수정하기
            <ArrowIcon>&gt;</ArrowIcon>
          </EditButton>
        </>
      ) : (
        <>
          <CardSubtitle>{ownerNickname} 사장님의</CardSubtitle>
          <CardTitle>등록된 가게가 없습니다.</CardTitle>
        </>
      )}
    </StyledCard>
  )
}
