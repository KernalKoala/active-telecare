import Header from '@/components/Header'
import Products from '@/components/Products'
import Footer from '@/components/Footer'

export default function ProductsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Products />
      </div>
      <Footer />
    </main>
  )
}
