import Header from '@/components/Header'
import Services from '@/components/Services'
import Footer from '@/components/Footer'

export default function ServicesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Services />
      </div>
      <Footer />
    </main>
  )
}
