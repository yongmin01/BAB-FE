import styled from 'styled-components'

export const StudentPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #f8f8f8;
  padding-top: 58px;
  padding-bottom: 90px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
  margin-top: 12px;
`
