'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const costs = [
  { name: 'Emergency Surgery', range: '$2,000 - $5,000', average: 3500, category: 'Emergency' },
  { name: 'Broken Bone Treatment', range: '$1,500 - $4,000', average: 2750, category: 'Emergency' },
  { name: 'Cancer Treatment', range: '$5,000 - $20,000', average: 12500, category: 'Illness' },
  { name: 'MRI / CT Scan', range: '$1,000 - $3,500', average: 2250, category: 'Diagnostic' },
  { name: 'Chronic Illness (Annual)', range: '$2,000 - $5,000', average: 3500, category: 'Ongoing' },
  { name: 'ACL Surgery', range: '$3,500 - $7,000', average: 5250, category: 'Surgery' },
  { name: 'Foreign Object Removal', range: '$1,500 - $4,500', average: 3000, category: 'Emergency' },
  { name: 'Dental Extraction', range: '$500 - $2,500', average: 1500, category: 'Dental' },
]

const categories = ['All', 'Emergency', 'Illness', 'Surgery', 'Diagnostic', 'Ongoing', 'Dental']

export function VeterinaryCosts() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredCosts = activeCategory === 'All' 
    ? costs 
    : costs.filter(cost => cost.category === activeCategory)

  const maxCost = Math.max(...costs.map(c => c.average))

  return (
    <section className="relative py-24 lg:py-32 gradient-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block text-sm font-medium text-primary mb-4">Cost Breakdown</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
            Common Veterinary Costs
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Understanding potential costs helps you evaluate whether pet insurance makes sense for your situation.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Cost Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-3xl p-6 lg:p-10"
        >
          <div className="space-y-6">
            {filteredCosts.map((cost, index) => (
              <motion.div
                key={cost.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{cost.name}</h4>
                    <span className="text-xs text-muted-foreground">{cost.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">{cost.range}</div>
                    <div className="text-xs text-muted-foreground">typical range</div>
                  </div>
                </div>
                <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(cost.average / maxCost) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, oklch(0.75 0.12 185), oklch(0.65 0.1 195))`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="mt-8 text-xs text-muted-foreground text-center">
            * Costs are estimates and may vary based on location, pet age, breed, and specific circumstances.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
