'use client'

import { motion } from 'framer-motion'
import { Star, ExternalLink, Check } from 'lucide-react'

const providers = [
  {
    name: 'Healthy Paws',
    rating: 4.9,
    reviews: 12500,
    monthlyPrice: '$30 - $60',
    deductible: '$100 - $500',
    reimbursement: '70% - 90%',
    waitingPeriod: '15 days',
    coverageLimit: 'Unlimited',
    highlights: ['No annual limits', 'Fast claim processing', 'Covers hereditary conditions'],
  },
  {
    name: 'Embrace',
    rating: 4.8,
    reviews: 9800,
    monthlyPrice: '$25 - $70',
    deductible: '$200 - $1,000',
    reimbursement: '70% - 90%',
    waitingPeriod: '14 days',
    coverageLimit: '$5,000 - $30,000',
    highlights: ['Wellness rewards', 'Diminishing deductible', 'Alternative therapies'],
  },
  {
    name: 'Pets Best',
    rating: 4.7,
    reviews: 8200,
    monthlyPrice: '$20 - $55',
    deductible: '$50 - $500',
    reimbursement: '70% - 90%',
    waitingPeriod: '14 days',
    coverageLimit: '$5,000 - Unlimited',
    highlights: ['Budget-friendly options', 'Quick enrollment', 'Routine care add-on'],
  },
  {
    name: 'Lemonade',
    rating: 4.6,
    reviews: 6500,
    monthlyPrice: '$15 - $50',
    deductible: '$100 - $500',
    reimbursement: '70% - 90%',
    waitingPeriod: '14 days',
    coverageLimit: '$5,000 - $100,000',
    highlights: ['AI-powered claims', 'Low premiums', 'Modern app experience'],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function CoverageComparison() {
  return (
    <section id="comparison" className="relative py-24 lg:py-32 gradient-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary mb-4">Compare Options</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
            Research & Compare Providers
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            We&apos;ve researched the top pet insurance providers so you can make an informed decision. 
            Compare coverage details, pricing, and customer reviews.
          </p>
        </motion.div>

        {/* Provider Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {providers.map((provider) => (
            <motion.div
              key={provider.name}
              variants={itemVariants}
              className="glass-card rounded-3xl p-6 lg:p-8 hover:border-primary/40 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  {/* Logo Placeholder */}
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3">
                    <span className="text-lg font-bold text-muted-foreground">
                      {provider.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{provider.name}</h3>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span className="font-semibold text-foreground">{provider.rating}</span>
                  <span className="text-sm text-muted-foreground">({provider.reviews.toLocaleString()})</span>
                </div>
              </div>

              {/* Coverage Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-muted/50 rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">Monthly Premium</div>
                  <div className="font-semibold text-foreground">{provider.monthlyPrice}</div>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">Deductible</div>
                  <div className="font-semibold text-foreground">{provider.deductible}</div>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">Reimbursement</div>
                  <div className="font-semibold text-foreground">{provider.reimbursement}</div>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">Waiting Period</div>
                  <div className="font-semibold text-foreground">{provider.waitingPeriod}</div>
                </div>
              </div>

              {/* Coverage Limit */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-6">
                <div className="text-xs text-muted-foreground mb-1">Annual Coverage Limit</div>
                <div className="font-semibold text-primary">{provider.coverageLimit}</div>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <div className="text-sm font-medium text-foreground mb-3">Coverage Highlights</div>
                <ul className="space-y-2">
                  {provider.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                  View Details
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl glass px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  Visit Provider
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-sm text-muted-foreground text-center max-w-2xl mx-auto"
        >
          * Pricing and coverage details are estimates and may vary based on pet age, breed, location, and selected plan. 
          Always verify details directly with the provider.
        </motion.p>
      </div>
    </section>
  )
}
