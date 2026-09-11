import Header from '@/components/Header'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
