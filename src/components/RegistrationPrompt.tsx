import { ManagerRegisterState } from '@stores/managerRegisterInfoStore'
import { CardTitle } from '@components/MyPageCard/MyPageCard.style'
interface RegistrationPromptProps {
  isRegistered: boolean
  businessData?: ManagerRegisterState[] | null
  ownerNickname: string
}

export default function RegistrationPrompt({
  isRegistered,
  businessData,
  ownerNickname,
}: RegistrationPromptProps) {
  return (
    <>
      <CardTitle>{ownerNickname} 사장님!</CardTitle>
      {isRegistered && businessData ? (
        <>
          <CardTitle>심사가 완료되었습니다</CardTitle>
          <CardTitle $paddingbottom="13px">가게 정보를 등록해주세요.</CardTitle>
        </>
      ) : (
        <CardTitle $paddingbottom="22px">
          사업자 등록증을 등록해주세요.
        </CardTitle>
      )}
    </>
  )
}
