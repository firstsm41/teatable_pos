'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/lib/store'

export default function LoginPage() {
  const router = useRouter()
  const { setStore } = useAuthStore()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error: dbError } = await supabase
        .from('stores')
        .select('*')
        .eq('code', code)
        .single()

      if (dbError || !data) {
        setError('유효하지 않은 코드입니다.')
        return
      }

      setStore(data)
      router.push('/home')
    } catch {
      setError('로그인 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-2">🍵 티테이블</h1>
          <p className="text-gray-600">POS 시스템</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              고유 코드 입력
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="매장 코드를 입력하세요"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-center text-2xl tracking-widest"
              maxLength={10}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !code}
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-6">
          테스트 코드: 1234
        </p>
      </div>
    </div>
  )
}
