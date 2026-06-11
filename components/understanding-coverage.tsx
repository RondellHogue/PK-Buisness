'use client'

import { motion } from 'framer-motion'
import { Zap, Stethoscope, Sparkles, Shield } from 'lucide-react'

const coverageTypes = [
  {
    icon: Zap,
    title: 'Accident Coverage',
    description: 'Covers unexpected injuries like broken bones, torn ligaments, cuts, and foreign object ingestion.',
    features: ['Emergency vet visits', 'Surgery costs', 'X-rays & diagnostics', 'Medications'],
    highlight: false,
  },
  {
    icon: Stethoscope,
    title: 'Illness Coverage',
    description: 'Protects against diseases, infections, and chronic conditions requiring ongoing treatment.',
    features: ['Cancer treatment', 'Diabetes management', 'Allergies', 'Infections'],
    highlight: false,
  },
  {
    icon: Sparkles,
    title: 'Wellness Plans',
    description: 'Optional add-on covering routine care like vaccinations, dental cleanings, and annual checkups.',
    features: ['Vaccinations', 'Dental cleaning', 'Annual exams', 'Flea prevention'],
    highlight: false,
  },
  {
    icon: Shield,
    title: 'Comprehensive Protection',
    description: 'Complete coverage combining accident, illness, and wellness for maximum peace of mind.',
    features: ['All accident coverage', 'All illness coverage', 'Wellness benefits', 'Alternative therapies'],
    highlight: true,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export function UnderstandingCoverage() {
  return (
    <section id="learning-center" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary mb-4">Coverage Types</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
            Understanding Your Options
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Pet insurance comes in different forms. Understanding each type helps you choose 
            the right level of protection for your pet and budget.
          </p>
        </motion.div>

        {/* Coverage Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {coverageTypes.map((coverage) => (
            <motion.div
              key={coverage.title}
              variants={itemVariants}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                coverage.highlight
                  ? 'bg-gradient-to-br from-primary/20 via-card to-card border border-primary/30 glow-teal'
                  : 'glass-card hover:bg-card/90'
              }`}
            >
              {coverage.highlight && (
                <div className="absolute -top-3 left-8">
                  <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                  coverage.highlight ? 'bg-primary' : 'bg-primary/10'
                }`}>
                  <coverage.icon className={`w-7 h-7 ${
                    coverage.highlight ? 'text-primary-foreground' : 'text-primary'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{coverage.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{coverage.description}</p>
                  
                  <ul className="grid grid-cols-2 gap-2">
                    {coverage.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
