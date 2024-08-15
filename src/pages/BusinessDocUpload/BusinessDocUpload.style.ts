import styled from 'styled-components'

export const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 400px;

  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: 0 auto; */
  padding: 58px 16px 16px;
  box-sizing: border-box;
`

export const StyledSection = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 16px;
`

export const StyledLabel = styled.p`
  font-weight: 600;
  font-size: 12px;
  color: #000000;
  margin-bottom: 8px;
  text-align: start;
  width: 347px;
  padding-left: 12px;
`
export const StyledUploadBox = styled.div`
  box-sizing: border-box;
  width: 347px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 5px;
  margin: 0 auto;
`

export const StyledUploadImg = styled.img`
  height: 63px;
  width: 63px;
  padding-top: 5%;
`

export const StyledUploadText = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #676767;
`

export const StyledButton = styled.button`
  width: 342px;
  height: 47px;
  background-color: #fdd100;
  color: white;
  font-size: 15px;
  font-weight: 800;
  border-radius: 10px;
  text-align: center;
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
`
