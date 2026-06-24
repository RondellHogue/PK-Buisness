import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { InsuranceQuiz } from '@/components/insurance-quiz'

export const metadata = {
  title: 'Pet Insurance Recommendation Quiz | Pet Keepings',
  description:
    'Answer 5 quick questions and get an unbiased, transparent shortlist of pet insurance providers matched to your pet and priorities. Takes under 30 seconds.',
}

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <PageHeader />
      <main>
        <section className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 pb-6 text-center">
          <p className="text-sm font-medium text-blue-600 mb-3">Find Your Match</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white text-balance">
            Which pet insurance is right for you?
          </h1>
          <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-pretty">
            Answer 5 quick questions and we&apos;ll suggest providers that fit your pet and priorities. No email
            required, and we show you exactly why each one is recommended.
          </p>
        </section>
        <section className="px-6 pb-40 md:pb-56">
          <InsuranceQuiz />
        </section>
      </main>
      <Footer />
    </div>
  )
}
