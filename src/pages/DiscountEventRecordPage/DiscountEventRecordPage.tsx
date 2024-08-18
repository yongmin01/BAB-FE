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
import { deleteDiscountEvent } from '@apis/Discount/deleteDiscountEvent'

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

  const handleDeleteClick = async (eventId: number) => {
    if (storeInfos.length === 0) return

    const storeId = storeInfos[0].id
    const removedEventId = await deleteDiscountEvent(storeId, eventId)

    if (removedEventId !== null) {
      const updatedEvents = pastDiscountEvents.filter(
        (pastEvent) => pastEvent.discountId !== removedEventId,
      )
      setPastDiscountEvents(updatedEvents)
    } else {
      console.error('Failed to delete the discount event.')
    }
  }
  return (
    <PageContainer events={pastDiscountEvents.length > 0 ? 'true' : 'false'}>
      <HeaderTitle
        title="진행했던 할인행사 보기"
        $icon="back"
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
