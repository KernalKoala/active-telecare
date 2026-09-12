import type { Metadata } from 'next'
import Header from '@/components/Header'
import Products from '@/components/Products'
import TealBanner from '@/components/TealBanner'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

// Revalidate the cached catalog at most once a minute instead of hitting
// Supabase on every page load.
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Product Catalogue | Active Telecare',
  description: 'Browse the Active Telecare product catalogue, pricing, and detailed product information.',
}

export default async function CataloguePage() {
  const { data } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Products products={data || []} />
        <TealBanner />
      </div>
      <Footer />
    </main>
  )
}
