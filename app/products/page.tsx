import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ProductsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <section id="products" className="pt-32 bg-white">
          <div className="bg-[#3ebdad] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-center text-white">Our Products</h2>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <p className="text-center text-gray-700">Products content coming soon...</p>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
