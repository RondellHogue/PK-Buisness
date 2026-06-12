'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What is pet insurance and how does it work?',
    a: 'Pet insurance is a health care policy for your pet that reimburses you for certain medical expenses. You pay a monthly premium, and when your pet needs care, you pay the vet directly and then submit a claim. Once you meet your deductible, the insurer reimburses you a percentage of the covered costs, typically between 70% and 90%.',
  },
  {
    q: 'Does pet insurance cover pre-existing conditions?',
    a: 'In most cases, no. Pre-existing conditions, which are illnesses or injuries that showed signs before your coverage started or during a waiting period, are generally not covered. This is why it is best to enroll your pet while they are young and healthy.',
  },
  {
    q: 'What is a waiting period?',
    a: 'A waiting period is the time between when you sign up for a policy and when your coverage actually begins. Accident coverage often starts within a few days, while illness coverage may have a waiting period of 14 days or more. Some orthopedic conditions can have waiting periods of up to six months.',
  },
  {
    q: 'How much does pet insurance typically cost?',
    a: 'Costs vary based on your pet\u2019s species, breed, age, and where you live, as well as the level of coverage you choose. On average, dog owners pay between $30 and $70 per month, while cat owners usually pay between $15 and $40 per month.',
  },
  {
    q: 'Can I use any veterinarian?',
    a: 'Yes. Unlike human health insurance, most pet insurance plans let you visit any licensed veterinarian, including specialists and emergency animal hospitals. You are not restricted to a network of providers.',
  },
  {
    q: 'What is the difference between accident-only and comprehensive plans?',
    a: 'Accident-only plans cover injuries such as broken bones, bite wounds, and swallowed objects. Comprehensive plans, sometimes called accident and illness plans, also cover illnesses like cancer, infections, and chronic conditions. Comprehensive plans cost more but offer far broader protection.',
  },
  {
    q: 'Is wellness or routine care covered?',
    a: 'Standard plans usually do not include routine care like vaccinations, dental cleanings, or annual checkups. However, many insurers offer optional wellness add-ons for an extra monthly fee if you want help budgeting for preventive care.',
  },
  {
    q: 'At what age should I insure my pet?',
    a: 'The earlier the better. Insuring your pet as a puppy or kitten means fewer pre-existing conditions and lower premiums. That said, you can enroll a pet at almost any age, though some insurers set upper age limits for new enrollments.',
  },
  {
    q: 'How do I file a claim?',
    a: 'After your pet receives treatment, you pay the vet and then submit a claim with your itemized invoice. Most insurers let you submit claims through a mobile app or website. Reimbursement is typically issued within a few days to a couple of weeks.',
  },
  {
    q: 'Can I cancel my policy at any time?',
    a: 'Yes. Pet insurance policies are not long-term contracts, so you can cancel at any time. Many providers also offer a money-back guarantee within the first 30 days if you have not filed a claim.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left gap-4"
      >
        <span className="text-base md:text-lg font-medium text-zinc-900 dark:text-white">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-blue-600 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-zinc-600 dark:text-zinc-400 leading-relaxed">{a}</p>
      )}
    </div>
  )
}

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <PageHeader />
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-blue-600 mb-3">Frequently Asked Questions</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white text-balance">
            Pet insurance, answered
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 text-pretty">
            Everything you need to know before choosing a plan for your furry family member.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 md:px-8">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">Still have questions?</p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
          >
            Contact us
          </a>
        </div>
      </main>
      <Footer />
    </div>
  )
}
