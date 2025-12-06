'use client'

import { useEffect, useState } from 'react'
import AuthGuard from '@/components/AuthGuard'
import { supabase, Order, OrderItem } from '@/lib/supabase'
import { useAuthStore } from '@/lib/store'

export default function OrdersPage() {
  const { store } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    if (!store) return

    const { data } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('store_id', store.id)
      .eq('status', 'pending')
      .order('order_number', { ascending: true })

    setOrders(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()

    // 실시간 구독
    const channel = supabase
      .channel('orders-realtime')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'orders', filter: `store_id=eq.${store?.id}` },
        fetchOrders
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'order_items' },
        fetchOrders
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [store])

  const toggleItemCheck = async (item: OrderItem, order: Order) => {
    const newChecked = !item.is_checked
    
    await supabase
      .from('order_items')
      .update({ is_checked: newChecked })
      .eq('id', item.id)

    // 모든 아이템이 체크되었는지 확인
    const updatedItems = order.order_items?.map((i) =>
      i.id === item.id ? { ...i, is_checked: newChecked } : i
    )
    
    const allChecked = updatedItems?.every((i) => i.is_checked)
    
    if (allChecked) {
      await supabase
        .from('orders')
        .update({ status: 'completed' })
        .eq('id', order.id)
    }

    fetchOrders()
  }

  const currentOrder = orders[0]
  const nextOrder = orders[1]

  const OrderCard = ({ order, label }: { order: Order | undefined; label: string }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
      <div className={`py-3 px-4 ${label === '현재 주문' ? 'bg-green-500' : 'bg-blue-500'} text-white`}>
        <div className="flex justify-between items-center">
          <span className="font-semibold">{label}</span>
          {order && (
            <span className="text-2xl font-bold">#{order.order_number}</span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        {!order ? (
          <div className="text-center py-12 text-gray-400">
            대기 중인 주문이 없습니다
          </div>
        ) : (
          <div className="space-y-3">
            {order.order_items?.map((item) => (
              <label
                key={item.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                  item.is_checked
                    ? 'bg-gray-100'
                    : 'bg-amber-50 hover:bg-amber-100'
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.is_checked}
                  onChange={() => toggleItemCheck(item, order)}
                  className="w-6 h-6 rounded accent-green-500"
                />
                <div className={`flex-1 ${item.is_checked ? 'line-through text-gray-400' : ''}`}>
                  <div className="font-semibold">{item.menu_name}</div>
                  <div className="text-sm text-gray-500">
                    {item.price.toLocaleString()}원 × {item.quantity}개
                  </div>
                </div>
                <div className={`font-bold ${item.is_checked ? 'text-gray-400' : 'text-amber-600'}`}>
                  {item.quantity}개
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <AuthGuard>
      <div className="p-4 h-[calc(100vh-120px)]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            <OrderCard order={currentOrder} label="현재 주문" />
            <OrderCard order={nextOrder} label="다음 주문" />
          </div>
        )}
        
        {!loading && orders.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            주문을 기다리고 있습니다...
          </div>
        )}
      </div>
    </AuthGuard>
  )
}
