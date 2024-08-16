import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface LoginStateType {
  user: string
  membertype: string
  isLogined: boolean
  kakao_token: string
  setUser: (user: string) => void
  setMembertype: (membertype: string) => void
  setIsLogined: (isLogined: boolean) => void
  setToken: (kakao_token: string) => void
}

export const LoginStore = create(
  persist<LoginStateType>(
    (set) => ({
      user: '',
      membertype: '', //사장님 or 학생
      isLogined: false,
      kakao_token: '',
      setUser: (user) => set({ user }),
      setMembertype: (membertype) => set({ membertype }),
      setIsLogined: (isLogined) => set({ isLogined }),
      setToken: (kakao_token) => set({ kakao_token }),
    }),
    {
      name: 'LoginStore',
    },
  ),
)
