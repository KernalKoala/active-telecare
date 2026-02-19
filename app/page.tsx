import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Testimonials from '@/components/Testimonials'
import ContentGrid from '@/components/ContentGrid'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Hero />
        <Testimonials />
        <ContentGrid />
      </div>
      <Footer />
    </main>
  )
}
