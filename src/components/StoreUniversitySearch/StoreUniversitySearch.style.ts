import styled from 'styled-components'
import search from '@assets/RegisterStoreInfo/search.svg'

export const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
`

export const StyledSearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
`

export const StyledLabel = styled.p`
  font-weight: 600;
  font-size: 12px;
  color: #000000;
  margin-bottom: 8px;
  text-align: start;
  width: 347px;
  padding-left: 6px;
`

export const StyledSearchInput = styled.input`
  width: 342px;
  height: 36px;
  padding-left: 10px;
  margin-bottom: 10px;
  border: 0.4px solid #e7e7e7;
  border-radius: 5px;
  background-image: url(${search});
  background-position: right 10px center;
  background-repeat: no-repeat;
  background-size: 20px;
  &.invalid {
    border: 0.4px solid #ff4d4d;
    background-color: #fff0f0;
  }
`

export const StyledDropdownList = styled.ul`
  padding: 0;
  background-color: #fff;
  border: 0.4px solid #ccc;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
  width: 90%;
`

export const StyledDropdownItem = styled.li`
  padding: 10px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease;

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 4px;
  }

  div {
    font-size: 14px;
    line-height: 1.2;

    div:first-child {
      font-weight: 500;
      color: #333;
    }

    div:last-child {
      color: #888;
    }
  }
`

export const StyledErrorMessage = styled.div`
  color: #ff5757;
  font-size: 10px;
  font-weight: 400;
  display: flex;
  align-items: center;
  white-space: nowrap;
  img {
    margin-right: 5px;
    height: 13px;
    width: 13px;
  }
`
