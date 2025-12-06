import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Store } from './supabase'

interface AuthState {
  store: Store | null
  setStore: (store: Store | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      store: null,
      setStore: (store) => set({ store }),
      logout: () => set({ store: null }),
    }),
    { name: 'tea-table-auth' }
  )
)
