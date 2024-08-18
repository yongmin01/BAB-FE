import '@assets/mapIcon/markerAnimation.css'
import { fetchMarker } from '@apis/Store/fetchMarker'
import { MapWrapper } from '@components/MapCard/GoogleMapCard/Map.style'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mapStore } from '@stores/mapStore'
import storeInfoStore from '@stores/storeInfoStore'
import { StoreInfo } from '@stores/tempStore'
import { stores } from '@stores/tempStore'
import greyIcon from '@assets/mapIcon/greyIcon'
import smallGreyIcon from '@assets/mapIcon/smallGreyIcon'
import yellowIcon from '@assets/mapIcon/yellowIcon'
import smallYellowIcon from '@assets/mapIcon/smallYellowIcon'

type Props = {
  markers: google.maps.marker.AdvancedMarkerElement[]
  searchValue: string
  sendSearchValue: string
  tempInfos: StoreInfo[]
  addStore: (store: StoreInfo) => void
  addMarker: (marker: google.maps.marker.AdvancedMarkerElement) => void
  clearMarker: () => void
  setLat: (value: number) => void
  setLng: (value: number) => void
}

interface storeInfo {
  price: number
  discountPrice: number
  check: boolean
}

interface SchoolLoc {
  lat: number
  lng: number
}

export default function Map({
  markers,
  addStore,
  addMarker,
  clearMarker,
  searchValue,
  sendSearchValue,
  tempInfos,
  setLat,
  setLng,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { lat, lng, googleMap, setGoogleMap } = mapStore()
  const [zoom, setZoom] = useState<number | undefined>(16)
  const { storeInfos, tempAddStoreInfo, addMenu } = storeInfoStore()
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
  function findIsDiscount(id: number): storeInfo {
    let storeinfo: storeInfo
    storeinfo = { check: false, price: 0, discountPrice: 0 }

    tempInfos.forEach((info) => {
      if (info.id === id) {
        if (info.discountPrice === 0) {
          storeinfo.check = false
          storeinfo.price = info.price
          storeinfo.discountPrice = 0
        } else {
          storeinfo.check = true
          storeinfo.price = info.price
          storeinfo.discountPrice = info.discountPrice
        }
      }
    })
    return storeinfo
  }
  //데이터 기준으로 학교 위도 경도 확인
  function findLocation(): void {
    let location: SchoolLoc
    let latitudeAvg: number
    let latitudeMin: number = 100
    let longitudeAvg: number
    let longitudeMin: number = 100
    stores.forEach((store) => {
      latitudeAvg += store.lat as number
      longitudeAvg += store.lng as number
    })
    latitudeAvg /= stores.length
    longitudeAvg /= stores.length
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
    setLat(location.lat)
    setLng(location.lng)
  }
  //가게검색 기능 싹 다 바꿔야함
  function findPlaces() {
    ///   임시코드    ///
    if (searchValue === '음식점') {
      stores.forEach((store) => {
        addStore(store)
      })
    }
    /// 메뉴검색 API 구현 완료 시 사용 ///
    /*
    if (googleMap) {
      const bounds = googleMap.getBounds()
      //남서쪽 경도 위도
      const minLat = bounds?.getSouthWest().lat()
      const minLng = bounds?.getSouthWest().lng()
      //북동쪽 경도 위도
      const maxLat = bounds?.getNorthEast().lat()
      const maxLng = bounds?.getNorthEast().lng()
      stores.forEach((store) => {
        if (
          store.lat < maxLat &&
          store.lng < maxLng &&
          store.lat > minLat &&
          store.lng > minLng
        ) {
          addStore(store)
        }
      })
    }*/
  }
  //지도 초기화 o
  useEffect(() => {
    if (ref.current) {
      const initialMap = new window.google.maps.Map(ref.current, {
        center: { lat, lng },
        zoom: 17,
        disableDefaultUI: true,
        mapId: 'eb4ca83b18a77f42',
      })
      setGoogleMap(initialMap)
      fetchMarker()
      initialMap.addListener('zoom_changed', () => {
        setZoom(initialMap.getZoom())
      })
    }
  }, [])

  //이전 검색마커 삭제기능 && 검색기능
  useEffect(() => {
    if (searchValue) {
      console.log('검색 실행')
      if (markers.length !== 0) {
        markers.forEach((marker) => {
          console.log(marker.id)
          marker.map = null
        })
        clearMarker()
      }
      findPlaces()
    }
  }, [searchValue])

  //zoom값에 따라 아이콘 조절기능
  useEffect(() => {
    let storeinfo: storeInfo
    if (zoom < 17) {
      console.log(zoom)
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
      if (tempInfos.length) {
        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          'marker',
        )) as google.maps.MarkerLibrary
        tempInfos.forEach((info) => {
          const logo =
            info.discountPrice === 0
              ? greyIcon(info.price)
              : yellowIcon(info.price, info.discountPrice)
          logo.classList.add('drop')
          const markerView = new AdvancedMarkerElement({
            map: googleMap,
            position: new google.maps.LatLng(info.lat as number, info.lng),
            title: info.name,
            content: logo,
          })
          markerView.addListener('click', () => {
            navigate(`/shopdetail/${markerView.id}`, {
              state: sendSearchValue,
            })
          })
          markerView.id = info.id.toString()
          const marker = markerView.content as HTMLElement
          marker.style.opacity = '0'
          marker.addEventListener('animationend', () => {
            marker.classList.remove('drop')
            marker.style.opacity = '1'
          })
          const time = 1 + Math.random()
          marker.style.setProperty('--delay-time', time + 's')
          intersectionObserver.observe(marker)
          console.log(marker)
          addMarker(markerView)
        })
      } else {
        console.log('없어 ㅋㅋ')
      }
    })()
  }, [tempInfos])

  return <MapWrapper ref={ref} id="map" />
}
