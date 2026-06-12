'use client'

import { useMemo } from 'react'
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
    const offset = 0.5 + rand() * 5.5 // % in from the screen edge
    const size = 14 + Math.floor(rand() * 18)
    const Icon = ICONS[Math.floor(rand() * ICONS.length)]
    const delay = rand() * 6
    const duration = 7 + rand() * 7
    const drift = 14 + rand() * 22
    // Taper opacity: brighter near the top, fading as it descends
    const baseOpacity = Math.max(0.1, 0.45 * (1 - top / 110))
    const rotate = -22 + rand() * 44
    items.push({ id: i, side, top, offset, size, Icon, delay, duration, drift, baseOpacity, rotate })
  }
  return items
}

export function PetIconPattern() {
  const items = useMemo(buildPattern, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden lg:block"
    >
      {items.map((it) => {
        const Icon = it.Icon
        return (
          <motion.div
            key={it.id}
            className="absolute"
            style={{
              top: `${it.top}%`,
              [it.side]: `${it.offset}%`,
              color: ROYAL_BLUE,
              opacity: it.baseOpacity,
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
            <Icon style={{ width: it.size, height: it.size }} strokeWidth={1.8} />
          </motion.div>
        )
      })}
    </div>
  )
}
