import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import nav from '@assets/RegisterStoreInfo/secondstep.svg'
import errorIcon from '@assets/RegisterStoreInfo/warnning.svg'
import {
  OperatingHour,
  BreakTimeType,
} from 'src/types/SecondRegisterStoreInfoTypes'

import {
  StyledAddTimeButton,
  StyledBreakTimeContainer,
  StyledButton,
  StyledCheckBox,
  StyledContainer,
  StyledDayLabel,
  StyledErrorMessage,
  StyledFormContainer,
  StyledInputContainer,
  StyledLabel,
  StyledNavImg,
  StyledNavImgWrapper,
  StyledNavText,
  StyledScrollableContent,
  StyledTimeInput,
  StyledTimeRow,
  StyledTimeTable,
  StyledTimeText,
} from './SecondRegisterStoreInfo.style'
import { BreakTime } from '@components/BreakTime/BreakTime'
import { useErrorInput } from '@hooks/useErrorInput'
import HeaderTitle from '@components/HeaderTitle/HeaderTitle'
import { patchOperatingHours } from '@apis/patchOperatingHours'
import useOperatingHoursStore from '@stores/operatingHoursStore'
import storeInfoStore from '@stores/storeInfoStore' // Importing storeInfoStore

const token = import.meta.env.VITE_APP_API_TOKEN

const days = ['월', '화', '수', '목', '금', '토', '일']
const serverDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

export default function EditSecondRegisterStoreInfo() {
  const navigate = useNavigate()
  const { operatingHoursPayload, setOperatingHoursPayload } =
    useOperatingHoursStore()

  // Get storeId from storeInfoStore
  const storeInfo = storeInfoStore(
    (state) => state.storeInfos[state.storeInfos.length - 1],
  )
  const storeId = storeInfo?.id

  const [breakTimes, setBreakTimes] = useState<BreakTimeType[]>([])
  const [operatingHours, setOperatingHours] = useState<OperatingHour[]>([])
  const [checkedDays, setCheckedDays] = useState<boolean[]>(
    Array(days.length).fill(false),
  )

  const error = useErrorInput('')

  useEffect(() => {
    if (operatingHoursPayload.length > 0) {
      const initialOperatingHours = operatingHoursPayload.map(
        (hour: OperatingHour) => ({
          day: hour.day,
          openTime: hour.openTime.slice(0, 5), // Removing seconds
          closeTime: hour.closeTime.slice(0, 5), // Removing seconds
          breakTime: hour.breakTime,
        }),
      )

      const initialCheckedDays = serverDays.map((day) =>
        operatingHoursPayload.some((hour: OperatingHour) => hour.day === day),
      )

      const initialBreakTimes = initialOperatingHours
        .map((hour) => {
          const selectedDays = serverDays.map(
            (serverDay) => hour.day === serverDay,
          )

          return {
            start: hour.breakTime?.startTime?.slice(0, 5) || '09:00',
            end: hour.breakTime?.endTime?.slice(0, 5) || '22:00',
            selectedDays,
          }
        })
        .filter((bt) => bt.start !== '09:00' || bt.end !== '22:00')

      setOperatingHours(initialOperatingHours)
      setCheckedDays(initialCheckedDays)
      setBreakTimes(
        initialBreakTimes.length
          ? initialBreakTimes
          : [
              {
                start: '09:00',
                end: '22:00',
                selectedDays: Array(days.length).fill(false),
              },
            ],
      )
    }
  }, [operatingHoursPayload])

  const handleNext = async () => {
    if (!checkedDays.includes(true)) {
      error.setError('운영 시간을 작성해 주세요.')
    } else {
      const payload = checkedDays
        .map((checked, index) => {
          if (checked) {
            const breakTime = breakTimes.find((bt) => bt.selectedDays[index])

            const operatingHour: OperatingHour = {
              day: serverDays[index],
              openTime: `${operatingHours[index].openTime}:00`,
              closeTime: `${operatingHours[index].closeTime}:00`,
              breakTime: breakTime
                ? {
                    startTime: `${breakTime.start}:00`,
                    endTime: `${breakTime.end}:00`,
                  }
                : {},
            }

            return operatingHour
          }
          return null
        })
        .filter(Boolean)

      try {
        if (storeId) {
          const response = await patchOperatingHours(
            storeId,
            payload as OperatingHour[],
            token,
          )

          if (response.isSuccess) {
            setOperatingHoursPayload(payload as OperatingHour[]) // Save the payload to Zustand store
            navigate('/registerstoresuccess')
          } else {
            console.error(response.message)
            error.setError(response.message)
          }
        } else {
          error.setError('Store ID를 찾을 수 없습니다.')
        }
      } catch (e) {
        console.error('운영시간 수정 실패', e)
        error.setError('운영 시간 수정에 실패했습니다.')
      }
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleAddBreakTime = () => {
    setBreakTimes([
      ...breakTimes,
      {
        start: '09:00',
        end: '22:00',
        selectedDays: Array(days.length).fill(false),
      },
    ])
  }

  const handleCheckboxChange = (index: number) => {
    const newCheckedDays = [...checkedDays]
    newCheckedDays[index] = !newCheckedDays[index]
    setCheckedDays(newCheckedDays)
  }

  const handleTimeChange = (
    index: number,
    field: 'openTime' | 'closeTime',
    value: string,
  ) => {
    const newOperatingHours = [...operatingHours]
    newOperatingHours[index][field] = value
    setOperatingHours(newOperatingHours)
  }

  return (
    <StyledContainer>
      <HeaderTitle title="가게 정보 수정" $icon="back" onClick={handleBack} />
      <StyledNavImgWrapper>
        <StyledNavImg src={nav} />
        <StyledNavText>
          <div>기본 정보</div>
          <div>영업 시간</div>
          <div>메뉴 등록</div>
        </StyledNavText>
      </StyledNavImgWrapper>
      <StyledScrollableContent>
        <StyledFormContainer>
          <StyledInputContainer>
            <StyledLabel>가게 운영 시간</StyledLabel>
            {error.error && (
              <StyledErrorMessage>
                <img src={errorIcon} alt="Error icon" />
                {error.error}
              </StyledErrorMessage>
            )}
          </StyledInputContainer>
          <StyledTimeTable className={error.error ? 'invalid' : ''}>
            {days.map((day, index) => (
              <StyledTimeRow key={index}>
                <StyledDayLabel>{day}</StyledDayLabel>
                <StyledTimeInput
                  type="time"
                  value={operatingHours[index]?.openTime || '09:00'}
                  onChange={(e) =>
                    handleTimeChange(index, 'openTime', e.target.value)
                  }
                />
                <StyledTimeText>부터</StyledTimeText>
                <StyledTimeInput
                  type="time"
                  value={operatingHours[index]?.closeTime || '22:00'}
                  onChange={(e) =>
                    handleTimeChange(index, 'closeTime', e.target.value)
                  }
                />
                <StyledTimeText>까지</StyledTimeText>
                <StyledCheckBox
                  checked={checkedDays[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
              </StyledTimeRow>
            ))}
          </StyledTimeTable>
          <StyledLabel>브레이크 타임</StyledLabel>
          <StyledBreakTimeContainer>
            {breakTimes.map((time, index) => (
              <BreakTime
                key={index}
                time={time}
                index={index}
                setBreakTimes={setBreakTimes}
                breakTimes={breakTimes}
              />
            ))}
            <StyledAddTimeButton onClick={handleAddBreakTime}>
              다른 시간 추가 설정하기
            </StyledAddTimeButton>
          </StyledBreakTimeContainer>
          <StyledButton onClick={handleNext}>수정하기</StyledButton>
        </StyledFormContainer>
      </StyledScrollableContent>
    </StyledContainer>
  )
}
