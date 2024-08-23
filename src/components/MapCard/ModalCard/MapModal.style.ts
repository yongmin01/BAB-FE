import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  padding-bottom: 100px;
  z-index: 100;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
  height: 20%;
  border-radius: 15px;
  background: white;
`

export const TopWrapper = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 90%;
  height: 35%;
  padding-top: 15px;
  background-color: white;
`

export const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;
  height: 65%;
  padding-bottom: 20px;
  background-color: white;
`
export const IconWrapper = styled.div`
  width: 10%;
  font-size: 25px;
  cursor: pointer;
`
export const ButtonWrapper = styled.div`
  width: 50%;
  height: 50%;
  padding-bottom: 15px;
`
export const Button = styled.button`
  width: 100%;
  height: 100%;
  background: yellow;
  border: none;
  border-radius: 15px;
  cursor: pointer;
`
