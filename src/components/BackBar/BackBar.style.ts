import styled from 'styled-components'

export const CategoryHeader = styled.div`
  display: flex;
  background-color: #ffffff;
  width: 400px;
  height: 60px;
  font-size: 19px;
  font-weight: 600;
  align-items: center;
  padding: 20px;
  position: fixed;
  top: 0px;
  z-index: 4; /* 다른 요소 위로 보이도록 설정 */
`
export const BackBtn = styled.div`
  cursor: pointer;
  margin-right: 10px;
`
export const CategoryInfo = styled.div`
  cursor: pointer;
`
