import { create } from 'zustand'

interface SchoolInfo {
  schoolName: string | null
  address: string | null
  setSchoolName: (schoolName: string) => void
  setAddress: (address: string) => void
}

export const useSchoolInfoStore = create<SchoolInfo>((set) => ({
  schoolName: null,
  address: null,
  setSchoolName: (schoolName) => set({ schoolName: schoolName }),
  setAddress: (address) => set({ address: address }),
}))
