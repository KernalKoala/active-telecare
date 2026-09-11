import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Testimonials from '@/components/Testimonials'
import ContentGrid from '@/components/ContentGrid'
import TealBanner from '@/components/TealBanner'
import Footer from '@/components/Footer'

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

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
