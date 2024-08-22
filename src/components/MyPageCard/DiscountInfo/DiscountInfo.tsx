import { StyledCard, CardTitle } from '../MyPageCard.style'
import {
  DiscountList,
  DiscountItem,
  Text,
  More,
  EmptyAlertComment,
} from './DiscountInfo.style'
import { useTodayDiscountStore } from '@stores/todayDiscountRestaurantsInfoStore'
import { useEffect } from 'react'
import { getTodayDiscountRestaurants } from '@apis/getTodayDiscountRestaurants'
import { useNavigate } from 'react-router-dom'
import { LoginStore } from '@stores/loginStore'

export default function DiscountInfo() {
  const { kakao_token } = LoginStore((state) => state)
  const navigator = useNavigate()
  const discountRestaurantList = useTodayDiscountStore((state) =>
    state.discounts.slice(0, 3),
  )
  useEffect(() => {
    const request = async () => {
      try {
        const res = await getTodayDiscountRestaurants(kakao_token)
        if (res) {
          console.log('오늘의 할인 식당:', res)
        }
      } catch (error) {
        console.log(error)
      }
    }
    request()
  }, [])

  return (
    <StyledCard $paddingtop="24px" $paddingbottom="27px">
      <div style={{ display: 'flex', gap: '109px', alignItems: 'start' }}>
        <CardTitle $paddingbottom="35px">오늘의 할인 식당</CardTitle>
        <More to="/todayDiscountRestaurant">
          <div>더보기</div>
          <div>&gt;</div>
        </More>
      </div>
      <DiscountList>
        {discountRestaurantList.length === 0 ? (
          <EmptyAlertComment>
            오늘은 할인을 진행중인 식당이 없어요
            {/* 임의로 디자인해서 수정 필요 */}
          </EmptyAlertComment>
        ) : (
          discountRestaurantList.map((discount) => (
            <DiscountItem
              key={discount.discountId}
              onClick={() =>
                navigator('/shopdetail/', {
                  state: { storeId: discount.storeId, page: 'TodayDiscount' },
                })
              }
            >
              <Text color="#000000">{discount.storeName}</Text>
              <Text color="#767676">{discount.discountTitle}</Text>
            </DiscountItem>
          ))
        )}
      </DiscountList>
    </StyledCard>
  )
}
