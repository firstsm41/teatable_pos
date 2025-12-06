'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/store'
import { supabase } from '@/lib/supabase'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { store, logout } = useAuthStore()
  const [orderInfo, setOrderInfo] = useState({
    currentOrderNumber: 0,
    pendingOrders: 0,
    pendingItems: 0,
  })

  useEffect(() => {
    if (!store) return

    const fetchOrderInfo = async () => {
      // 대기 중인 주문 조회
      const { data: orders } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('store_id', store.id)
        .eq('status', 'pending')
        .order('order_number', { ascending: true })

      if (orders) {
        const pendingItems = orders.reduce((acc, order) => {
          return acc + (order.order_items?.filter((item: { is_checked: boolean }) => !item.is_checked).length || 0)
        }, 0)

        // 최신 주문번호 조회
        const { data: latestOrder } = await supabase
          .from('orders')
          .select('order_number')
          .eq('store_id', store.id)
          .order('order_number', { ascending: false })
          .limit(1)
          .single()

        setOrderInfo({
          currentOrderNumber: latestOrder?.order_number || 0,
          pendingOrders: orders.length,
          pendingItems,
        })
      }
    }

    fetchOrderInfo()

    // 실시간 구독
    const ordersChannel = supabase
      .channel('orders-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchOrderInfo)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'order_items' }, fetchOrderInfo)
      .subscribe()

    return () => {
      supabase.removeChannel(ordersChannel)
    }
  }, [store])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const navItems = [
    { path: '/home', label: '홈' },
    { path: '/menu-manage', label: '메뉴관리' },
    { path: '/pos', label: '포스기' },
    { path: '/orders', label: '주문확인' },
  ]

  return (
    <nav className="bg-amber-800 text-white px-4 py-3 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-bold text-lg">{store?.name}</span>
          <div className="hidden sm:flex gap-4 text-sm">
            <span className="bg-amber-700 px-3 py-1 rounded-full">
              현재 주문번호: <strong>{orderInfo.currentOrderNumber}</strong>
            </span>
            <span className="bg-amber-700 px-3 py-1 rounded-full">
              잔여 주문: <strong>{orderInfo.pendingOrders}</strong>건
            </span>
            <span className="bg-amber-700 px-3 py-1 rounded-full">
              잔여 메뉴: <strong>{orderInfo.pendingItems}</strong>개
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  pathname === item.path 
                    ? 'bg-amber-600' 
                    : 'hover:bg-amber-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm ml-2"
          >
            로그아웃
          </button>
        </div>
      </div>
      
      {/* 모바일용 주문 정보 */}
      <div className="sm:hidden flex gap-2 mt-2 text-xs">
        <span className="bg-amber-700 px-2 py-1 rounded">주문#{orderInfo.currentOrderNumber}</span>
        <span className="bg-amber-700 px-2 py-1 rounded">대기 {orderInfo.pendingOrders}건</span>
        <span className="bg-amber-700 px-2 py-1 rounded">메뉴 {orderInfo.pendingItems}개</span>
      </div>
    </nav>
  )
}
