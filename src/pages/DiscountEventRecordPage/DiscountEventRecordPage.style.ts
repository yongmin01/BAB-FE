import styled from 'styled-components'

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 58px 20px 20px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const EventList = styled.div`
  width: 100%;
  margin-top: 20px;
`

export const EventItem = styled.div`
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`

export const EventTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
`

export const EventDescription = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  margin-top: 5px;
`

export const EventPeriod = styled.div`
  font-size: 0.8rem;
  color: gray;
  margin-top: 5px;
`
export const DeleteButton = styled.button`
  position: absolute;
  bottom: 15px;
  right: 15px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  box-sizing: border-box;
`
