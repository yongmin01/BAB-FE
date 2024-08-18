import { create } from 'zustand'

interface StudentInfo {
  studentName: string
  accountId: string
  isSchoolSet: boolean
  setStudentName: (studentName: string) => void
  setAccountId: (accountId: string) => void
  setIsSchoolSet: (school: boolean) => void
}

export const useStudentInfoStore = create<StudentInfo>((set) => ({
  studentName: '',
  accountId: '',
  isSchoolSet: false,
  setStudentName: (studentName) => set({ studentName: studentName }),
  setAccountId: (accountId) => set({ accountId: accountId }),
  setIsSchoolSet: (school) => set({ isSchoolSet: school }),
}))
