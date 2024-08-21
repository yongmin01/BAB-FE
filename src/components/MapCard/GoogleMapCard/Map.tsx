import '@assets/mapIcon/markerAnimation.css'
import { fetchSearchStore, SearchStore } from '@apis/Marker/fetchSearchStore'
import { MapWrapper } from '@components/MapCard/GoogleMapCard/Map.style'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mapStore } from '@stores/mapStore'
import { MarkerStoreInfo } from '@stores/tempStore'
import greyIcon from '@assets/mapIcon/greyIcon'
import smallGreyIcon from '@assets/mapIcon/smallGreyIcon'
import yellowIcon from '@assets/mapIcon/yellowIcon'
import smallYellowIcon from '@assets/mapIcon/smallYellowIcon'

type Props = {
  markers: google.maps.marker.AdvancedMarkerElement[]
  entryMarkers: MarkerStoreInfo[]
  stores: MarkerStoreInfo[]
  searchValue: string
  sendSearchValue: string
  addStore: (store: MarkerStoreInfo) => void
  clearStore: () => void
  addMarker: (marker: google.maps.marker.AdvancedMarkerElement) => void
  clearMarker: () => void
  setLat: (value: number) => void
  setLng: (value: number) => void
}

interface StoreInfo {
  price: number
  discountPrice: number
  check: boolean
}

interface SchoolLoc {
  lat: number
  lng: number
}

interface SendInfo {
  searchValue: string
  storeId: string
  page: string
}

export default function Map({
  markers,
  entryMarkers,
  addStore,
  clearStore,
  addMarker,
  clearMarker,
  searchValue,
  sendSearchValue,
  stores,
  setLat,
  setLng,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { lat, lng, googleMap, setGoogleMap } = mapStore()
  const [zoom, setZoom] = useState<number | undefined>(16)
  const navigate = useNavigate()
  const schoolLocations: SchoolLoc[] = [
    //한국공학대학교
    {
      lat: 37.340189,
      lng: 126.733596,
    },
    //인하대학교
    {
      lat: 37.450022,
      lng: 126.653488,
    },
    //숭실대학교
    {
      lat: 37.496344,
      lng: 126.957224,
    },
  ]

  //마커 감시변수
  const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('drop')
        intersectionObserver.unobserve(entry.target)
      }
    })
  })

  //할인 확인 함수 o
  function findIsDiscount(id: number): StoreInfo {
    let storeinfo: StoreInfo
    storeinfo = { check: false, price: 0, discountPrice: 0 }

    stores.forEach((info) => {
      if (info.storeId === id) {
        if (info.discountPrice === 0) {
          storeinfo.check = false
          storeinfo.price = info.menuPrice
          storeinfo.discountPrice = 0
        } else {
          storeinfo.check = true
          storeinfo.price = info.menuPrice
          storeinfo.discountPrice = info.discountPrice
        }
      }
    })
    return storeinfo
  }

  //데이터 기준으로 학교 위도 경도 확인
  //더미데이터가 아닌 값만 있어야 테스트 가능
  function findLocation(): void {
    let location: SchoolLoc
    let latitudeAvg: number
    let latitudeMin: number = 100
    let longitudeAvg: number
    let longitudeMin: number = 100
    stores.forEach((store) => {
      latitudeAvg += store.latitude as number
      longitudeAvg += store.longitude as number
    })
    latitudeAvg! /= stores.length
    longitudeAvg! /= stores.length
    schoolLocations.forEach((school) => {
      if (
        latitudeMin > school.lat - latitudeAvg &&
        longitudeMin > school.lng - longitudeAvg
      ) {
        location.lat = school.lat
        location.lng = school.lng
        latitudeMin = school.lat - latitudeAvg
        longitudeMin = school.lng - longitudeAvg
      }
    })
    setLat(location!.lat)
    setLng(location!.lng)
  }
  //지도 범위안 가게 필터링함수
  function filterMarker() {
    if (googleMap) {
      const bounds = googleMap.getBounds()
      const filteredMarker: MarkerStoreInfo[] = []
      //남서쪽 경도 위도
      const minLat = bounds?.getSouthWest().lat()
      const minLng = bounds?.getSouthWest().lng()
      //북동쪽 경도 위도
      const maxLat = bounds?.getNorthEast().lat()
      const maxLng = bounds?.getNorthEast().lng()
      if (stores.length) {
        stores.forEach((store) => {
          if (
            store.latitude! < maxLat! &&
            store.latitude! > minLat! &&
            store.longitude! < maxLng! &&
            store.longitude! > minLng!
          ) {
            filteredMarker.push(store)
          }
        })
        stores = filteredMarker
      }
    }
  }

  function findPlaces(
    searchValue: string,
    latitude?: number,
    longitude?: number,
  ) {
    const getSearchStores = async () => {
      const searchStores: SearchStore[] = await fetchSearchStore(
        searchValue,
        latitude === undefined ? 0 : latitude,
        longitude === undefined ? 0 : longitude,
      )
      console.log(stores)
      searchStores.forEach((searchStore) => {
        const tempStore: MarkerStoreInfo = {
          storeId: searchStore.storeId,
          storeName: searchStore.storeName,
          latitude: searchStore.latitude,
          longitude: searchStore.longitude,
          menuPrice: searchStore.menuList.price,
          discountPrice: searchStore.menuList.discountPrice as number,
        }
        addStore(tempStore)
      })
    }
    getSearchStores()
  }

  //지도 초기화 o
  useEffect(() => {
    if (ref.current) {
      const initialMap = new window.google.maps.Map(ref.current, {
        center: { lat, lng },
        zoom: 10,
        disableDefaultUI: true,
        mapId: 'eb4ca83b18a77f42',
      })
      setGoogleMap(initialMap)
      entryMarkers.forEach((marker) => {
        addStore(marker)
      })
      initialMap.addListener('zoom_changed', () => {
        setZoom(initialMap.getZoom())
      })
    }
  }, [entryMarkers])

  //이전 검색마커 삭제기능 && 검색기능
  useEffect(() => {
    const Search = async () => {
      if (searchValue) {
        console.log('검색 실행')
        if (markers.length !== 0) {
          markers.forEach((marker) => {
            marker.map = null
          })
        }
        clearMarker()
        clearStore()
        try {
          await findPlaces(searchValue, 0, 0)
          console.log('findPlace 완')
        } catch (error) {
          console.log(error)
        }
        console.log('필터링 시작')
        filterMarker()
        console.log(stores)
      }
    }
    Search()
  }, [searchValue])

  //zoom값에 따라 아이콘 조절기능
  useEffect(() => {
    let storeinfo: StoreInfo
    if (zoom! < 17) {
      markers.forEach((marker) => {
        storeinfo = findIsDiscount(parseInt(marker.id))
        if (storeinfo.check === true) {
          marker.content = smallYellowIcon()
        } else {
          marker.content = smallGreyIcon()
        }
      })
    } else {
      markers.forEach((marker) => {
        storeinfo = findIsDiscount(parseInt(marker.id))
        if (storeinfo.check === true) {
          marker.content = yellowIcon(
            storeinfo.price,
            storeinfo.discountPrice as number,
          )
        } else {
          marker.content = greyIcon(storeinfo.price)
        }
      })
    }
  }, [zoom])

  //마커 삽입기능
  useEffect(() => {
    ;(async () => {
      if (stores.length) {
        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          'marker',
        )) as google.maps.MarkerLibrary
        stores.forEach((info) => {
          const logo =
            info.discountPrice === 0
              ? greyIcon(info.menuPrice)
              : yellowIcon(info.menuPrice, info.discountPrice)
          logo.classList.add('drop')
          const markerView = new AdvancedMarkerElement({
            map: googleMap,
            position: new google.maps.LatLng(
              info.latitude as number,
              info.longitude,
            ),
            title: info.storeName,
            content: logo,
          })
          markerView.addListener('click', () => {
            let sendInfo: SendInfo
            sendInfo!.searchValue = sendSearchValue
            sendInfo!.storeId = markerView.id
            sendInfo!.page = 'map'
            navigate(`/shopdetail/${markerView.id}`, {
              state: sendInfo!,
            })
          })
          markerView.id = info.storeId.toString()
          const marker = markerView.content as HTMLElement
          marker.style.opacity = '0'
          marker.addEventListener('animationend', () => {
            marker.classList.remove('drop')
            marker.style.opacity = '1'
          })
          const time = 1 + Math.random()
          marker.style.setProperty('--delay-time', time + 's')
          intersectionObserver.observe(marker)
          addMarker(markerView)
        })
      } else {
        console.log('없어 ㅋㅋ')
      }
    })()
  }, [stores])

  return <MapWrapper ref={ref} id="map" />
}
