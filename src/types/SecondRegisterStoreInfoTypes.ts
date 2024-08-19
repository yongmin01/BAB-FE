export type OperatingHour = {
  day: string
  openTime: string
  closeTime: string
  breakTime: { startTime: string; endTime: string } | Record<string, never>
}

export type BreakTimeType = {
  start: string
  end: string
  selectedDays: boolean[]
}

export interface BreakTimeInputProps {
  time: BreakTimeType
  index: number
  setBreakTimes: React.Dispatch<React.SetStateAction<BreakTimeType[]>>
  breakTimes: BreakTimeType[]
}
