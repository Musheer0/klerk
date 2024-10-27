import { UserWithAccount } from '@/lib/types'
import { create } from 'zustand'

type Store = {
  user: UserWithAccount|null
  setUser: (data:UserWithAccount) => void
}

export const useUser = create<Store>()((set) => ({
  user: null,
  setUser: (data:UserWithAccount) => set(() => ({ user: data })),
}))

