'use client'

import { motion } from 'framer-motion'
import { BookOpen, ArrowRight } from 'lucide-react'

const topics = [
  {
    title: 'How Pet Insurance Works',
    description: 'Learn the basics of pet insurance, from premiums to claims, and how coverage protects you financially.',
    readTime: '5 min read',
  },
  {
    title: 'What Pet Insurance Covers',
    description: 'Discover what types of treatments, procedures, and conditions are typically covered by pet insurance policies.',
    readTime: '7 min read',
  },
  {
    title: 'What Pet Insurance Doesn\'t Cover',
    description: 'Understand common exclusions like pre-existing conditions, cosmetic procedures, and breed-specific limitations.',
    readTime: '6 min read',
  },
  {
    title: 'Deductibles Explained',
    description: 'Learn how deductibles work, the difference between annual and per-incident deductibles, and which option is best.',
    readTime: '4 min read',
  },
  {
    title: 'Reimbursement Percentages',
    description: 'Understand how reimbursement rates affect your out-of-pocket costs and what percentage makes sense for you.',
    readTime: '5 min read',
  },
  {
    title: 'Waiting Periods Explained',
    description: 'Find out why waiting periods exist, how long they typically last, and what they mean for your coverage.',
    readTime: '4 min read',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function LearningCenter() {
  return (
    <section id="resources" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary mb-4">Education Hub</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
            Pet Insurance Learning Center
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Everything you need to know about pet insurance, explained in simple terms. 
            Start with the basics or dive into specific topics.
          </p>
        </motion.div>

        {/* Topics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {topics.map((topic) => (
            <motion.article
              key={topic.title}
              variants={itemVariants}
              className="group glass-card rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {topic.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{topic.readTime}</span>
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <button className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors">
            View All Guides
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
