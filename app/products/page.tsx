import Header from '@/components/Header'
import OurProducts from '@/components/OurProducts'
import TealBanner from '@/components/TealBanner'
import Footer from '@/components/Footer'

export default function ProductsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <OurProducts />
        <TealBanner />
      </div>
      <Footer />
    </main>
  )
}
