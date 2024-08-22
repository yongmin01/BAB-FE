import styled from 'styled-components'

export const DiscountContainer = styled.div`
  position: relative;
  width: 100%;
  color: #767676;
  border-radius: 20px;
  padding: 10px 5px 10px 5px;
  font-size: 13px;
  box-shadow: 0 0 5px;
  text-align: center;
  z-index: 1;
  transition: scale 300ms;
  &:active {
    scale: 1.1;
  }
`
