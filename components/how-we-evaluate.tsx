'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ClipboardCheck, Scale, RefreshCw, BadgeDollarSign, ArrowRight } from 'lucide-react'

const criteria = [
  {
    icon: ClipboardCheck,
    title: 'What we look at',
    text: 'Coverage types, waiting periods, reimbursement levels, deductible options, annual limits, the claims process, and whether a usable mobile app exists.',
  },
  {
    icon: Scale,
    title: 'How we compare',
    text: 'Every provider is measured against the same criteria, so differences reflect the plans themselves rather than how a company markets them.',
  },
  {
    icon: RefreshCw,
    title: 'How we form recommendations',
    text: 'We match plan strengths to specific situations, like budget-conscious owners or older pets, and explain the reasoning instead of naming a single winner.',
  },
  {
    icon: BadgeDollarSign,
    title: 'How affiliates are handled',
    text: 'Some links earn us a commission. That funding does not change our assessments, the criteria, or the order providers appear in.',
  },
]

export function HowWeEvaluate() {
  return (
    <section id="how-we-evaluate" className="py-20 md:py-28 bg-white dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-12"
        >
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Our Approach</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white text-balance">
            How we evaluate providers
          </h2>
          <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed text-pretty">
            We compare pet insurance the way you might if you had time to read every policy document.
            Here is the process behind the comparisons on this site.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          {criteria.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center mb-3 sm:mb-4">
                <c.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white mb-2">{c.title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{c.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/methodology" className="inline-flex items-center gap-1.5 font-medium text-blue-600 hover:text-blue-700">
            Read our full review methodology <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/how-we-make-money" className="inline-flex items-center gap-1.5 font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
            How we make money
          </Link>
        </div>
      </div>
    </section>
  )
}
