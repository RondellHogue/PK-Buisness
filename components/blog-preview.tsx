'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'

const articles = [
  {
    title: 'Best Pet Insurance for Dogs in 2025',
    excerpt: 'A comprehensive comparison of the top dog insurance providers, including coverage details, pricing, and breed-specific considerations.',
    category: 'Guides',
    readTime: '12 min read',
    featured: true,
  },
  {
    title: 'Best Pet Insurance for Cats in 2025',
    excerpt: 'Find the ideal coverage for your feline friend with our detailed analysis of cat-specific insurance plans and considerations.',
    category: 'Guides',
    readTime: '10 min read',
    featured: false,
  },
  {
    title: 'Understanding Deductibles: Annual vs Per-Incident',
    excerpt: 'Learn the key differences between deductible types and which option might save you more money based on your pet\'s needs.',
    category: 'Education',
    readTime: '6 min read',
    featured: false,
  },
  {
    title: 'Veterinary Cost Trends: What to Expect in 2025',
    excerpt: 'Stay informed about rising veterinary costs and how to budget for your pet\'s healthcare needs in the coming year.',
    category: 'Industry',
    readTime: '8 min read',
    featured: false,
  },
]

export function BlogPreview() {
  return (
    <section id="blog" className="relative py-24 lg:py-32 gradient-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-block text-sm font-medium text-primary mb-4">Latest Articles</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
              Blog & Resources
            </h2>
          </div>
          <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Featured Article */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card rounded-3xl p-8 lg:p-10 group cursor-pointer hover:border-primary/40 transition-all"
          >
            {/* Image Placeholder */}
            <div className="aspect-video rounded-2xl bg-muted mb-6 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Featured Image</span>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                {articles[0].category}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {articles[0].readTime}
              </div>
            </div>
            
            <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
              {articles[0].title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {articles[0].excerpt}
            </p>
          </motion.article>

          {/* Other Articles */}
          <div className="lg:col-span-5 space-y-6">
            {articles.slice(1).map((article, index) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 group cursor-pointer hover:border-primary/40 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
