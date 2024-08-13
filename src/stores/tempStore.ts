interface BusinessHours {
  day: string
  open: string
  close: string
  isChecked: boolean
}

export interface MenuItem {
  id: number // 메뉴 ID
  image: string
  name: string
  price: number
  discountPrice: number // 할인 가격
  isDiscounted?: boolean // 할인 여부
}

export interface StoreInfo {
  id: number // 가게 ID
  name: string
  lat: number | null | undefined // 경도
  lng: number | null | undefined // 위도
  storeLink: string
  isStoreRegistered: boolean
  image: string
  university: string
  businessHours: BusinessHours[] // 빈 배열
  breakTime: BusinessHours[] // 빈 배열
  menu: MenuItem[] // 하나의 메뉴 아이템만 포함
}

export const stores: StoreInfo[] = [
  {
    id: 1,
    name: '숭실 김밥천국',
    lat: 37.496204,
    lng: 126.957355,
    storeLink: 'https://example.com/kimchunguk',
    isStoreRegistered: true,
    image: 'https://example.com/images/store1.jpg',
    university: '숭실대학교',
    businessHours: [],
    breakTime: [],
    menu: [
      {
        id: 0,
        image: 'https://example.com/images/gimbap.jpg',
        name: '김밥',
        price: 3500,
        discountPrice: 0,
        isDiscounted: false,
      },
    ],
  },
  {
    id: 2,
    name: '숭실 불고기집',
    lat: 37.495842,
    lng: 126.956728,
    storeLink: 'https://example.com/bulgogi',
    isStoreRegistered: true,
    image: 'https://example.com/images/store2.jpg',
    university: '숭실대학교',
    businessHours: [],
    breakTime: [],
    menu: [
      {
        id: 0,
        image: 'https://example.com/images/bulgogi.jpg',
        name: '불고기',
        price: 12000,
        discountPrice: 11000,
        isDiscounted: true,
      },
    ],
  },
  {
    id: 3,
    name: '숭실 중화반점',
    lat: 37.496783,
    lng: 126.956431,
    storeLink: 'https://example.com/junghwa',
    isStoreRegistered: true,
    image: 'https://example.com/images/store3.jpg',
    university: '숭실대학교',
    businessHours: [],
    breakTime: [],
    menu: [
      {
        id: 0,
        image: 'https://example.com/images/jajangmyeon.jpg',
        name: '짜장면',
        price: 6000,
        discountPrice: 0,
        isDiscounted: false,
      },
    ],
  },
  {
    id: 4,
    name: '숭실 버거킹',
    lat: 37.496204,
    lng: 126.957112,
    storeLink: 'https://example.com/burgerking',
    isStoreRegistered: true,
    image: 'https://example.com/images/store4.jpg',
    university: '숭실대학교',
    businessHours: [],
    breakTime: [],
    menu: [
      {
        id: 0,
        image: 'https://example.com/images/whopper.jpg',
        name: '와퍼',
        price: 8500,
        discountPrice: 8000,
        isDiscounted: true,
      },
    ],
  },
  {
    id: 5,
    name: '숭실 파스타집',
    lat: 37.495324,
    lng: 126.955875,
    storeLink: 'https://example.com/pastahouse',
    isStoreRegistered: true,
    image: 'https://example.com/images/store5.jpg',
    university: '숭실대학교',
    businessHours: [],
    breakTime: [],
    menu: [
      {
        id: 0,
        image: 'https://example.com/images/carbonara.jpg',
        name: '까르보나라',
        price: 12000,
        discountPrice: 0,
        isDiscounted: false,
      },
    ],
  },
  {
    id: 6,
    name: '숭실 카페',
    lat: 37.495414,
    lng: 126.956195,
    storeLink: 'https://example.com/cafe',
    isStoreRegistered: true,
    image: 'https://example.com/images/store6.jpg',
    university: '숭실대학교',
    businessHours: [],
    breakTime: [],
    menu: [
      {
        id: 0,
        image: 'https://example.com/images/americano.jpg',
        name: '아메리카노',
        price: 4000,
        discountPrice: 0,
        isDiscounted: false,
      },
    ],
  },
  {
    id: 7,
    name: '숭실 고기집',
    lat: 37.495954,
    lng: 126.955685,
    storeLink: 'https://example.com/gogijip',
    isStoreRegistered: true,
    image: 'https://example.com/images/store7.jpg',
    university: '숭실대학교',
    businessHours: [],
    breakTime: [],
    menu: [
      {
        id: 0,
        image: 'https://example.com/images/samgyeopsal.jpg',
        name: '삼겹살',
        price: 15000,
        discountPrice: 0,
        isDiscounted: false,
      },
    ],
  },
  {
    id: 8,
    name: '숭실 돈까스',
    lat: 37.495774,
    lng: 126.955845,
    storeLink: 'https://example.com/donkatsu',
    isStoreRegistered: true,
    image: 'https://example.com/images/store8.jpg',
    university: '숭실대학교',
    businessHours: [],
    breakTime: [],
    menu: [
      {
        id: 0,
        image: 'https://example.com/images/donkatsu.jpg',
        name: '왕돈까스',
        price: 10000,
        discountPrice: 0,
        isDiscounted: false,
      },
    ],
  },
  {
    id: 9,
    name: '숭실 도시락',
    lat: 37.495314,
    lng: 126.955445,
    storeLink: 'https://example.com/dosirak',
    isStoreRegistered: true,
    image: 'https://example.com/images/store9.jpg',
    university: '숭실대학교',
    businessHours: [],
    breakTime: [],
    menu: [
      {
        id: 0,
        image: 'https://example.com/images/dosirak.jpg',
        name: '제육볶음 도시락',
        price: 7000,
        discountPrice: 0,
        isDiscounted: false,
      },
    ],
  },
  {
    id: 10,
    name: '숭실 피자헛',
    lat: 37.496213,
    lng: 126.957456,
    storeLink: 'https://example.com/pizzahut',
    isStoreRegistered: true,
    image: 'https://example.com/images/store10.jpg',
    university: '숭실대학교',
    businessHours: [],
    breakTime: [],
    menu: [
      {
        id: 0,
        image: 'https://example.com/images/pepperonipizza.jpg',
        name: '페퍼로니 피자',
        price: 15000,
        discountPrice: 14000,
        isDiscounted: true,
      },
    ],
  },
  {
    id: 11,
    name: '숭실 삼계탕',
    lat: 37.495934,
    lng: 126.956785,
    storeLink: 'https://example.com/samgyetang',
    isStoreRegistered: true,
    image: 'https://example.com/images/store11.jpg',
    university: '숭실대학교',
    businessHours: [],
    breakTime: [],
    menu: [
      {
        id: 0,
        image: 'https://example.com/images/samgyetang.jpg',
        name: '삼계탕',
        price: 13000,
        discountPrice: 0,
        isDiscounted: false,
      },
    ],
  },
  {
    id: 12,
    name: '숭실 덮밥',
    lat: 37.496034,
    lng: 126.956545,
    storeLink: 'https://example.com/deopbap',
    isStoreRegistered: true,
    image: 'https://example.com/images/store12.jpg',
    university: '숭실대학교',
    businessHours: [],
    breakTime: [],
    menu: [
      {
        id: 0,
        image: 'https://example.com/images/deopbap.jpg',
        name: '소불고기 덮밥',
        price: 9000,
        discountPrice: 0,
        isDiscounted: false,
      },
    ],
  },
]
