'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import AdminBar, { ADMIN_BAR_HEIGHT } from './AdminBar'

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setIsAdmin(!!data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session?.user)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <>
      <AdminBar requireAuth buttonHref="/admin" buttonLabel="Admin Dashboard" />
      <header
        className={`bg-white/90 shadow-sm fixed w-full z-50 transition-all duration-300 ${scrolled ? 'h-16 md:h-20' : 'h-20 md:h-32'}`}
        style={{ top: isAdmin ? ADMIN_BAR_HEIGHT : 0 }}
      >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <Link href="/" aria-label="Active Telecare home">
          <img src="/images/logo.svg" alt="Active Telecare" className={`transition-all duration-300 ${scrolled ? 'h-12 md:h-14' : 'h-16 md:h-24'}`} />
        </Link>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-bold uppercase h-full items-center font-inter">
          <li className="h-full flex items-center"><Link href="/" className={pathname === '/' ? 'text-[#3ebdad] border-b-4 border-[#3ebdad] h-full flex items-center' : 'text-gray-700 hover:text-[#3ebdad]'}>Home</Link></li>
          <li className="h-full flex items-center"><Link href="/about" className={pathname === '/about' ? 'text-[#3ebdad] border-b-4 border-[#3ebdad] h-full flex items-center' : 'text-gray-700 hover:text-[#3ebdad]'}>About Us</Link></li>
          <li className="h-full flex items-center"><Link href="/services" className={pathname === '/services' ? 'text-[#3ebdad] border-b-4 border-[#3ebdad] h-full flex items-center' : 'text-gray-700 hover:text-[#3ebdad]'}>Services</Link></li>
          <li className="h-full flex items-center"><Link href="/products" className={pathname === '/products' ? 'text-[#3ebdad] border-b-4 border-[#3ebdad] h-full flex items-center' : 'text-gray-700 hover:text-[#3ebdad]'}>Products</Link></li>
          <li className="h-full flex items-center"><Link href="/contact" className={pathname === '/contact' ? 'text-[#3ebdad] border-b-4 border-[#3ebdad] h-full flex items-center' : 'text-gray-700 hover:text-[#3ebdad]'}>Contact Us</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 border-t">
          <ul className="flex flex-col font-inter">
            <li><Link href="/" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-3 ${pathname === '/' ? 'text-[#3ebdad] bg-gray-50' : 'text-gray-700'}`}>Home</Link></li>
            <li><Link href="/about" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-3 ${pathname === '/about' ? 'text-[#3ebdad] bg-gray-50' : 'text-gray-700'}`}>About Us</Link></li>
            <li><Link href="/products" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-3 ${pathname === '/products' ? 'text-[#3ebdad] bg-gray-50' : 'text-gray-700'}`}>Products</Link></li>
            <li><Link href="/services" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-3 ${pathname === '/services' ? 'text-[#3ebdad] bg-gray-50' : 'text-gray-700'}`}>Services</Link></li>
            <li><Link href="/contact" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-3 ${pathname === '/contact' ? 'text-[#3ebdad] bg-gray-50' : 'text-gray-700'}`}>Contact Us</Link></li>
          </ul>
        </div>
      )}
    </header>
    </>
  )
}
