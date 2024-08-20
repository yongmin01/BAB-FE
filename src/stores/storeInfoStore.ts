import { create } from 'zustand'
import { produce } from 'immer'

interface StoreName {
  storeName: string
  saveStoreName: (storeName: string) => void
}

export const useStoreName = create<StoreName>((set) => ({
  storeName: '',
  saveStoreName: (name) => set({ storeName: name }),
}))

interface BusinessHours {
  day: string
  open: string
  close: string
  isChecked: boolean
}

export interface MenuItem {
  //할인된 가격 생각도 해야될듯
  menuId: number
  image: string
  name: string
  price: number
  discountPrice: number // 할인 가격 추가
  isDiscounted?: boolean // 추가된 필드
}

export interface StoreInfo {
  id: number // 가게 ID 추가
  name: string
  lat: number | null | undefined //경도 위도 추가
  lng: number | null | undefined
  storeLink: string
  isStoreRegistered: boolean
  image: string
  university: string
  businessHours: BusinessHours[]
  breakTime: BusinessHours[]
  menu: MenuItem[]
}

interface StoreInfoState {
  storeInfos: StoreInfo[]
  isStoreRegistered: boolean
  setStoreInfo: (info: StoreInfo) => void
  tempAddStoreInfo: (
    storeId: number,
    name: string,
    lat: number | null | undefined,
    lng: number | null | undefined,
  ) => void
  addStoreInfo: (info: StoreInfo) => void // 새로운 가게를 추가하는 액션 추가
  setStoreRegistered: (registered: boolean) => void
  registerStore: (storeId: number) => void
  addMenu: (storeId: number, name: string) => void
  deleteMenu: (storeId: number, menuId: number) => void
  updateMenuDiscount: (
    storeId: number, // 가게 ID 추가
    menuId: number,
    discountPrice?: number,
    isDiscounted?: boolean,
  ) => void
  removeStoreInfo: (storeId: number) => void // 추가
}

const storeInfoStore = create<StoreInfoState>((set) => ({
  storeInfos: [
    {
      id: 1,
      name: '금산양꼬치 본점',
      lat: 37.5665,
      lng: 126.978,
      storeType: '한식',
      storeLink: 'http://example.com',
      isStoreRegistered: true,
      image: 'default_image.png',
      university: '기본 대학',
      businessHours: [
        { day: 'Monday', open: '09:00', close: '18:00', isChecked: true },
        { day: 'Tuesday', open: '09:00', close: '18:00', isChecked: true },
      ],
      breakTime: [
        { day: 'Monday', open: '12:00', close: '13:00', isChecked: true },
        { day: 'Tuesday', open: '12:00', close: '13:00', isChecked: true },
      ],
      menu: [
        {
          menuId: 1,
          image: 'menu1.png',
          name: '메뉴 1',
          price: 10000,
          discountPrice: 0,
          isDiscounted: false,
        },
        {
          menuId: 2,
          image: 'menu2.png',
          name: '메뉴 2',
          price: 12000,
          discountPrice: 0,
          isDiscounted: false,
        },
      ],
    },
  ], // 초기값을 설정
  isStoreRegistered: false,
  setStoreInfo: (info) =>
    set((state) => ({
      storeInfos: state.storeInfos.map((store) =>
        store.id === info.id ? info : store,
      ),
    })),
  // 새로운 가게 추가 기능
  tempAddStoreInfo: (storeId, name, lat, lng) =>
    set((state) => ({
      storeInfos: [
        ...state.storeInfos,
        {
          name,
          id: storeId,
          lat,
          lng,
          isStoreRegistered: false,
          storeLink: '',
          storeType: '',
          image: '',
          university: '',
          businessHours: [],
          breakTime: [],
          menu: [],
        },
      ],
    })),
  // 준영님 가게 추가 기능
  addStoreInfo: (info) =>
    set((state) => {
      const updatedStoreInfos = [...state.storeInfos, info]
      console.log('Updated Store Infos:', updatedStoreInfos) // 추가된 가게 정보 확인용 콘솔 로그
      return {
        storeInfos: updatedStoreInfos,
        isStoreRegistered: true,
      }
    }),
  //초기 가게 등록 상태 false로 지정
  //isStoreRegistered: false,
  //준영님 가게 등록 or 등록 해제 기능
  setStoreRegistered: (registered) => set({ isStoreRegistered: registered }),
  //가게 ID로 가게 탐색 후 등록 기능
  registerStore: (storeId) =>
    set(
      produce((state: StoreInfoState) => {
        const store = state.storeInfos.find((info) => info.id === storeId)
        if (store) {
          store.isStoreRegistered = true
        }
      }),
    ),
  //가게 삭제 기능
  removeStoreInfo: (storeId) => {
    set((state) => {
      const updatedStores = state.storeInfos.filter(
        (store) => store.id !== storeId,
      )
      console.log('Updated Stores:', updatedStores)
      return {
        storeInfos: updatedStores,
        isStoreRegistered: updatedStores.length > 0,
      }
    })
  },
  //메뉴 할인 등록 기능
  updateMenuDiscount: (storeId, menuId, discountPrice, isDiscounted) =>
    set((state) => ({
      storeInfos: state.storeInfos.map((store) =>
        store.id === storeId
          ? {
              ...store,
              menu: store.menu.map((item) =>
                item.menuId === menuId
                  ? {
                      ...item,
                      price: isDiscounted
                        ? item.price - (discountPrice || 0)
                        : item.price,
                      isDiscounted: isDiscounted,
                    }
                  : item,
              ),
            }
          : store,
      ),
    })),

  //메뉴 추가 기능
  addMenu: (storeId, name) =>
    set(
      produce((state: StoreInfoState) => {
        const store = state.storeInfos.find((store) => store.id === storeId)
        if (store) {
          store.menu.push({
            name,
            menuId: store.menu.length + 1,
            image: '',
            price: Math.floor(Math.random() * 7000),
            discountPrice: 0,
            isDiscounted: false,
          })
        }
      }),
    ),
  // 가게 ID 메뉴 ID 받아 해당 메뉴 삭제
  deleteMenu: (storeId, menuId) =>
    set(
      produce((state: StoreInfoState) => {
        const store = state.storeInfos.find((store) => store.id === storeId)
        if (store) {
          const filteredMenu = store.menu.filter(
            (info) => info.menuId !== menuId,
          )
          store.menu = filteredMenu
        }
      }),
    ),
}))

export default storeInfoStore
