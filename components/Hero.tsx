import Link from 'next/link'

export default function Hero() {
  return (
    <section id="home" className="pt-32 bg-cover bg-center h-[60vh] flex items-center relative" style={{backgroundImage: 'url(/images/hero-image.jpg)'}}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-left w-full relative z-10">
        <div className="max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Professional Telecare Services
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8">
          Remote healthcare monitoring and support for your peace of mind
        </p>
        <Link href="/contact" className="border-2 border-white bg-transparent text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition inline-flex items-center gap-2">
          Get in touch
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        </div>
      </div>
    </section>
  )
}
