import styled from 'styled-components'

export const SchoolSearchPageContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding-top: 58px;

  background-color: #f8f8f8;
`

export const PageContent = styled.div`
  width: 100%;

  padding: 0 24px;
  box-sizing: border-box;
  margin-top: 54px;

  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: -0.32px;

  color: #000000;

  display: flex;
  flex-direction: column;
  flex: 1;
`

export const Step = styled.div`
  margin-bottom: 58px;
`
export const StyledForm = styled.form`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-right: 18px;
  border: 0.4px solid #f8f8f8;
  border-radius: 5px;
  box-sizing: border-box;

  background: #ffffff;
`
export const StyledInput = styled.input`
  width: 100%;
  height: 36px;
  border: none;
  padding-left: 11px;
  &:focus {
    outline: none;
  }

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  color: #000000;
`
export const Result = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`
export const SchoolLogo = styled.img`
  width: 66px;
  height: 66px;

  border: 0.4px solid #767676;
  border-radius: 5px;
  box-sizing: border-box;
`
export const School = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
export const SchoolName = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;

  color: #000000;
`
export const SchoolAddress = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;

  color: #676767;
`

export const ControlBtn = styled.div`
  width: 100%;

  display: flex;
  gap: 22px;

  margin-top: auto;
  margin-bottom: 5.6vh;
`

export const Alert = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 104px;
`
export const Text = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #000000;
`
export const SubText = styled.span`
  display: inline-block;

  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;

  color: #767676;
`
export const SearchValue = styled.span`
  color: #ff4d4d;
`
export const CandidateSchoolBox = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 60px;
  border: 0.4px solid #767676;
  border-radius: 5px;
  background-color: #ffffff;
  margin-top: 10px;
  padding: 0 8px;
  overflow: scroll;
`
export const CandidateSchool = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;

  border-bottom: 0.1px solid #767676;
  padding: 8px;
  color: #767676;
  &:last-child {
    border: none;
  }
`
