import { User } from '@prisma/client'
import { create } from 'zustand'

type Store = {
  user: User|null
  setUser: (data:User) => void
}

export const useUser = create<Store>()((set) => ({
  user: null,
  setUser: (data:User) => set(() => ({ user: data })),
}))

