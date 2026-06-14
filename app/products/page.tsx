import Header from '@/components/Header'
import Products from '@/components/Products'
import TealBanner from '@/components/TealBanner'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

// Revalidate the cached catalog at most once a minute instead of hitting
// Supabase on every page load.
export const revalidate = 60

export default async function ProductsPage() {
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
