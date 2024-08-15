import { ManagerRegisterState } from '@stores/managerRegisterInfoStore'
import { CardTitle } from '@components/MyPageCard/MyPageCard.style'
interface RegistrationPromptProps {
  isRegistered: boolean
  businessData?: ManagerRegisterState[] | null
}

export default function RegistrationPrompt({
  isRegistered,
  businessData,
}: RegistrationPromptProps) {
  const managerName =
    businessData && businessData.length > 0 ? businessData[0].managerName : ''
  return (
    <>
      <CardTitle>{managerName} 사장님!</CardTitle>
      {isRegistered && businessData ? (
        <>
          <CardTitle>심사가 완료되었습니다</CardTitle>
          <CardTitle paddingBottom="13px">가게 정보를 등록해주세요.</CardTitle>
        </>
      ) : (
        <CardTitle paddingBottom="22px">
          사업자 등록증을 등록해주세요.
        </CardTitle>
      )}
    </>
  )
}
