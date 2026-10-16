import type { Metadata } from 'next'
import Header from '@/components/Header'
import ProductOverview from '@/components/ProductOverview'
import TealBanner from '@/components/TealBanner'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Our Products | Active Telecare',
  description: 'Explore Active TeleCare Solutions careline systems, telecare sensors, alarms, personal safety devices, and key safes.',
}

export default function ProductsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-grow">
        <ProductOverview />
        <TealBanner />
      </div>
      <Footer />
    </main>
  )
}
