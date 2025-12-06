'use client'

import { useEffect, useState } from 'react'
import AuthGuard from '@/components/AuthGuard'
import { supabase, Menu } from '@/lib/supabase'
import { useAuthStore } from '@/lib/store'

interface CartItem {
  menu: Menu
  quantity: number
}

export default function PosPage() {
  const { store } = useAuthStore()
  const [menus, setMenus] = useState<Menu[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [nextOrderNumber, setNextOrderNumber] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!store) return

    const fetchData = async () => {
      // 메뉴 조회
      const { data: menuData } = await supabase
        .from('menus')
        .select('*')
        .eq('store_id', store.id)
        .eq('is_active', true)
        .order('created_at', { ascending: true })
      
      setMenus(menuData || [])

      // 다음 주문번호 조회
      const { data: lastOrder } = await supabase
        .from('orders')
        .select('order_number')
        .eq('store_id', store.id)
        .order('order_number', { ascending: false })
        .limit(1)
        .single()

      setNextOrderNumber((lastOrder?.order_number || 0) + 1)
    }

    fetchData()
  }, [store])

  const addToCart = (menu: Menu) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.menu.id === menu.id)
      if (existing) {
        return prev.map((item) =>
          item.menu.id === menu.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { menu, quantity: 1 }]
    })
  }

  const updateQuantity = (menuId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.menu.id === menuId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.menu.price * item.quantity,
    0
  )

  const handleReset = () => {
    if (cart.length === 0 || confirm('주문을 초기화하시겠습니까?')) {
      setCart([])
    }
  }

  const handleOrder = async () => {
    if (!store || cart.length === 0) return
    setLoading(true)

    try {
      // 주문 생성
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          store_id: store.id,
          order_number: nextOrderNumber,
          status: 'pending',
        })
        .select()
        .single()

      if (orderError) throw orderError

      // 주문 상세 생성
      const orderItems = cart.map((item) => ({
        order_id: order.id,
        menu_id: item.menu.id,
        menu_name: item.menu.name,
        price: item.menu.price,
        quantity: item.quantity,
        is_checked: false,
      }))

      await supabase.from('order_items').insert(orderItems)

      // 초기화
      setCart([])
      setNextOrderNumber((prev) => prev + 1)
      alert(`주문번호 ${nextOrderNumber}번 주문이 완료되었습니다!`)
    } catch (error) {
      console.error(error)
      alert('주문 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthGuard>
      <div className="p-4 max-w-4xl mx-auto">
        {/* 주문번호 표시 */}
        <div className="bg-amber-600 text-white text-center py-3 rounded-xl mb-4">
          <span className="text-lg">주문번호</span>
          <span className="text-3xl font-bold ml-3">#{nextOrderNumber}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 메뉴 버튼들 */}
          <div>
            <h3 className="font-bold text-lg mb-3">메뉴 선택</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {menus.map((menu) => (
                <button
                  key={menu.id}
                  onClick={() => addToCart(menu)}
                  className="bg-white hover:bg-amber-50 border-2 border-amber-200 hover:border-amber-400 rounded-xl p-4 text-center transition-all active:scale-95"
                >
                  <div className="font-semibold">{menu.name}</div>
                  <div className="text-amber-600 font-bold">
                    {menu.price.toLocaleString()}원
                  </div>
                </button>
              ))}
            </div>
            {menus.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                등록된 메뉴가 없습니다.<br />메뉴 관리에서 메뉴를 추가해주세요.
              </div>
            )}
          </div>

          {/* 장바구니 */}
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-bold text-lg mb-3">주문 내역</h3>
            
            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                메뉴를 선택해주세요
              </div>
            ) : (
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div
                    key={item.menu.id}
                    className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                  >
                    <div>
                      <div className="font-semibold">{item.menu.name}</div>
                      <div className="text-amber-600 text-sm">
                        {(item.menu.price * item.quantity).toLocaleString()}원
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.menu.id, -1)}
                        className="w-8 h-8 bg-gray-300 hover:bg-gray-400 rounded-full font-bold"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.menu.id, 1)}
                        className="w-8 h-8 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 합계 및 버튼 */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">총 합계</span>
                <span className="text-2xl font-bold text-amber-600">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-xl font-semibold"
                >
                  초기화
                </button>
                <button
                  onClick={handleOrder}
                  disabled={cart.length === 0 || loading}
                  className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold"
                >
                  {loading ? '처리 중...' : '주문하기'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
