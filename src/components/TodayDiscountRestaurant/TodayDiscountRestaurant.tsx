import {
  RestaurantList,
  Restaurant,
  DiscountType,
  RestaurantName,
  GoToRestaurantBtn,
  MenuList,
  Menu,
  Dish,
  Dash,
  DiscountedPrice,
  Price,
  EmptyContainer,
  EmptyAlert,
  Comment,
  Btn,
} from './TodayDiscountRestaurant.style'
import shop from '@assets/TodayDiscountRestaurantPage/shop.svg'
import { useEffect } from 'react'
import { getTodayDiscountRestaurants } from '@apis/getTodayDiscountRestaurants'
import { useTodayDiscountStore } from '@stores/todayDiscountRestaurantsInfoStore'
import { useNavigate } from 'react-router-dom'
import { LoginStore } from '@stores/loginStore'

export default function TodayDiscountRestaurant() {
  const navigator = useNavigate()
  const { kakao_token } = LoginStore((state) => state)
  const discountRestaurantList = useTodayDiscountStore(
    (state) => state.discounts,
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
    <RestaurantList>
      {discountRestaurantList.length > 0 ? (
        discountRestaurantList.map((restaurant) => (
          <Restaurant key={restaurant.discountId}>
            <DiscountType>{restaurant.discountTitle}</DiscountType>
            <RestaurantName>{restaurant.storeName}</RestaurantName>
            <GoToRestaurantBtn
              onClick={() => navigator(`/shopdetail/${restaurant.storeId}`)}
            >
              바로 가기
              <span>&gt;</span>
            </GoToRestaurantBtn>
            <MenuList>
              {restaurant.getOnSaleStoreMenuDataDtoList.map((menu) => (
                <Menu key={menu.menuName}>
                  <Dish>{menu.menuName}</Dish>
                  <Dash />
                  <DiscountedPrice>{menu.discountPrice}</DiscountedPrice>
                  <Price>{menu.price}</Price>
                </Menu>
              ))}
            </MenuList>
          </Restaurant>
        ))
      ) : (
        <EmptyContainer>
          <img src={shop} width="100px" />
          <EmptyAlert>할인 중인 식당이 없어요!</EmptyAlert>
          <Comment>할인을 시작한 가게가 생기면 알림으로 알려드릴게요.</Comment>
          <Btn>할인 가게 알림 켜기</Btn>
        </EmptyContainer>
      )}
    </RestaurantList>
  )
}
