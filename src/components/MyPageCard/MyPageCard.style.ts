import styled from 'styled-components'

export const StyledCard = styled.div<{
  paddingTop: string
  paddingBottom: string
  paddingRignt?: string
}>`
  box-sizing: border-box;
  width: 342px;
  left: 24px;

  display: flex;
  flex-direction: column;
  align-items: start;

  padding-top: ${(props) => props.paddingTop};
  padding-bottom: ${(props) => props.paddingBottom};
  padding-left: 24px;
  padding-right: ${(props) => props.paddingRignt};

  background: #ffffff;
  box-shadow: 4px 4px 10px 4px rgba(67, 89, 105, 0.05);
  border-radius: 20px;
`
export const CardTitle = styled.div<{ paddingBottom?: string }>`
  padding-bottom: ${(props) => props.paddingBottom};

  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: #000000;
`
export const CardSubTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;

  letter-spacing: 0.01em;

  color: #676767;
`
