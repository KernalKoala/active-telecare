'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export const ADMIN_BAR_HEIGHT = 36 // px

interface AdminBarProps {
  /** Where the action button links to */
  buttonHref: string
  /** Label shown on the action button */
  buttonLabel: string
  /** Only render when an admin is signed in (used on the public site) */
  requireAuth?: boolean
}

export default function AdminBar({ buttonHref, buttonLabel, requireAuth = false }: AdminBarProps) {
  const [hasSession, setHasSession] = useState(false)

  useEffect(() => {
    if (!requireAuth) return
    supabase.auth.getUser().then(({ data }) => setHasSession(!!data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(!!session?.user)
    })
    return () => subscription.unsubscribe()
  }, [requireAuth])

  const visible = requireAuth ? hasSession : true

  // Push the page down so the fixed admin bar doesn't cover content
  useEffect(() => {
    document.body.style.paddingTop = visible ? `${ADMIN_BAR_HEIGHT}px` : ''
    return () => {
      document.body.style.paddingTop = ''
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      className="fixed top-0 left-0 w-full z-[60] bg-gray-900 text-white text-sm"
      style={{ height: ADMIN_BAR_HEIGHT }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <span className="flex items-center gap-2 text-gray-300">
          <svg className="w-4 h-4 text-[#3ebdad]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="hidden sm:inline">You are signed in as an admin</span>
        </span>
        <Link
          href={buttonHref}
          className="inline-flex items-center gap-1.5 bg-[#3ebdad] hover:bg-[#35a89a] text-white font-medium px-3 py-1 rounded transition-colors"
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  )
}
