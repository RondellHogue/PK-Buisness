'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

const providers = [
  {
    name: 'Healthy Paws',
    rating: 4.9,
    reviews: '50,000+',
    highlight: 'Best Overall',
    color: 'bg-emerald-500',
  },
  {
    name: 'Embrace',
    rating: 4.8,
    reviews: '25,000+',
    highlight: 'Best for Wellness',
    color: 'bg-orange-500',
  },
  {
    name: 'Pets Best',
    rating: 4.7,
    reviews: '30,000+',
    highlight: 'Best Value',
    color: 'bg-blue-500',
  },
]

export function ProvidersSection() {
  return (
    <section id="providers" className="py-20 md:py-28 bg-zinc-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-blue-600 mb-3"
          >
            Top Providers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-semibold text-zinc-900"
          >
            Compare the best pet insurance
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-zinc-500"
          >
            We&apos;ve researched the top providers so you don&apos;t have to.
          </motion.p>
        </div>

        {/* Provider Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {providers.map((provider, index) => (
            <motion.div
              key={provider.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-zinc-100 hover:border-zinc-200 hover:shadow-lg transition-all group"
            >
              {/* Badge */}
              <span className={`inline-block px-3 py-1 text-xs font-medium text-white ${provider.color} rounded-full mb-4`}>
                {provider.highlight}
              </span>

              {/* Provider Name */}
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                {provider.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(provider.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-200'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-zinc-900">{provider.rating}</span>
                <span className="text-sm text-zinc-400">({provider.reviews} reviews)</span>
              </div>

              {/* CTA */}
              <Link
                href={`/providers/${provider.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 group-hover:gap-3 transition-all"
              >
                View Details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/providers"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-zinc-700 bg-white border border-zinc-200 rounded-full hover:border-zinc-300 hover:bg-zinc-50 transition-all"
          >
            View All Providers
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
