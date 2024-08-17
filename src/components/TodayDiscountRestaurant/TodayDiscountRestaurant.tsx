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
} from './TodayDiscountRestaurant.style'
import { useEffect } from 'react'
import { getTodayDiscountRestaurants } from '@apis/getTodayDiscountRestaurants'
import { useTodayDiscountStore } from '@stores/todayDiscountRestaurantsInfoStore'
import { useNavigate } from 'react-router-dom'

export default function TodayDiscountRestaurant() {
  const navigator = useNavigate()
  const discountRestaurantList = useTodayDiscountStore(
    (state) => state.discounts,
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
                <Menu>
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
        <div>없음</div>
      )}
    </RestaurantList>
  )
}
