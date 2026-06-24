import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { Heart, Shield, Search, Scale } from 'lucide-react'
import Link from 'next/link'

const principles = [
  { value: 'Same criteria for everyone', label: 'Every provider is assessed against the same checklist' },
  { value: 'Reasoning shown', label: 'We explain why a plan may suit a situation' },
  { value: 'Updated regularly', label: 'Provider details are reviewed and refreshed' },
  { value: 'Disclosed funding', label: 'We say plainly how the site is paid for' },
]

const values = [
  {
    icon: Search,
    title: 'Comparison over persuasion',
    text: 'We lay out coverage, deductibles, waiting periods, and reimbursement side by side so you can weigh plans yourself, rather than steering you toward one answer.',
  },
  {
    icon: Shield,
    title: 'Education first',
    text: 'Many pet owners only learn how insurance works while facing a frightening vet bill. We try to explain the trade-offs clearly and early, in plain language.',
  },
  {
    icon: Scale,
    title: 'Both sides of every plan',
    text: 'No provider is perfect. We aim to describe the genuine advantages and the real drawbacks of each option, including who a plan is not a good fit for.',
  },
  {
    icon: Heart,
    title: 'Useful whether or not you buy',
    text: 'Our goal is for you to leave understanding your options better than when you arrived, even if you decide insurance is not right for you.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <PageHeader />
      <main>
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 pb-12 text-center">
          <p className="text-sm font-medium text-blue-600 mb-3">About Pet Keepings</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white text-balance">
            A research resource for pet insurance decisions
          </h1>
          <p className="mt-5 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed text-pretty">
            Pet Keepings is an independent guide that compares pet insurance providers and explains how
            coverage works. We are not an insurer and we do not sell policies. Our aim is to make a
            confusing category easier to understand.
          </p>
        </section>

        {/* Principles (replaces fabricated stats) */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((s) => (
              <div
                key={s.value}
                className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 p-6"
              >
                <div className="text-base font-semibold text-blue-600">{s.value}</div>
                <div className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Long form story */}
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <div className="prose-custom space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">Why this site exists</h2>
            <p>
              Pet insurance is hard to shop for. Coverage terms differ between companies, important
              details are buried in policy documents, and most comparison content online is written to
              sell a specific plan. We built Pet Keepings to be the resource we wished existed: a place
              that gathers the providers worth considering, translates the fine print into plain language,
              and compares them honestly.
            </p>
            <p>
              We are a small, independent effort rather than a large company, and we think that is worth
              stating plainly. We do not claim a long corporate history or a headcount we do not have.
              What we can offer is a consistent, transparent process and a commitment to describing both
              the strengths and the weaknesses of every option.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white pt-4">How pet insurance actually works</h2>
            <p>
              Most pet insurance follows a reimbursement model. You continue to visit any licensed
              veterinarian you trust. When your pet needs care, you pay the clinic and then submit a
              claim to your insurer. After you meet an annual deductible, the company pays you back a set
              percentage of the eligible costs, commonly between 70 and 90 percent, up to the limits of
              your policy.
            </p>
            <p>
              Plans generally fall into a few categories. Accident-only coverage is the most affordable
              and handles injuries such as broken bones or swallowed objects. Accident and illness plans,
              the most popular choice, add protection for conditions like cancer, diabetes, allergies, and
              infections. Some insurers also offer optional wellness packages that help offset routine care
              such as vaccines and annual exams. Waiting periods, deductibles, reimbursement rates, and
              exclusions are where plans differ most, and those details are exactly what our comparisons
              focus on.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white pt-4">Our research philosophy</h2>
            <p>
              When we summarize a provider, we draw on publicly available information such as the
              company&apos;s own policy documents and patterns reported across public review sources. We look
              for recurring themes rather than isolated anecdotes, and we try to present positive and
              negative findings together. We do not invent customer stories or quote reviews we cannot
              substantiate. You can read more about this in our{' '}
              <Link href="/methodology" className="text-blue-600 hover:underline">Review Methodology</Link> and{' '}
              <Link href="/editorial-standards" className="text-blue-600 hover:underline">Editorial Standards</Link>.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white pt-4">How we stay independent</h2>
            <p>
              Some links on this site are affiliate links, which means we may earn a commission if you
              purchase a policy after clicking through. That funding keeps the site free, but it does not
              change our assessments or the order in which providers are compared. We explain this in
              detail on our{' '}
              <Link href="/how-we-make-money" className="text-blue-600 hover:underline">How We Make Money</Link> and{' '}
              <Link href="/affiliate-disclosure" className="text-blue-600 hover:underline">Affiliate Disclosure</Link> pages.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="bg-zinc-50 dark:bg-zinc-800/30 border-y border-zinc-100 dark:border-zinc-800 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white text-center mb-12">
              What we stand for
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="flex gap-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6"
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                    <v.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">{v.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
