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
  title: 'Napkiq | Artisanal Woodfired Pizzas & Fresh Bakes',
  description:
    'Enjoy authentic woodfired pizzas, artisanal sourdough bakes, and premium coffees at Napkiq. Visit our outlets in Boisar, Palghar, Vasai, and Virar for fresh, stone-baked goodness.',
  keywords: [
    'Napkiq',
    'Napkiq Pizza',
    'Boisar Pizza',
    'Palghar Pizza',
    'Vasai Cafe',
    'Virar Cafe',
    'Woodfired Pizza',
    'Artisanal Sourdough',
    'Fresh Bakes',
    'Italian Pizza',
    'Nizamuddin Pizza',
    'Coffee Shop',
    'Gourmet Pizza',
    'Food Delivery',
    'Restaurant Feedback',
    'Restaurant Review',
  ],
  icons: {
    icon: [{ url: '/images/logo/logo.png', type: 'image/png' }],
    apple: '/images/logo/logo.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#D64238',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${lora.variable}`}>
      <body>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '12px',
              fontSize: '14px',
              background: '#00021D',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.1)',
            },
            success: { style: { background: '#00021D', color: '#fff' } },
            error: { style: { background: '#E74C3C', color: '#fff' } },
          }}
        />
      </body>
    </html>
  )
}
