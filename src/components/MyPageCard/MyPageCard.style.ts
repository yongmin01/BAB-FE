import styled from 'styled-components'

interface StyledCardProps {
  $paddingtop: string
  $paddingbottom: string
}
export const StyledCard = styled.div<StyledCardProps>`
  box-sizing: border-box;
  width: 342px;
  left: 24px;

  display: flex;
  flex-direction: column;
  align-items: start;

  padding-left: 24px;
  padding-top: ${(props) => props.$paddingtop};
  padding-bottom: ${(props) => props.$paddingbottom};

  background: #ffffff;
  box-shadow: 4px 4px 10px 4px rgba(67, 89, 105, 0.05);
  border-radius: 20px;
`

interface CardTitleProps {
  $paddingbottom?: string
}
export const CardTitle = styled.div<CardTitleProps>`
  padding-bottom: ${(props) => props.$paddingbottom};

  font-weight: 700;
  font-size: 20px;
  color: #000000;
`
