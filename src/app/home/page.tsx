'use client'

import { useRouter } from 'next/navigation'
import AuthGuard from '@/components/AuthGuard'

export default function HomePage() {
  const router = useRouter()

  const menuItems = [
    { path: '/menu-manage', label: '메뉴 관리', icon: '📋', color: 'bg-blue-500 hover:bg-blue-600' },
    { path: '/pos', label: '포스기', icon: '💳', color: 'bg-green-500 hover:bg-green-600' },
    { path: '/orders', label: '주문 확인', icon: '📦', color: 'bg-purple-500 hover:bg-purple-600' },
  ]

  return (
    <AuthGuard>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          메뉴를 선택하세요
        </h2>
        
        <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`${item.color} text-white rounded-2xl shadow-lg transition-all transform hover:scale-105 active:scale-95 w-40 h-40 sm:w-48 sm:h-48 flex flex-col items-center justify-center gap-3`}
            >
              <span className="text-5xl">{item.icon}</span>
              <span className="text-xl font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </AuthGuard>
  )
}
