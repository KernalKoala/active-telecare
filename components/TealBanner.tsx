import Link from 'next/link'

export default function TealBanner() {
  return (
    <section className="bg-[#3ebdad] py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-12">
          <svg className="w-16 h-16 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/>
          </svg>
          <div className="flex-grow">
            <h4 className="text-2xl font-bold text-white">
              Live confidently at home with our smart solutions that promote independence and provide peace of mind.
            </h4>
            <p className="text-xl text-white font-bold mt-4">
              Get in touch to arrange a no obligation chat with our experts.
            </p>
          </div>
          <Link href="/contact" className="bg-white text-[#3ebdad] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex-shrink-0">
            GET IN TOUCH
          </Link>
        </div>
      </div>
    </section>
  )
}
