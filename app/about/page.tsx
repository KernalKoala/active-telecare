import Header from '@/components/Header'
import About from '@/components/About'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <About />
      </div>
      <Footer />
    </main>
  )
}
