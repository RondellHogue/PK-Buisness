'use client'

import { motion } from 'framer-motion'
import { Shield, Heart, DollarSign, Clock, ArrowRight } from 'lucide-react'

const benefits = [
  {
    icon: Shield,
    title: 'Financial Protection',
    description: 'Many accident and illness plans reimburse 70–90% of eligible vet bills, reducing the out-of-pocket cost of unexpected treatment.'
  },
  {
    icon: Heart,
    title: 'Decisions Without Cost Pressure',
    description: 'Coverage can make it easier to choose a treatment based on your pet\'s needs rather than the price of the bill alone.'
  },
  {
    icon: DollarSign,
    title: 'More Predictable Budgeting',
    description: 'A fixed monthly premium spreads the cost of care over time, though premiums commonly rise as a pet ages.'
  },
  {
    icon: Clock,
    title: 'Reimbursement Model',
    description: 'Most insurers reimburse you after you pay the vet. Processing times and approval depend on the policy and documentation.'
  },
]

// General, commonly cited industry context. These are framed as ranges and
// tendencies rather than precise guarantees, and apply to the category as a
// whole rather than to any single provider.
const considerations = [
  'Emergency and specialty visits frequently run from several hundred to several thousand dollars.',
  'Pre-existing conditions are generally excluded across the industry, so timing of enrollment matters.',
  'Waiting periods apply before coverage begins, and vary by provider and condition type.',
  'Reimbursement levels, deductibles, and annual limits change the real value of a policy.',
]

export function LearnMoreSection() {
  return (
    /* This white section is pulled up over the blue section above it and given
       rounded top corners, an upward depth shadow (so the blue appears to recede
       behind it) and a lit top "lip" — making it read as a raised shelf sitting in
       front of the blue. z-10 keeps it above the blue; no overflow-hidden so the
       floating button and shadows are never clipped. */
    <section
      id="learn-more"
      className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-zinc-50 dark:bg-zinc-800 pt-32 pb-24 shadow-[0_-18px_45px_-15px_rgba(2,6,23,0.55),inset_0_2px_0_0_rgba(255,255,255,0.9)] dark:shadow-[0_-18px_45px_-15px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.08)]"
    >
      {/* Floating CTA — same style as the hero "Start Saving" button. It straddles
          the shelf lip: mostly in the blue above, with its blue glow spilling onto
          the white ledge below. z-20 keeps it above the shelf surface. */}
      <a
        href="/quiz"
        className="group absolute left-1/2 -top-7 z-20 -translate-x-1/2 inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all hover:-translate-y-0.5 shadow-glow-blue hover:shadow-glow-blue-lg"
      >
        Find Your Match
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </a>

      <div className="max-w-6xl mx-auto px-6">
        {/* Why Pet Insurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-wide uppercase">Learn More</span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mt-3 mb-4">
            What Pet Insurance Actually Does
          </h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-pretty">
            A plain explanation of how coverage works, what it helps with, and the trade-offs worth weighing before you enroll.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">{benefit.title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Honest considerations panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-5 gap-8"
        >
          <div className="lg:col-span-3 bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Things Worth Knowing First</h3>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6 text-pretty">
              Pet insurance is not a single product. Coverage, exclusions, and pricing differ meaningfully between
              providers, and the &quot;best&quot; plan depends on your pet&apos;s age, breed, and your budget. The points below
              come up consistently when comparing policies.
            </p>
            <ul className="space-y-3">
              {considerations.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white flex flex-col">
            <h3 className="text-xl font-semibold mb-3">How We Can Help</h3>
            <p className="text-blue-100 leading-relaxed mb-6 text-pretty">
              We compare providers against the same criteria and explain the reasoning behind every comparison, so you
              can decide what fits rather than being sold a single answer.
            </p>
            <div className="mt-auto flex flex-col gap-3">
              <a
                href="/providers"
                className="inline-block w-full text-center py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition"
              >
                Compare Providers
              </a>
              <a
                href="/quiz"
                className="inline-block w-full text-center py-3 border border-white/40 text-white font-medium rounded-full hover:bg-white/10 transition"
              >
                Find Your Match
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
