import React from 'react'
import {
  EmptyStateContainer,
  EmptyStateMessage,
  StartEventButton,
} from '@pages/DiscountEventRecordPage/DiscountEventRecordPage.style'
import { useNavigate } from 'react-router-dom'

export default function EmptyState() {
  const navigate = useNavigate()
  return (
    <EmptyStateContainer>
      <EmptyStateMessage>
        <h2>진행했던 할인 행사가 없어요!</h2>
        <p>마이페이지에서 새로운 할인 행사를 지금 시작해보세요!</p>
      </EmptyStateMessage>
      <StartEventButton onClick={() => navigate('/discount-event')}>
        할인행사 진행하기
      </StartEventButton>
    </EmptyStateContainer>
  )
}
