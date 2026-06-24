'use client'

import { motion } from 'framer-motion'
import { Shield, DollarSign, Heart, Zap } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Comprehensive Coverage',
    description: 'From accidents to illnesses, find plans that protect your pet when it matters most.',
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'No hidden fees. Compare costs across providers and find what fits your budget.',
  },
  {
    icon: Heart,
    title: 'Wellness Options',
    description: 'Preventive care add-ons for routine check-ups, vaccinations, and dental cleanings.',
  },
  {
    icon: Zap,
    title: 'Fast Claims',
    description: 'Most providers process claims within days. Some offer direct vet payment.',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3"
          >
            Why Pet Insurance
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-white"
          >
            Peace of mind for pet parents
          </motion.h2>
        </div>

        {/* Features Grid — two-up on mobile, four-up on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-5">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
