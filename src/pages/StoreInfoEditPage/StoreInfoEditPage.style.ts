import styled from 'styled-components'

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 58px 16px 16px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
export const SubTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 85%;
  height: 60px;
  font-size: 1.2rem;
  color: #333;
  margin: 54px 0 0;
  font-weight: 700;
`

export const EditOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`

export const OptionButton = styled.button<{
  active?: string
  type?: 'default' | 'destructive'
}>`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 18px;
  margin: 8px 0;
  width: 342px;
  max-width: 342px;
  height: 50px;
  max-height: 50px;
  background-color: ${(props) =>
    props.active === props.type ? '#e7e7e7' : '#ffffff'};
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  font-weight: 500;
  line-height: 24px;
  color: ${(props) => (props.type === 'destructive' ? '#FF5757' : '#000')};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e7e7e7;
  }
`

export const NextButton = styled.button`
  position: absolute;
  bottom: 30px; /* 하단에서 간격 */
  width: calc(100% - 40px); /* 전체 폭에서 좌우 패딩을 제외 */
  max-width: 342px; /* 최대 너비 설정 */
  padding: 15px;
  background-color: #ffc107;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  box-sizing: border-box;
`
