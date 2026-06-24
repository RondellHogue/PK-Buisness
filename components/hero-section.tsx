'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PetInsuranceModal } from './pet-insurance-modal'
import { Fredoka } from 'next/font/google'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
})

export function HeroSection() {
  const [quoterOpen, setQuoterOpen] = useState(false)

  // The header's morphing "Start Saving" button opens this same quoter modal.
  useEffect(() => {
    const open = () => setQuoterOpen(true)
    window.addEventListener('open-quoter', open)
    return () => window.removeEventListener('open-quoter', open)
  }, [])

  return (
    <section className="relative pt-24 md:pt-28 bg-transparent">
      {/* Top white area with headline, subtext and CTAs */}
      <div className="max-w-4xl mx-auto px-6 text-center pb-8 md:pb-10">
        {/* Headline */}
       <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
  className={`${fredoka.className} text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-zinc-900 dark:text-white md:text-balance`}
>
  <span className="whitespace-nowrap md:whitespace-normal">
    One{" "}
    <span className="text-blue-600 dark:text-blue-400 font-extrabold">
      Emergency Visit
    </span>
  </span>{" "}
  <br className="md:hidden" />
  <span className="whitespace-nowrap md:whitespace-normal">
    Could Cost{" "}
    <span className="text-blue-600 dark:text-blue-400 font-extrabold">
      Thousands
    </span>
  </span>
</motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-sm md:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed text-pretty"
        >
          Don&apos;t wait for the costly vet bill to realize the value of pet insurance. Cover your furry family member today!
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            id="hero-start-saving"
            onClick={() => setQuoterOpen(true)}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all hover:-translate-y-0.5 shadow-glow-blue hover:shadow-glow-blue-lg"
          >
            Find Your Match
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <Link
            href="/providers"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Compare Providers
          </Link>
        </motion.div>
      </div>

      {/* Blue lower panel: begins just above the pets. The white "cap" has a
          gently upward-arching curved bottom edge and a soft downward shadow,
          making the white area above look like a slightly raised tab. */}
      <div data-paw-region="blue" className="relative overflow-hidden bg-blue-700 dark:bg-blue-800 pt-2 md:pt-4 pb-24 md:pb-0">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-[60px] md:h-[90px] text-white dark:text-zinc-900 z-20"
          style={{ filter: 'drop-shadow(0 9px 9px rgba(0,0,0,0.22))' }}
        >
          <path d="M0,0 L1440,0 L1440,72 C960,-12 480,-12 0,72 Z" fill="currentColor" />
        </svg>

        {/* Subtle radial blue glow behind the pets for depth. Kept low and high
            so it never pools into blotchy color near the bottom fade. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(55% 55% at 50% 45%, rgba(96,165,250,0.28) 0%, rgba(37,99,235,0) 65%)',
          }}
        />

        {/* Full-width pets image, raised so the animals fill most of the panel on
            landing. The background is already transparent so they sit directly on
            the blue; the bottom edge fades cleanly so it meets the ambient light
            bar below without any harsh image cut. No drop-shadow here — it created
            broken halo artifacts along the faded fur edge. */}
        <div
          id="hero-dog"
          className="relative z-10 w-full"
        >
          <Image
            src="/images/pets-hero.png"
            alt="A group of pets — dogs, cats, a rabbit, a hamster and ferrets — all looking upward"
            width={1914}
            height={822}
            className="w-full h-auto select-none"
            priority
          />

          {/* Soft depth shadow at the pets' base (stays within the blue family so it
              never reads as black): darkens the lower edge so the animals read as
              tucked BEHIND the raised Pricing shelf that overlaps them below. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-blue-800/25 to-blue-900/45"
          />
        </div>
      </div>

      <PetInsuranceModal isOpen={quoterOpen} onClose={() => setQuoterOpen(false)} />
    </section>
  )
}
