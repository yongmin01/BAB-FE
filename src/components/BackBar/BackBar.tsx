import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CategoryHeader,
  BackBtn,
  CategoryInfo,
} from '@components/BackBar/BackBar.style'

type Props = {
  storeCategory: string
}

export default function BackBar({ storeCategory }: Props) {
  const navigate = useNavigate()

  return (
    <CategoryHeader>
      <BackBtn onClick={() => navigate(-1)}>{`<`}</BackBtn>
      <CategoryInfo onClick={() => navigate(-1)}>{storeCategory}</CategoryInfo>
    </CategoryHeader>
  )
}
