'use client'

import { useEffect, useState } from 'react'
import AuthGuard from '@/components/AuthGuard'
import { supabase, Menu } from '@/lib/supabase'
import { useAuthStore } from '@/lib/store'

export default function MenuManagePage() {
  const { store } = useAuthStore()
  const [menus, setMenus] = useState<Menu[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', price: '' })

  const fetchMenus = async () => {
    if (!store) return
    const { data } = await supabase
      .from('menus')
      .select('*')
      .eq('store_id', store.id)
      .eq('is_active', true)
      .order('created_at', { ascending: true })
    
    setMenus(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchMenus()
  }, [store])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!store || !formData.name || !formData.price) return

    if (editingId) {
      await supabase
        .from('menus')
        .update({ name: formData.name, price: parseInt(formData.price) })
        .eq('id', editingId)
    } else {
      await supabase
        .from('menus')
        .insert({ store_id: store.id, name: formData.name, price: parseInt(formData.price) })
    }

    setFormData({ name: '', price: '' })
    setEditingId(null)
    fetchMenus()
  }

  const handleEdit = (menu: Menu) => {
    setEditingId(menu.id)
    setFormData({ name: menu.name, price: menu.price.toString() })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    await supabase.from('menus').update({ is_active: false }).eq('id', id)
    fetchMenus()
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({ name: '', price: '' })
  }

  return (
    <AuthGuard>
      <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">메뉴 관리</h2>

        {/* 메뉴 추가/수정 폼 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="메뉴 이름"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
            />
            <input
              type="number"
              placeholder="가격"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full sm:w-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 sm:flex-none bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                {editingId ? '수정' : '추가'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 sm:flex-none bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  취소
                </button>
              )}
            </div>
          </div>
        </form>

        {/* 메뉴 목록 */}
        {loading ? (
          <div className="text-center py-8">로딩 중...</div>
        ) : menus.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            등록된 메뉴가 없습니다. 메뉴를 추가해주세요.
          </div>
        ) : (
          <div className="space-y-3">
            {menus.map((menu) => (
              <div
                key={menu.id}
                className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-lg">{menu.name}</h3>
                  <p className="text-amber-600 font-bold">{menu.price.toLocaleString()}원</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(menu)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(menu.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  )
}
