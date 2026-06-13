'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Dog, Cat, Bird, Rabbit, Fish, Turtle, PawPrint, Bone } from 'lucide-react'

const ROYAL_BLUE = '#4169E1'
const ICONS = [Dog, Cat, Bird, Rabbit, Fish, Turtle, PawPrint, Bone]

// Deterministic PRNG so the server and client render the exact same layout (no hydration mismatch)
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Deco = {
  id: number
  side: 'left' | 'right'
  top: number
  offset: number
  size: number
  Icon: (typeof ICONS)[number]
  delay: number
  duration: number
  drift: number
  baseOpacity: number
  rotate: number
}

function buildPattern(): Deco[] {
  const rand = mulberry32(20240611)
  const items: Deco[] = []
  const count = 48

  for (let i = 0; i < count; i++) {
    // Squaring the random value biases positions toward the top (0%),
    // so icons are dense up top and sparse toward the bottom.
    const top = Math.pow(rand(), 1.9) * 98
    const side: 'left' | 'right' = i % 2 === 0 ? 'left' : 'right'
    // Icons near the very top spread further inward to fill the white void
    // beside the headline; lower icons stay tucked against the edges.
    const maxInset = top < 24 ? 22 : 6
    const offset = 0.5 + rand() * maxInset // % in from the screen edge
    const size = 14 + Math.floor(rand() * 18)
    const Icon = ICONS[Math.floor(rand() * ICONS.length)]
    const delay = rand() * 6
    const duration = 7 + rand() * 7
    const drift = 14 + rand() * 22
    // Each icon keeps a strong, consistent royal-blue presence; the gradual
    // fade down the page is applied globally based on scroll position.
    const baseOpacity = 0.7
    const rotate = -22 + rand() * 44
    items.push({ id: i, side, top, offset, size, Icon, delay, duration, drift, baseOpacity, rotate })
  }
  return items
}

export function PetIconPattern() {
  const items = useMemo(buildPattern, [])
  const [scrollFade, setScrollFade] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const pricing = document.getElementById('pricing')
      const scrollY = window.scrollY
      const vh = window.innerHeight
      if (pricing) {
        // Fade out completely by the time the pricing section reaches view.
        const pricingTop = pricing.getBoundingClientRect().top + scrollY
        const fadeEnd = pricingTop - vh * 0.5
        const fadeStart = fadeEnd - 600
        if (scrollY <= fadeStart) setScrollFade(1)
        else if (scrollY >= fadeEnd) setScrollFade(0)
        else setScrollFade(1 - (scrollY - fadeStart) / (fadeEnd - fadeStart))
      } else {
        setScrollFade(Math.max(0, 1 - scrollY / 900))
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden blur-[2px]"
      style={{ opacity: scrollFade, transition: 'opacity 0.2s linear' }}
    >
      {items.map((it) => {
        const Icon = it.Icon
        // On mobile, only keep edge-hugging icons and render them smaller and
        // fainter so they stay subtle and unobtrusive behind the content.
        if (isMobile && it.offset > 7) return null
        const size = isMobile ? Math.round(it.size * 0.7) : it.size
        const opacity = isMobile ? it.baseOpacity * 0.5 : it.baseOpacity
        return (
          <motion.div
            key={it.id}
            className="absolute"
            style={{
              top: `${it.top}%`,
              [it.side]: `${it.offset}%`,
              color: ROYAL_BLUE,
              opacity,
            }}
            animate={{
              y: [0, it.drift, 0],
              rotate: [it.rotate, it.rotate + 8, it.rotate],
            }}
            transition={{
              duration: it.duration,
              delay: it.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          >
            <Icon style={{ width: size, height: size }} strokeWidth={1.8} />
          </motion.div>
        )
      })}
    </div>
  )
}
