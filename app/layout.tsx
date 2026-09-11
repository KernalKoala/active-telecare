import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/next"
import { Inter, Nunito } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' })

export const metadata: Metadata = {
  title: 'Active Telecare - Remote Healthcare Services',
  description: 'Professional telecare and remote healthcare monitoring services',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${nunito.variable} font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
