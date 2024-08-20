import { StyledCard, CardTitle } from '../MyPageCard.style'
import { DiscountList, DiscountItem, Text, More } from './DiscountInfo.style'
import { useTodayDiscountStore } from '@stores/todayDiscountRestaurantsInfoStore'
import { useEffect } from 'react'
import { getTodayDiscountRestaurants } from '@apis/getTodayDiscountRestaurants'
import { useNavigate } from 'react-router-dom'
export default function DiscountInfo() {
  const navigator = useNavigate()
  const discountRestaurantList = useTodayDiscountStore((state) =>
    state.discounts.slice(0, 3),
  )
  useEffect(() => {
    const request = async () => {
      try {
        const res = await getTodayDiscountRestaurants()
        if (res) {
          console.log('Data loaded successfully:', res)
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
        {discountRestaurantList.map((discount) => (
          <DiscountItem
            key={discount.storeId}
            onClick={() => navigator(`shopdetail/${discount.storeId}`)}
          >
            <Text color="#000000">{discount.storeName}</Text>
            <Text color="#767676">{discount.discountTitle}</Text>
          </DiscountItem>
        ))}
      </DiscountList>
    </StyledCard>
  )
}
