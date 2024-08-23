import styled, { keyframes } from 'styled-components'

const BounceInBottom = keyframes`
0% {
    transform: translateY(500px);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    transform: translateY(0);
    animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    transform: translateY(65px);
    animation-timing-function: ease-in;
  }
  72% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  81% {
    transform: translateY(28px);
    animation-timing-function: ease-in;
  }
  90% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  95% {
    transform: translateY(8px);
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
`
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
  animation: ${BounceInBottom} 1.1s both;
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
