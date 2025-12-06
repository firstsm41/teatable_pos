'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store'
import Navbar from './Navbar'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { store } = useAuthStore()

  useEffect(() => {
    if (!store) {
      router.push('/')
    }
  }, [store, router])

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-800"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
