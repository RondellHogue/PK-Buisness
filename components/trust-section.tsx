'use client'

import { motion } from 'framer-motion'
import { Search, FileText, BarChart3, GraduationCap } from 'lucide-react'

const trustPoints = [
  {
    icon: Search,
    title: 'Independent Research',
    description: 'Our team conducts thorough, unbiased research on every provider we feature, analyzing coverage, pricing, and customer experiences.',
  },
  {
    icon: FileText,
    title: 'Clear Information',
    description: 'We break down complex insurance jargon into simple, understandable terms so you can make confident decisions.',
  },
  {
    icon: BarChart3,
    title: 'Simplified Comparisons',
    description: 'Compare providers side-by-side with standardized metrics that actually matter for your pet\'s coverage.',
  },
  {
    icon: GraduationCap,
    title: 'Educational Resources',
    description: 'Access comprehensive guides, articles, and tools designed to help you become an informed pet insurance consumer.',
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

export function TrustSection() {
  return (
    <section className="relative py-24 lg:py-32 gradient-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sm font-medium text-primary mb-4">Why PetKeepings</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground tracking-tight text-balance mb-6">
              Your Trusted Resource for Pet Insurance
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We believe every pet owner deserves access to clear, unbiased information. 
              Our mission is to simplify pet insurance so you can focus on what matters most – your pet&apos;s health and happiness.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                Start Comparing
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Right Content - Trust Points */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {trustPoints.map((point) => (
              <motion.div
                key={point.title}
                variants={itemVariants}
                className="glass-card rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <point.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
