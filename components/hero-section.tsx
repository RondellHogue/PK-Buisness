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
    <section className="relative pt-32 md:pt-40 bg-transparent">
      {/* Top white area with headline, subtext and CTAs */}
      <div className="max-w-4xl mx-auto px-6 text-center pb-8 md:pb-12">
        {/* Headline */}
       <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
  className={`${fredoka.className} text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-zinc-900 dark:text-white md:text-balance`}
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
          className="mt-6 text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed text-pretty"
        >
          Don&apos;t wait for the costly vet bill to realize the value of pet insurance. Cover your furry family member today!
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            id="hero-start-saving"
            onClick={() => setQuoterOpen(true)}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all hover:-translate-y-0.5 shadow-glow-blue hover:shadow-glow-blue-lg"
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

      {/* Blue lower panel: begins just above the pets. The white "cap" has a
          gently upward-arching curved bottom edge and a soft downward shadow,
          making the white area above look like a slightly raised tab. */}
      <div data-paw-region="blue" className="relative overflow-hidden bg-blue-700 dark:bg-blue-800 pt-20 md:pt-28 pb-0">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-[60px] md:h-[90px] text-white dark:text-zinc-900 z-20"
          style={{ filter: 'drop-shadow(0 9px 9px rgba(0,0,0,0.22))' }}
        >
          <path d="M0,0 L1440,0 L1440,72 C960,-12 480,-12 0,72 Z" fill="currentColor" />
        </svg>

        {/* Soft radial blue glow behind the pets for depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(60% 70% at 50% 78%, rgba(96,165,250,0.55) 0%, rgba(37,99,235,0) 60%)',
          }}
        />

        {/* Badge - above the pets */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative z-10 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-white bg-white/15 rounded-full border border-white/25 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Independent research · Provider info updated regularly
          </span>
        </motion.div>

        {/* Full-width pets image. Background has been removed so the animals keep
            their natural colors and sit directly on the panel's blue. The bottom
            edge fades into the blue for a seamless transition. */}
        <div
          id="hero-dog"
          className="mt-6 md:mt-8 w-full"
        >
          <Image
            src="/images/pets-group-cutout.png"
            alt="A group of pets — dogs, cats, a rabbit, a hamster and ferrets — all looking upward"
            width={1914}
            height={822}
            className="w-full h-auto select-none drop-shadow-[0_18px_30px_rgba(8,15,40,0.35)]"
            style={{
              WebkitMaskImage:
                'linear-gradient(to bottom, black 88%, transparent 100%)',
              maskImage:
                'linear-gradient(to bottom, black 88%, transparent 100%)',
            }}
            priority
          />
        </div>
      </div>

      <PetInsuranceModal isOpen={quoterOpen} onClose={() => setQuoterOpen(false)} />
    </section>
  )
}
