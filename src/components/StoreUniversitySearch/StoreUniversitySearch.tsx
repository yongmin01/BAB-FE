import { useState, ChangeEvent } from 'react'
import {
  StyledSearchInput,
  StyledDropdownList,
  StyledDropdownItem,
  StyledErrorMessage,
  StyledSearchInputContainer,
  StyledLabel,
} from './StoreUniversitySearch.style'
import errorIcon from '@assets/RegisterStoreInfo/warnning.svg'
import { getUniversities } from '@apis/getUnivetsities'
import useDebounce from '@hooks/useDebounce'

interface University {
  universityId: number
  universityName: string
  universityLogo: string
  universityAddress: string
}

interface UniversitySearchProps {
  school: {
    value: string
    setValue: (value: string) => void
    error: string | null
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
  }
}

export default function StoreUniversitySearch({
  school,
}: UniversitySearchProps) {
  const [universitySearch, setUniversitySearch] = useState('')
  const [universityResults, setUniversityResults] = useState<University[]>([])

  const debouncedSearch = useDebounce(async (value: string) => {
    if (value) {
      try {
        const results = await getUniversities(value)
        console.log(results)
        setUniversityResults(results)
      } catch (error) {
        console.error('대학 검색 컴포넌트 오류', error)
      }
    } else {
      setUniversityResults([])
    }
  }, 1000)

  const handleUniversitySearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUniversitySearch(value)
    debouncedSearch(value)
  }

  const handleUniversitySelect = (university: string) => {
    school.setValue(university)
    setUniversitySearch(university)
    setUniversityResults([])
  }

  return (
    <>
      <StyledSearchInputContainer>
        <StyledLabel>학교 선택</StyledLabel>
        {school.error && (
          <StyledErrorMessage>
            <img src={errorIcon} alt="Error icon" />
            {school.error}
          </StyledErrorMessage>
        )}
      </StyledSearchInputContainer>

      <StyledSearchInput
        type="text"
        placeholder="학교 선택"
        value={universitySearch}
        onChange={handleUniversitySearch}
        className={school.error ? 'invalid' : ''}
      />
      {universityResults.length > 0 && (
        <StyledDropdownList>
          {universityResults.map((university) => (
            <StyledDropdownItem
              key={university.universityId}
              onClick={() => handleUniversitySelect(university.universityName)}
            >
              <img src={university.universityLogo} alt="University Logo" />
              <div>
                <div>{university.universityName}</div>
                <div>{university.universityAddress}</div>
              </div>
            </StyledDropdownItem>
          ))}
        </StyledDropdownList>
      )}
    </>
  )
}
