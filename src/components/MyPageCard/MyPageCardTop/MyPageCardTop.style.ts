import styled from 'styled-components'

export const ImgBtnContainer = styled.div<{ $gap?: string }>`
  margin: 0 auto;
  padding-right: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.$gap};
`
export const Btn = styled.button<{ $padding: string }>`
  height: 47px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  padding: 11px ${(props) => props.$padding};
  box-sizing: border-box;
  background: #fdd100;
  border: 0.4px solid #e1ba00;
  box-shadow: 2px 2px 2px rgba(127, 127, 127, 0.07);
  border-radius: 30px;

  font-weight: 600;
  font-size: 16;
  color: #f8f8f8;
`
export const StyledArrow = styled.img`
  width: 12px;
  height: 12px;
`
export const EditSchool = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.32px;
  text-decoration-line: underline;
  color: #767676;

  cursor: pointer;
`
