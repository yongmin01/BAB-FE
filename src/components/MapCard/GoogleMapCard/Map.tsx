import '@assets/mapIcon/markerAnimation.css'
import { MapWrapper } from '@components/MapCard/GoogleMapCard/Map.style'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mapStore } from '@stores/mapStore'
import storeInfoStore, { StoreInfo } from '@stores/storeInfoStore'
import { stores } from '@stores/tempStore'
import greyIcon from '@assets/mapIcon/greyIcon'
import smallGreyIcon from '@assets/mapIcon/smallGreyIcon'
import yellowIcon from '@assets/mapIcon/yellowIcon'
import smallYellowIcon from '@assets/mapIcon/smallYellowIcon'

type Props = {
  markers: google.maps.marker.AdvancedMarkerElement[]
  searchValue: string
  tempInfos: StoreInfo[]
  addStore: (store: StoreInfo) => void
  addMarker: (marker: google.maps.marker.AdvancedMarkerElement) => void
  clearMarker: () => void
}

interface storeInfo {
  price: number
  discountPrice: number
  check: boolean
}

export default function Map({
  markers,
  addStore,
  addMarker,
  clearMarker,
  searchValue,
  tempInfos,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { lat, lng, googleMap, setGoogleMap } = mapStore()
  const [zoom, setZoom] = useState<number | undefined>(16)
  const { storeInfos, tempAddStoreInfo, addMenu } = storeInfoStore()
  const navigate = useNavigate()

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
        if (info.menu[0].isDiscounted === false) {
          storeinfo.check = false
          storeinfo.price = info.menu[0].price
          storeinfo.discountPrice = 0
        } else {
          storeinfo.check = true
          storeinfo.price = info.menu[0].price
          storeinfo.discountPrice = info.menu[0].discountPrice
        }
      }
    })
    return storeinfo
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
            info.menu[0].discountPrice === 0
              ? greyIcon(info.menu[0].price)
              : yellowIcon(info.menu[0].price, info.menu[0].discountPrice)
          logo.classList.add('drop')
          const markerView = new AdvancedMarkerElement({
            map: googleMap,
            position: new google.maps.LatLng(info.lat as number, info.lng),
            title: info.name,
            content: logo,
          })
          markerView.addListener('click', () => {
            ////// 임시 코드 //////
            navigate('/1')
          })
          markerView.id = info.id.toString()
          const marker = markerView.content as HTMLElement
          marker.style.opacity = '0'
          marker.addEventListener('animationend', (event) => {
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
  }, [tempInfos])

  //가게검색 기능 싹 다 바꿔야함
  ///   임시코드    ///
  function findPlaces() {
    if (searchValue === '음식점') {
      stores.forEach((store) => {
        addStore(store)
      })
    }

    /*const { Place } = (await google.maps.importLibrary(
      'places',
    )) as google.maps.PlacesLibrary

    const request = {
      textQuery: searchValue,
      fields: ['displayName', 'location', 'businessStatus', 'types'],
      includedType: 'restaurant',
      maxResultCount: 5,
      region: 'kr',
      language: 'ko',
      locationRestriction: googleMap.getBounds(),
      useStrictTypeFiltering: false,
    }

    const { places } = await Place.searchByText(request)
    let storeType: string | undefined = ''
    places.forEach((place) => {
      if (storeType !== '') {
        return
      } else {
        storeType = place.types?.find((type) => type !== 'restaurant' || 'food')
      }
    })

    console.log(storeType)  
    if (request.textQuery === '음식점') {
    } else {
      if (places.length) {
        places.forEach((place) => {
          console.log(place.types)
          console.log(place.displayName)
          const check = findRestaurant(place.types)
          if (check === true) {
            addStore(place.id)
          }
        })
      } else {
        console.log('No results')
      }
    }*/
  }

  return <MapWrapper ref={ref} id="map" />
}
