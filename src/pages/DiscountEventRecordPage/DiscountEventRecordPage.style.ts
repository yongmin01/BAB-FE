import styled from 'styled-components'

export const PageContainer = styled.div<{ events: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ events }) => (events ? 'flex-start' : 'center')};
  padding: 20px;
  background-color: #f8f8f8;
  width: 100%;
  height: 100%;
  overflow-y: ${({ events }) => (events === 'true' ? 'auto' : 'hidden')};
  box-sizing: border-box;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  z-index: 10;
`

export const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
`

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  position: absolute;
  left: 10px;
  z-index: 10;
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
export const EmptyStateContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  text-align: center;
`

export const EmptyStateMessage = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.9rem;
    color: #777;
  }
`

export const StartEventButton = styled.button`
  background-color: #ffffff;
  color: gray;
  font-size: 1rem;
  height: 40px;
  padding: 10px 20px;
  border: 1px solid #b0b0b0;
  font-weight: 400;
  border-radius: 20px;
  cursor: pointer;
  box-sizing: border-box;
`
