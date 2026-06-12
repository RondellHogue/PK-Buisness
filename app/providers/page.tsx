import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { ProvidersList } from '@/components/providers-list'

export const metadata = {
  title: 'Pet Insurance Providers | Pet Keepings',
  description:
    'Compare top pet insurance providers side by side, including Spot, Healthy Paws, Trupanion, Embrace, Pumpkin, Pets Best, Fetch, Figo, Lemonade, and ASPCA.',
}

export default function ProvidersPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <PageHeader />
      <main>
        <section className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 pb-10 text-center">
          <p className="text-sm font-medium text-blue-600 mb-3">Pet Insurance</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white text-balance">
            Compare top pet insurance providers
          </h1>
          <p className="mt-5 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed text-pretty">
            We&apos;ve gathered the leading providers in one place. Click any provider to visit their
            site and get a personalized quote.
          </p>
        </section>

        <section className="max-w-5xl mx-auto px-6 pb-20">
          <ProvidersList />
          <p className="mt-10 text-xs text-zinc-400 text-center max-w-2xl mx-auto">
            * Pricing and coverage details are estimates and may vary based on your pet&apos;s age,
            breed, location, and selected plan. Always confirm details directly with the provider.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
