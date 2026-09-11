import Header from '@/components/Header'
import About from '@/components/About'
import TealBanner from '@/components/TealBanner'
import Footer from '@/components/Footer'

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <About />
        <TealBanner />
      </div>
      <Footer />
    </main>
  )
}
