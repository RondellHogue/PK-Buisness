import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { Heart, Shield, Search, Users } from 'lucide-react'

const stats = [
  { value: '10,000+', label: 'Pet owners helped' },
  { value: '25+', label: 'Insurers compared' },
  { value: '$2.4M', label: 'In vet bills covered' },
  { value: '4.8/5', label: 'Average user rating' },
]

const values = [
  {
    icon: Search,
    title: 'Unbiased comparison',
    text: 'We lay out the facts on every plan so you can compare coverage, deductibles, and reimbursement side by side without the sales pressure.',
  },
  {
    icon: Shield,
    title: 'Education first',
    text: 'Most pet owners do not learn about insurance until they are facing a frightening vet bill. We want to change that with clear, honest guidance.',
  },
  {
    icon: Heart,
    title: 'Pets come first',
    text: 'Every recommendation we make is rooted in one question: what gives this animal the best chance at a long, healthy life?',
  },
  {
    icon: Users,
    title: 'Built for families',
    text: 'Whether you have one rescue kitten or a houseful of dogs, we help you find protection that fits your household and your budget.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <PageHeader />
      <main>
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 pb-12 text-center">
          <p className="text-sm font-medium text-blue-600 mb-3">Our Mission</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white text-balance">
            Raising awareness, one pet at a time
          </h1>
          <p className="mt-5 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed text-pretty">
            Pet Keepings is a pet insurance awareness effort built on a simple belief: no family
            should have to choose between their savings and their pet&apos;s life.
          </p>
        </section>

        {/* Stats */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 p-6 text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-blue-600">{s.value}</div>
                <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Long form story */}
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <div className="prose-custom space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">Why we started</h2>
            <p>
              Pet Keepings began the way a lot of good ideas do, out of frustration. A few years ago,
              one of our founders rushed their Labrador, Cooper, to an emergency clinic after he
              swallowed a tennis ball. The surgery saved his life, but the bill came to just under
              $6,000. Cooper recovered fully, yet the experience left a lasting mark. How many
              families, faced with the same moment, would have been forced to say no?
            </p>
            <p>
              That question became the heart of our work. We discovered that the vast majority of pet
              owners in this country have no insurance for their animals, often because they simply do
              not know it exists or assume it is too complicated to be worth it. Meanwhile, the cost of
              veterinary medicine has been rising steadily, driven by advances that now let vets treat
              conditions that were untreatable a generation ago, from chemotherapy to orthopedic
              reconstruction.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white pt-4">How pet insurance actually works</h2>
            <p>
              At its core, pet insurance functions as a reimbursement model. You continue to visit any
              licensed veterinarian you trust. When your pet needs care, you pay the clinic and then
              submit a claim to your insurer. After you meet an annual deductible, the company pays you
              back a set percentage of the eligible costs, commonly between 70 and 90 percent, up to the
              limits of your policy.
            </p>
            <p>
              Plans generally fall into a few categories. Accident-only coverage is the most affordable
              and handles injuries such as broken bones or swallowed objects. Accident and illness plans,
              the most popular choice, add protection for conditions like cancer, diabetes, allergies, and
              infections. Some insurers also offer optional wellness packages that help offset the cost of
              routine care such as vaccines and annual exams. Understanding the waiting periods,
              deductibles, and reimbursement rates of each plan is the key to choosing wisely, and that is
              exactly where we come in.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white pt-4">What we do</h2>
            <p>
              Pet Keepings is not an insurer, and we never sell policies. Instead, we gather the providers
              worth considering into one place, translate the fine print into plain language, and give you
              the tools to compare them honestly. Our goal is for every visitor to leave knowing more than
              they did when they arrived, whether or not they ever buy a plan. Because the real mission has
              never been about insurance. It has always been about making sure more pets get the care they
              deserve.
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
