import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Testimonials from '@/components/Testimonials'
import ContentGrid from '@/components/ContentGrid'
import TealBanner from '@/components/TealBanner'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Hero />
        <Testimonials />
        <ContentGrid />
        <TealBanner />
      </div>
      <Footer />
    </main>
  )
}
