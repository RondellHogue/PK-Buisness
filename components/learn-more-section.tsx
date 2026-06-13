'use client'

import { motion } from 'framer-motion'
import { Shield, Heart, DollarSign, Clock, Star, Quote } from 'lucide-react'

const benefits = [
  {
    icon: Shield,
    title: 'Financial Protection',
    description: 'Cover up to 90% of vet bills for accidents and illnesses, so you never have to choose between your pet and your wallet.'
  },
  {
    icon: Heart,
    title: 'Peace of Mind',
    description: 'Focus on your pet\'s health, not the cost. Make medical decisions based on what\'s best for your pet.'
  },
  {
    icon: DollarSign,
    title: 'Predictable Costs',
    description: 'Turn unexpected $5,000 vet bills into manageable monthly payments of $25-45.'
  },
  {
    icon: Clock,
    title: 'Fast Reimbursement',
    description: 'Most claims are processed within days, with direct deposit right to your account.'
  },
]

const testimonialStory = {
  name: 'Sarah Mitchell',
  location: 'Austin, TX',
  pet: 'Max, Golden Retriever',
  quote: `When Max was diagnosed with cancer last year, I was devastated. The treatment estimate was over $12,000. Without insurance, I would have had to make an impossible choice. But because I had signed up for pet insurance two years earlier, 80% of the costs were covered. Max completed his treatment and is now in remission. I can't imagine what would have happened if I hadn't made that decision. If you're on the fence about pet insurance, please don't wait. It saved Max's life.`,
  saved: '$9,600',
  image: null
}

const reviews = [
  {
    provider: 'Lemonade',
    author: 'Michael R.',
    rating: 5,
    text: 'Incredibly easy to sign up and file claims. Got reimbursed in just 3 days!',
    date: 'November 2025'
  },
  {
    provider: 'Spot',
    author: 'Jessica T.',
    rating: 5,
    text: 'Best coverage options I found. They covered my dog\'s hip surgery completely.',
    date: 'October 2025'
  },
  {
    provider: 'Embrace',
    author: 'David K.',
    rating: 4,
    text: 'Great customer service. They walked me through everything when my cat got sick.',
    date: 'September 2025'
  },
  {
    provider: 'Healthy Paws',
    author: 'Amanda L.',
    rating: 5,
    text: 'No caps on payouts was a lifesaver. Our vet bills were $15k and they covered it all.',
    date: 'August 2025'
  },
]

export function LearnMoreSection() {
  return (
    <section id="learn-more" data-paw-region="blue" className="py-24 bg-blue-700 dark:bg-blue-800">
      <div className="max-w-6xl mx-auto px-6">
        {/* Why Pet Insurance */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-blue-100 tracking-wide uppercase">Learn More</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            Why Pet Insurance Matters
          </h2>
          <p className="text-lg text-blue-100/90 max-w-2xl mx-auto">
            Protect your furry family members from unexpected medical expenses
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">{benefit.title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-5 gap-8 mb-20"
        >
          <div className="lg:col-span-3 bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">A Story That Could Be Yours</h3>
            <div className="flex items-start gap-4 mb-6">
              <Quote className="w-8 h-8 text-blue-200 dark:text-blue-800 flex-shrink-0 mt-1" />
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed italic">
                {testimonialStory.quote}
              </p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-zinc-800">
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">{testimonialStory.name}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{testimonialStory.location} • {testimonialStory.pet}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Amount Saved</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{testimonialStory.saved}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-semibold mb-4">Don&apos;t Wait Until It&apos;s Too Late</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-blue-200">•</span>
                <span className="text-blue-100">1 in 3 pets need emergency care each year</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-200">•</span>
                <span className="text-blue-100">Average emergency vet visit: $800-$1,500</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-200">•</span>
                <span className="text-blue-100">Pre-existing conditions aren&apos;t covered</span>
              </li>
            </ul>
            <a href="#get-quote" className="inline-block w-full text-center py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition">
              Get Protected Today
            </a>
          </div>
        </motion.div>

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            What Pet Owners Are Saying
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                    {review.provider}
                  </span>
                  <div className="flex text-yellow-400 text-sm">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-3">&quot;{review.text}&quot;</p>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>{review.author}</span>
                  <span>{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
