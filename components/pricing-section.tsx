'use client'

import { motion } from 'framer-motion'

const treatmentCosts = [
  { condition: 'Cancer Treatment', cost: '$5,000 - $10,000', bar: 100 },
  { condition: 'ACL Surgery', cost: '$3,500 - $5,000', bar: 70 },
  { condition: 'Bone Fracture', cost: '$2,000 - $4,000', bar: 55 },
  { condition: 'Foreign Object Removal', cost: '$1,500 - $3,000', bar: 45 },
  { condition: 'Bloat Surgery', cost: '$2,500 - $5,000', bar: 65 },
  { condition: 'Skin Allergies (annual)', cost: '$500 - $2,000', bar: 30 },
]

const insuranceCosts = [
  { type: 'Dog (Small)', monthly: '$25', annual: '$300' },
  { type: 'Dog (Medium)', monthly: '$35', annual: '$420' },
  { type: 'Dog (Large)', monthly: '$45', annual: '$540' },
  { type: 'Cat', monthly: '$20', annual: '$240' },
  { type: 'Bird', monthly: '$15', annual: '$180' },
  { type: 'Rabbit', monthly: '$18', annual: '$216' },
]

export function PricingSection() {
  return (
    <section id="pricing" data-paw-region="gradient" className="relative overflow-hidden pt-24 pb-28 bg-blue-700 dark:bg-blue-800">
      {/* Blurred decorative glow blobs for depth in the blue field */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-10 -left-24 h-80 w-80 rounded-full bg-blue-400/40 blob-blur" />
      <div aria-hidden="true" className="pointer-events-none absolute top-32 -right-20 h-96 w-96 rounded-full bg-sky-300/30 blob-blur" />
      <div aria-hidden="true" className="pointer-events-none absolute top-1/3 left-1/3 h-72 w-72 rounded-full bg-blue-500/30 blob-blur" />

      {/* Clean hard break into the next section — no gradient at all. A single
          minimal accent hairline marks the seam so it reads intentional. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
        <div className="h-px w-[88%] bg-gradient-to-r from-transparent via-sky-300/50 to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-blue-100 tracking-wide uppercase">Pricing</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            Understanding Pet Care Costs
          </h2>
          <p className="text-lg text-blue-100/90 max-w-2xl mx-auto">
            See how much common treatments cost and how affordable insurance can be
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Treatment Costs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-[0_30px_60px_-15px_rgba(2,6,23,0.45),0_12px_24px_-12px_rgba(2,6,23,0.35)] ring-1 ring-black/5 dark:ring-white/5"
          >
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">Common Treatment Costs</h3>
            <div className="space-y-5">
              {treatmentCosts.map((item, i) => (
                <div key={item.condition}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{item.condition}</span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-white">{item.cost}</span>
                  </div>
                  <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.bar}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-6">
              * Costs are estimates and may vary by location and severity
            </p>
          </motion.div>

          {/* Insurance Costs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-[0_30px_60px_-15px_rgba(2,6,23,0.45),0_12px_24px_-12px_rgba(2,6,23,0.35)] ring-1 ring-black/5 dark:ring-white/5"
          >
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">Average Insurance Costs</h3>
            <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
              <table className="w-full">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-200">Pet Type</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-200">Monthly</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-200">Annual</th>
                  </tr>
                </thead>
                <tbody>
                  {insuranceCosts.map((item, i) => (
                    <tr key={item.type} className={i % 2 === 0 ? 'bg-white dark:bg-zinc-800' : 'bg-zinc-50 dark:bg-zinc-800/50'}>
                      <td className="py-3 px-4 text-sm text-zinc-700 dark:text-zinc-300">{item.type}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-blue-600 dark:text-blue-400">{item.monthly}</td>
                      <td className="py-3 px-4 text-sm text-right text-zinc-500 dark:text-zinc-400">{item.annual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Pro tip:</strong> A single emergency surgery can cost more than 10 years of insurance premiums.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
