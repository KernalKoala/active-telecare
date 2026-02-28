import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    console.log('Fetching products from Supabase...')
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    console.log('Supabase response:', { data, error })

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    console.log('Returning products:', data?.length || 0)
    return NextResponse.json({ products: data || [] }, { status: 200 })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products', details: error }, { status: 500 })
  }
}
