import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { SettingsProvider } from '@/lib/settings-context'
import { ThemeProvider } from '@/lib/theme-context'

const inter = Inter({ 
  variable: '--font-geist-sans', 
  subsets: ['latin'],
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pet Keepings',
  description: 'Understand pet insurance, compare coverage options, and make informed decisions that help protect both your pet and your finances. Independent research, clear information, simplified comparisons.',
  keywords: ['pet insurance', 'dog insurance', 'cat insurance', 'pet healthcare', 'veterinary costs', 'pet insurance comparison', 'pet insurance reviews'],
  openGraph: {
    title: 'Pet Keepings',
    description: 'Understand pet insurance, compare coverage options, and make informed decisions that help protect both your pet and your finances.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Pet Keepings',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Keepings',
    description: 'Understand pet insurance, compare coverage options, and make informed decisions.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} bg-background`}>
      <body className="font-sans antialiased bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
        <ThemeProvider>
          <SettingsProvider>
            {children}
          </SettingsProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
