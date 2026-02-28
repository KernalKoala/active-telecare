import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <p className="text-sm">&copy; {new Date().getFullYear()} Active Telecare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
