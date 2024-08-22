import { useState } from 'react'
import {
  SearchBarContainer,
  SearchBarDiscountWrapper,
  SearchBarIconWrapper,
  SearchBarInput,
  SearchBarWrapper,
  SearchBarDiscountStyle,
} from '@components/MapCard/SearchCard/SearchBar.style'
import DiscountBar from '@components/MapCard/DiscountCard/DiscountBar'
import { IoIosSearch } from 'react-icons/io'

type Props = {
  handleFilterCheck: () => void
  handleSearchValue: (value: string) => void
  handleSendSearchValue: (value: string) => void
}

export default function SearchBar({
  handleFilterCheck,
  handleSearchValue,
  handleSendSearchValue,
}: Props) {
  const [data, setData] = useState<string>('')
  const [focus, setFocus] = useState(false)
  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (data !== '') {
        handleSendSearchValue(data)
        handleSearchValue(data)
      }
    }
  }

  return (
    <SearchBarContainer>
      <SearchBarWrapper $focus={focus}>
        <SearchBarIconWrapper
          onClick={() => {
            handleSearchValue(data)
          }}
        >
          <IoIosSearch />
        </SearchBarIconWrapper>
        <SearchBarInput
          type="text"
          placeholder="먹고 싶은 메뉴를 검색해보세요"
          value={data}
          onChange={(e) => handleValue(e)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </SearchBarWrapper>
      <SearchBarDiscountWrapper>
        <SearchBarDiscountStyle onClick={() => handleFilterCheck()}>
          <DiscountBar />
        </SearchBarDiscountStyle>
      </SearchBarDiscountWrapper>
    </SearchBarContainer>
  )
}
