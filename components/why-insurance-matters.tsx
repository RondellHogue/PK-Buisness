'use client'

import { motion } from 'framer-motion'
import { TrendingUp, AlertTriangle, Heart, Clock } from 'lucide-react'

const reasons = [
  {
    icon: TrendingUp,
    title: 'Rising Veterinary Costs',
    description: 'Veterinary care costs have increased over 60% in the past decade, with no signs of slowing down.',
    stat: '+60%',
    statLabel: 'Cost increase',
  },
  {
    icon: AlertTriangle,
    title: 'Emergency Surgery Expenses',
    description: 'A single emergency surgery can cost anywhere from $2,000 to $10,000 or more, often with little warning.',
    stat: '$5,000+',
    statLabel: 'Average emergency',
  },
  {
    icon: Heart,
    title: 'Unexpected Illnesses',
    description: 'Chronic conditions like diabetes, cancer, or heart disease require ongoing treatment that adds up quickly.',
    stat: '1 in 4',
    statLabel: 'Pets affected',
  },
  {
    icon: Clock,
    title: 'Long-term Treatment Costs',
    description: 'Managing ongoing conditions can cost thousands annually, making insurance a smart financial decision.',
    stat: '$3,000+',
    statLabel: 'Per year',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function WhyInsuranceMatters() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <span className="inline-block text-sm font-medium text-primary mb-4">Why It Matters</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
            Pet Healthcare Costs Are Rising
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Understanding the financial reality of pet ownership helps you prepare for the unexpected 
            and make decisions that protect both your pet and your budget.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={itemVariants}
              className="group relative glass-card rounded-2xl p-6 hover:bg-card/90 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <reason.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2">{reason.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{reason.description}</p>

              {/* Stat */}
              <div className="pt-4 border-t border-border/50">
                <div className="text-2xl font-bold text-primary">{reason.stat}</div>
                <div className="text-xs text-muted-foreground">{reason.statLabel}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
