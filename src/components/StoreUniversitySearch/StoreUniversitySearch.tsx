import React, { useState, ChangeEvent, useEffect } from 'react'
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
import { useDebounce } from '@hooks/useDebounce'

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
  containerRef: React.RefObject<HTMLDivElement>
}

export const StoreUniversitySearch = React.memo(function StoreUniversitySearch({
  school,
  containerRef,
}: UniversitySearchProps) {
  const [universitySearch, setUniversitySearch] = useState('')
  const [universityResults, setUniversityResults] = useState<University[]>([])

  const debouncedSearchTerm = useDebounce(universitySearch, 1000)

  useEffect(() => {
    setUniversitySearch(school.value)
  }, [school.value])

  useEffect(() => {
    const handleSearch = async () => {
      if (debouncedSearchTerm) {
        try {
          const results = await getUniversities(debouncedSearchTerm)
          setUniversityResults(results)

          if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
          }
        } catch (error) {
          console.error('대학 검색 컴포넌트 오류', error)
        }
      }
    }

    handleSearch()
  }, [debouncedSearchTerm, containerRef])

  const handleUniversitySearch = (e: ChangeEvent<HTMLInputElement>) => {
    setUniversitySearch(e.target.value)
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
})
