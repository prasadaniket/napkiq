import type { Metadata, Viewport } from 'next'
import { Outfit, Lora } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Napkiq CMS | Restaurant Management Portal',
  description: 'Napkiq internal CMS for managing outlets, menus, reviews, and customer data.',
  icons: {
    icon: [{ url: '/logo/logo-circle.png', type: 'image/png' }],
    apple: '/logo/logo-circle.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#D64238',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${outfit.variable} ${lora.variable}`}>
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#ffffff',
              color: '#00021D',
              border: '1px solid rgba(0, 2, 29, 0.08)',
              borderRadius: '10px',
              fontSize: '13.5px',
              boxShadow: '0 4px 12px rgba(0, 2, 29, 0.05)',
            },
            success: { iconTheme: { primary: '#16a34a', secondary: '#ffffff' } },
            error:   { iconTheme: { primary: '#dc2626', secondary: '#ffffff' } },
          }}
        />
      </body>
    </html>
  )
}
