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
import storeInfoStore from '@stores/storeInfoStore'
import { LoginStore } from '@stores/loginStore'
import { getOperatingHours } from '@apis/getOperatingHours'

const days = ['월', '화', '수', '목', '금', '토', '일']
const serverDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

type BreakTimeGroup = {
  start: string
  end: string
  selectedDays: boolean[]
}

export default function EditSecondRegisterStoreInfo() {
  const { kakao_token } = LoginStore((state) => state)
  const storeInfo = storeInfoStore(
    (state) => state.storeInfos[state.storeInfos.length - 1],
  )
  const storeId = storeInfo?.id
  const navigate = useNavigate()
  const [breakTimes, setBreakTimes] = useState<BreakTimeType[]>([
    {
      start: '09:00',
      end: '22:00',
      selectedDays: Array(days.length).fill(false),
    },
  ])

  const [operatingHours, setOperatingHours] = useState<OperatingHour[]>(
    days.map((day) => ({
      day,
      openTime: '09:00',
      closeTime: '22:00',
      breakTime: {},
    })),
  )

  const error = useErrorInput('')
  const [checkedDays, setCheckedDays] = useState<boolean[]>(
    Array(days.length).fill(false),
  )

  useEffect(() => {
    const fetchOperatingHours = async () => {
      try {
        if (storeId) {
          const hours = await getOperatingHours(storeId)

          const initialOperatingHours = serverDays.map((serverDay, index) => {
            const hour = hours.find((h) => h.day === serverDay)
            return {
              day: days[index],
              openTime: hour?.openTime || '09:00',
              closeTime: hour?.closeTime || '22:00',
              breakTime: hour?.breakTime || {},
            }
          })

          // 브레이크 타임을 그룹화하여 설정
          const groupedBreakTimes = groupBreakTimes(hours)

          setOperatingHours(initialOperatingHours)
          setCheckedDays(hours.map((hour) => hour.openTime !== null))
          setBreakTimes(groupedBreakTimes)
        }
      } catch (error) {
        console.error('운영시간 불러오기 실패', error)
      }
    }

    fetchOperatingHours()
  }, [storeId])

  // 동일한 시간대를 가진 브레이크 타임을 그룹화하는 함수
  const groupBreakTimes = (hours: OperatingHour[]): BreakTimeGroup[] => {
    const groupedBreakTimes: BreakTimeGroup[] = []

    hours.forEach((hour, index) => {
      const lastGroup = groupedBreakTimes[groupedBreakTimes.length - 1]

      if (
        lastGroup &&
        lastGroup.start === hour.breakTime?.startTime &&
        lastGroup.end === hour.breakTime?.endTime
      ) {
        lastGroup.selectedDays[index] = true
      } else {
        const selectedDays = Array(days.length).fill(false)
        selectedDays[index] = true

        groupedBreakTimes.push({
          start: hour.breakTime?.startTime || '09:00',
          end: hour.breakTime?.endTime || '22:00',
          selectedDays,
        })
      }
    })

    return groupedBreakTimes
  }

  const handleNext = async () => {
    if (!checkedDays.includes(true)) {
      error.setError('운영 시간을 작성해 주세요.')
    } else {
      const payload = checkedDays
        .map((checked, index) => {
          if (checked) {
            const breakTime = breakTimes.find((bt) => bt.selectedDays[index])

            const formatTime = (time: string) => {
              return time.length === 5 ? `${time}:00` : time
            }

            const operatingHour: OperatingHour = {
              day: serverDays[index],
              openTime: formatTime(operatingHours[index].openTime),
              closeTime: formatTime(operatingHours[index].closeTime),
              breakTime: breakTime
                ? {
                    startTime: formatTime(breakTime.start),
                    endTime: formatTime(breakTime.end),
                  }
                : {},
            }

            return operatingHour
          }
          return null
        })
        .filter(Boolean)

      try {
        console.log(payload)
        const response = await patchOperatingHours(
          storeId,
          payload as OperatingHour[],
          kakao_token,
        )
        console.log(response)

        if (response.isSuccess) {
          navigate('/editsuccess')
        } else {
          console.error(response.message)
        }
      } catch (e) {
        console.error('운영시간 등록 실패', e)
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
      <HeaderTitle title="운영 시간 수정" $icon="back" onClick={handleBack} />
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
                  value={operatingHours[index].openTime}
                  onChange={(e) =>
                    handleTimeChange(index, 'openTime', e.target.value)
                  }
                />
                <StyledTimeText>부터</StyledTimeText>
                <StyledTimeInput
                  type="time"
                  value={operatingHours[index].closeTime}
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
