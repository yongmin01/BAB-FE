import React, { useEffect } from 'react'
import {
  PageContainer,
  Header,
  Title,
  BackButton,
  EventList,
  EventItem,
  EventTitle,
  EventDescription,
  EventPeriod,
  DeleteButton,
} from '@pages/DiscountEventRecordPage/DiscountEventRecordPage.style'
import { useNavigate } from 'react-router-dom'
import storeInfoStore from '@stores/storeInfoStore'
import discountEventStore from '@stores/discountEventStore'
import { fetchDiscountEvents } from '@apis/Discount/fetchDiscountEvents'
import EmptyState from '@components/EmptyState'

export default function DiscountEventRecordPage() {
  const navigate = useNavigate()
  const { storeInfos } = storeInfoStore()
  const { removeDiscountEventById } = discountEventStore()
  const discountEvents = discountEventStore.getState().discountEvents

  useEffect(() => {
    if (storeInfos.length && storeInfos[0].id) {
      fetchDiscountEvents(storeInfos[0].id).then(() => {
        console.log(
          'Fetched Discount Events:',
          discountEventStore.getState().discountEvents,
        )
      })
    } else {
      return
    }
  }, [storeInfos])

  const handleDeleteClick = (eventId: number) => {
    removeDiscountEventById(eventId)
  } //여기 API 코드는 할인정보 삭제 브렌치 파서 진행하겠습니다(본격적인 할인 로직 다룰때)
  //현재는 클라이언트 단에서(스토어) 삭제되는거까지만 해놨습니다.
  return (
    <PageContainer events={discountEvents.length > 0 ? 'true' : 'false'}>
      <Header>
        <BackButton onClick={() => navigate('/manager')}>&lt;</BackButton>
        <Title>진행했던 할인행사 보기</Title>
      </Header>
      {discountEvents.length > 0 ? (
        <EventList>
          {discountEvents.map((event) => (
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
