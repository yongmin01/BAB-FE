import { create } from 'zustand'
import { OperatingHour } from 'src/types/SecondRegisterStoreInfoTypes'

interface OperatingHoursStoreState {
  operatingHoursPayload: OperatingHour[]
  setOperatingHoursPayload: (payload: OperatingHour[]) => void
}

const useOperatingHoursStore = create<OperatingHoursStoreState>((set) => ({
  operatingHoursPayload: [],
  setOperatingHoursPayload: (payload) =>
    set(() => ({
      operatingHoursPayload: payload,
    })),
}))

export default useOperatingHoursStore
