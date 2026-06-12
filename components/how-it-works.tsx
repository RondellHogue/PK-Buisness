'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Compare Plans',
    description: 'Browse our curated list of top pet insurance providers and compare coverage options.',
  },
  {
    number: '02',
    title: 'Get a Quote',
    description: 'Enter your pet\'s details to receive personalized quotes from multiple providers.',
  },
  {
    number: '03',
    title: 'Enroll Online',
    description: 'Choose your plan and enroll in minutes. Coverage can start as soon as tomorrow.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-b from-blue-700/90 via-blue-200/60 to-white dark:from-blue-800/90 dark:via-zinc-800 dark:to-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-blue-100 mb-3"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-semibold text-white"
          >
            Get covered in 3 simple steps
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-zinc-200 dark:bg-zinc-700" />
              )}

              <div className="text-center">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-lg mb-6 relative z-10">
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
