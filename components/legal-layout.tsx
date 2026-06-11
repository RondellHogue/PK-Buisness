import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <PageHeader />
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          {title}
        </h1>
        <p className="mt-3 text-sm text-zinc-400">Last updated: {updated}</p>
        <div className="mt-10 space-y-8 text-zinc-600 dark:text-zinc-400 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-900 dark:[&_h2]:text-white [&_h2]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
