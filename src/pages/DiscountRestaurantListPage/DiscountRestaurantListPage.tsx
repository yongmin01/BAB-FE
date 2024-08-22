import { TodayDiscountRestaurantPageContainer } from '@pages/TodayDiscountRestaurantPage/TodayDiscountRestaurantPage.style'
import HeaderTitle from '@components/HeaderTitle/HeaderTitle'
import TodayDiscountRestaurant from '@components/TodayDiscountRestaurant/TodayDiscountRestaurant'
import { LoginStore } from '@stores/loginStore'
import { useStudentInfoStore } from '@stores/studentInfoStore'
import managerRegisterInfoStore from '@stores/managerRegisterInfoStore'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  EmptyContainer,
  EmptyAlert,
  Comment,
  Btn,
} from '@components/TodayDiscountRestaurant/TodayDiscountRestaurant.style'

export default function DiscountRestaurantListPage() {
  const navigator = useNavigate()
  const membertype = LoginStore((state) => state.membertype)
  const isSchoolSet = useStudentInfoStore((state) => state.isSchoolSet)
  const { isRegistered, isStoreRegistered } = managerRegisterInfoStore(
    (state) => state,
  )

  const [showDiscount, setShowDiscount] = useState<Boolean>(false)
  useEffect(() => {
    if (membertype == 'student') {
      if (isSchoolSet) {
        setShowDiscount(true)
      } else {
        setShowDiscount(false)
      }
    } else if (membertype == 'manager') {
      if (isStoreRegistered) {
        setShowDiscount(true)
      } else {
        setShowDiscount(false)
      }
    }
  }, [])
  const storeRegisterNavigator = () => {
    if (membertype == 'manager' && isRegistered == false) {
      // 사업자등록증 등록도 안 되었을 경우 사업자 등록 페이지로 라우팅
      navigator('/businessdocupload')
    } else if (
      membertype == 'manager' &&
      isRegistered &&
      isStoreRegistered == false
      // 사업자등록증 등록은 되었으나 가게 등록은 안 되었을 경우 가게 등록 페이지로 라우팅
    ) {
      navigator('/firstregisterstoreinfo')
    }
  }
  return (
    <TodayDiscountRestaurantPageContainer>
      <HeaderTitle title="오늘의 할인 식당" />
      {showDiscount ? (
        <TodayDiscountRestaurant />
      ) : (
        <EmptyContainer>
          {membertype === 'student' ? (
            <>
              <EmptyAlert>학교가 아직 설정되지 않았어요!</EmptyAlert>
              <Comment>할인 정보를 얻고싶은 학교를 먼저 설정해주세요.</Comment>
              <Btn onClick={() => navigator('/schoolSearch')}>
                학교 설정하기
              </Btn>
            </>
          ) : (
            <>
              <EmptyAlert>가게가 등록되지 않았어요!</EmptyAlert>
              <Comment>
                가게 등록 시 설정한 학교 주변의 할인 정보를 알려드립니다.
              </Comment>
              <Btn onClick={() => storeRegisterNavigator()}>가게 등록하기</Btn>
            </>
          )}
        </EmptyContainer>
      )}
    </TodayDiscountRestaurantPageContainer>
  )
}
