'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah M.',
    pet: 'Golden Retriever owner',
    rating: 5,
    text: 'PetKeepings helped me understand the differences between providers. I saved hundreds by choosing the right deductible for my situation.',
    image: null,
  },
  {
    name: 'Michael T.',
    pet: 'Cat parent',
    rating: 5,
    text: 'The comparison tools made it so easy to see which plans covered hereditary conditions. My cat has since been diagnosed with HCM and I\'m so glad I was prepared.',
    image: null,
  },
  {
    name: 'Jennifer L.',
    pet: 'French Bulldog owner',
    rating: 5,
    text: 'As a first-time pet owner, I had no idea where to start. The learning center explained everything I needed to know about waiting periods and exclusions.',
    image: null,
  },
  {
    name: 'David R.',
    pet: 'Multi-pet household',
    rating: 5,
    text: 'Finding coverage for two dogs and a cat was overwhelming until I found PetKeepings. The multi-pet discount information alone saved me $40/month.',
    image: null,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary mb-4">Testimonials</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
            What Pet Owners Say
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Hear from pet owners who used PetKeepings to find the right coverage for their furry family members.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-3xl p-8 relative"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-lg font-semibold text-muted-foreground">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.pet}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
