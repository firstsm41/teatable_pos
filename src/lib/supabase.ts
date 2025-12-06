import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 타입 정의
export interface Store {
  id: string
  code: string
  name: string
}

export interface Menu {
  id: string
  store_id: string
  name: string
  price: number
  is_active: boolean
}

export interface Order {
  id: string
  store_id: string
  order_number: number
  status: 'pending' | 'completed'
  created_at: string
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  menu_id: string
  menu_name: string
  price: number
  quantity: number
  is_checked: boolean
}
