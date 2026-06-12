'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PetInsuranceModal } from './pet-insurance-modal'

export function HeroSection() {
  const [quoterOpen, setQuoterOpen] = useState(false)

  return (
    <section className="relative pt-32 md:pt-40 bg-transparent">
      {/* Top white area with headline, subtext and CTAs */}
      <div className="max-w-4xl mx-auto px-6 text-center pb-8 md:pb-12">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.1] text-balance"
        >
          One <span className="text-blue-600 dark:text-blue-400">Emergency Visit</span> Could Cost{' '}
          <span className="text-blue-600 dark:text-blue-400">Thousands</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed text-pretty"
        >
          Understand your options, and find the right coverage for your furry family member.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => setQuoterOpen(true)}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
          >
            Start Saving
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <Link
            href="/providers"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            View Providers
          </Link>
        </motion.div>
      </div>

      {/* Blue lower panel: begins just above the dog. The white "cap" has a
          gently upward-arching curved bottom edge and a soft downward shadow,
          making the white area above look like a slightly raised tab. */}
      <div className="relative bg-blue-700/90 dark:bg-blue-800/90 backdrop-blur-xl pt-20 md:pt-28 pb-6">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-[60px] md:h-[90px] text-white dark:text-zinc-900"
          style={{ filter: 'drop-shadow(0 6px 6px rgba(0,0,0,0.15))' }}
        >
          <path d="M0,0 L1440,0 L1440,72 C960,-12 480,-12 0,72 Z" fill="currentColor" />
        </svg>

        {/* Dog Image Looking Up */}
        <motion.div
          id="hero-dog"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative flex justify-center"
        >
          <Image
            src="/images/dog-looking-up.png?v=2"
            alt="Dog looking up"
            width={280}
            height={280}
            className="w-[220px] md:w-[280px] h-auto"
            priority
          />
        </motion.div>

        {/* Badge - below the dog */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative mt-6 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-white bg-white/15 rounded-full border border-white/25 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Trusted by 10,000+ Pet Owners
          </span>
        </motion.div>
      </div>

      <PetInsuranceModal isOpen={quoterOpen} onClose={() => setQuoterOpen(false)} />
    </section>
  )
}
