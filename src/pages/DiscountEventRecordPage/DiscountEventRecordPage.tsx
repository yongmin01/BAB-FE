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
import discountEventStore from '@stores/discountEventStore'
import HeaderTitle from '@components/HeaderTitle/HeaderTitle'

export default function DiscountEventRecordPage() {
  const navigate = useNavigate()
  const { storeInfos } = storeInfoStore()
  const { discountEvents, removeDiscountEventById } = discountEventStore()

  const handleDeleteClick = (eventId: number) => {
    removeDiscountEventById(eventId)
  } //여기 API 코드는 브렌치 새로 파서 진행하겠습니다(본격적인 할인 로직 다룰때)
  //현재는 클라이언트 단에서(스토어) 삭제되는거까지만 해놨습니다.
  console.log(discountEvents)
  return (
    <PageContainer>
      <HeaderTitle
        title="진행했던 할인행사 보기"
        $icon="back"
        onClick={() => navigate('/manager')}
      />
      <EventList>
        {discountEvents.map((event) => (
          <EventItem key={event.id}>
            <EventTitle>{storeInfos[0].name}</EventTitle>
            <EventDescription>{event.eventMessage}</EventDescription>
            <EventPeriod>
              {event.startDate} ~ {event.endDate}
            </EventPeriod>
            <DeleteButton onClick={() => handleDeleteClick(event.id)}>
              삭제
            </DeleteButton>
          </EventItem>
        ))}
      </EventList>
    </PageContainer>
  )
}
