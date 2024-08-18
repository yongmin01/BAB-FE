export interface StoreInfo {
  id: number // 가게 ID
  name: string
  lat: number | null | undefined // 경도
  lng: number | null | undefined // 위도
  price: number
  discountPrice: number
}

export const stores: StoreInfo[] = [
  {
    id: 1,
    name: '숭실 김밥천국',
    lat: 37.496204,
    lng: 126.957355,
    price: 9000,
    discountPrice: 7000,
  },
  {
    id: 2,
    name: '숭실 불고기집',
    lat: 37.495842,
    lng: 126.956728,
    price: 7000,
    discountPrice: 0,
  },
  {
    id: 3,
    name: '숭실 중화반점',
    lat: 37.496783,
    lng: 126.956431,
    price: 8000,
    discountPrice: 7000,
  },
  {
    id: 4,
    name: '숭실 버거킹',
    lat: 37.496204,
    lng: 126.957112,
    price: 6000,
    discountPrice: 0,
  },
  {
    id: 5,
    name: '숭실 파스타집',
    lat: 37.495324,
    lng: 126.955875,
    price: 10000,
    discountPrice: 7000,
  },
  {
    id: 6,
    name: '숭실 카페',
    lat: 37.495414,
    lng: 126.956195,
    price: 4500,
    discountPrice: 0,
  },
  {
    id: 7,
    name: '숭실 고기집',
    lat: 37.495954,
    lng: 126.955685,
    price: 13000,
    discountPrice: 11000,
  },
  {
    id: 8,
    name: '숭실 돈까스',
    lat: 37.495774,
    lng: 126.955845,
    price: 10000,
    discountPrice: 9500,
  },
  {
    id: 9,
    name: '숭실 도시락',
    lat: 37.495314,
    lng: 126.955445,
    price: 7000,
    discountPrice: 0,
  },
  {
    id: 10,
    name: '숭실 피자헛',
    lat: 37.496213,
    lng: 126.957456,
    price: 23000,
    discountPrice: 19000,
  },
]
