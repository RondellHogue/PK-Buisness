import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, Outfit } from 'next/font/google'
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

const outfit = Outfit({
  variable: '--font-outfit',
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${outfit.variable} bg-background`}>
      <head>
        <meta name="impact-site-verification" value="95c87286-baec-4dfa-ae89-cf284a79b4f4" />
        {/* Apply the theme before paint to avoid a flash. Defaults to dark on first
            visit (no stored preference) for all devices. A plain inline script runs
            synchronously in <head> before the body paints (next/script's
            beforeInteractive is not reliable for this in the App Router). */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`,
          }}
        />
      </head>
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
