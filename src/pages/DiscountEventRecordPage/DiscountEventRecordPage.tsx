import React, { useEffect, useState } from 'react'
import {
  PageContainer,
  EventList,
  EventItem,
  EventTitle,
  EventDescription,
  EventPeriod,
  DeleteButton,
} from '@pages/DiscountEventRecordPage/DiscountEventRecordPage.style'
import { useNavigate } from 'react-router-dom'
import storeInfoStore from '@stores/storeInfoStore'
import discountEventStore, { DiscountEvent } from '@stores/discountEventStore'
import { fetchDiscountEvents } from '@apis/Discount/fetchDiscountEvents'
import EmptyState from '@components/EmptyState'
import HeaderTitle from '@components/HeaderTitle/HeaderTitle'

export default function DiscountEventRecordPage() {
  const navigate = useNavigate()
  const { storeInfos } = storeInfoStore()
  const { removeDiscountEventById } = discountEventStore()
  const [pastDiscountEvents, setPastDiscountEvents] = useState<DiscountEvent[]>(
    [],
  )

  useEffect(() => {
    async function loadDiscountEvents() {
      if (storeInfos.length && storeInfos[0].id) {
        const events = await fetchDiscountEvents(storeInfos[0].id)
        // 가져온 이벤트를 상태에 저장
        if (events) {
          setPastDiscountEvents(events)
        } else {
          setPastDiscountEvents([])
        }
      }
    }

    loadDiscountEvents()
  }, [storeInfos])

  console.log('Fetched Past Discount Events:', pastDiscountEvents)

  const handleDeleteClick = (eventId: number) => {
    removeDiscountEventById(eventId)
  } //여기 API 코드는 할인정보 삭제 브렌치 파서 진행하겠습니다(본격적인 할인 로직 다룰때)
  //현재는 클라이언트 단에서(스토어) 삭제되는거까지만 해놨습니다.
  return (
    <PageContainer events={pastDiscountEvents.length > 0 ? 'true' : 'false'}>
      <HeaderTitle
        title="진행했던 할인행사 보기"
        icon="back"
        onClick={() => navigate('/manager')}
      />
      {pastDiscountEvents.length > 0 ? (
        <EventList>
          {pastDiscountEvents.map((event) => (
            <EventItem key={event.discountId}>
              <EventTitle>{event.storeName}</EventTitle>
              <EventDescription>{event.discountTitle}</EventDescription>
              <EventPeriod>
                {event.startDate} ~ {event.endDate}
              </EventPeriod>
              <DeleteButton onClick={() => handleDeleteClick(event.discountId)}>
                삭제
              </DeleteButton>
            </EventItem>
          ))}
        </EventList>
      ) : (
        <EmptyState />
      )}
    </PageContainer>
  )
}
