import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const DiscountList = styled.div`
  width: 294px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const DiscountItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`

export const Text = styled.div<{ color: string }>`
  width: 46%; // 임의 지정 수정 필요할듯
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: start;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${(props) => props.color};
`

export const More = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 13px;
  margin-top: 5px;

  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: center;

  color: #000000;

  cursor: pointer;
`

export const EmptyAlertComment = styled.span`
  display: inline-block;

  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;

  text-align: center;

  color: #767676;
`
