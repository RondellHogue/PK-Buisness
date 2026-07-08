'use client'

import { useEffect, useMemo, useState } from 'react'
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
  left: number // viewport percentage 0-100
  size: number
  Icon: (typeof ICONS)[number]
  duration: number // seconds to fall the full height
  delay: number // negative so drops start mid-fall on load
  rotate: number // starting rotation
  spin: number // degrees of rotation over the fall
  swayDur: number
  swayDelay: number
  baseOpacity: number
}

function buildPattern(): Deco[] {
  const rand = mulberry32(20240611)
  const items: Deco[] = []
  const count = 48

  for (let i = 0; i < count; i++) {
    // Keep icons in two side gutters only (never behind the centered hero). Left
    // gutter spans ~1-19%, right gutter ~81-99%.
    const side = rand() < 0.5 ? 0 : 1
    const left = side === 0 ? 1 + rand() * 18 : 81 + rand() * 18
    const size = 14 + Math.floor(rand() * 18)
    const Icon = ICONS[Math.floor(rand() * ICONS.length)]
    // Slow, gentle rain: 18s - 34s to traverse the screen.
    const duration = 18 + rand() * 16
    // Negative delay so the sky is already full of falling icons on first paint.
    const delay = -rand() * duration
    const rotate = -30 + rand() * 60
    const spin = -25 + rand() * 50
    const swayDur = 6 + rand() * 6
    const swayDelay = -rand() * swayDur
    const baseOpacity = 0.6
    items.push({ id: i, left, size, Icon, duration, delay, rotate, spin, swayDur, swayDelay, baseOpacity })
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
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden blur-[1px] md:blur-[2px]"
      style={{
        opacity: scrollFade,
        transition: 'opacity 0.2s linear',
        // Denser at the top, tapering as it descends.
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.35) 55%, transparent 90%)',
        maskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.35) 55%, transparent 90%)',
      }}
    >
      {/* Keyframes for the slow rain: a vertical fall paired with a gentle
          horizontal sway on an inner wrapper for a natural drifting descent. */}
      <style>{`
        @keyframes petfall {
          0% { transform: translateY(-18vh) rotate(var(--rot)); }
          100% { transform: translateY(118vh) rotate(calc(var(--rot) + var(--spin))); }
        }
        @keyframes petsway {
          0%, 100% { transform: translateX(-10px); }
          50% { transform: translateX(10px); }
        }
      `}</style>
      {items.map((it) => {
        const Icon = it.Icon
        // On mobile, thin the field out and make icons smaller/fainter.
        if (isMobile && it.id % 2 === 0) return null
        const size = isMobile ? Math.round(it.size * 0.85) : it.size
        // Brighter and more visible on mobile (was faint at 0.3).
        const opacity = isMobile ? 0.9 : it.baseOpacity
        return (
          <div
            key={it.id}
            className="absolute top-0"
            style={
              {
                left: `${it.left}%`,
                '--rot': `${it.rotate}deg`,
                '--spin': `${it.spin}deg`,
                animation: `petfall ${it.duration}s linear ${it.delay}s infinite`,
                willChange: 'transform',
              } as React.CSSProperties
            }
          >
            <div
              style={{
                animation: `petsway ${it.swayDur}s ease-in-out ${it.swayDelay}s infinite`,
                color: ROYAL_BLUE,
                opacity,
              }}
            >
              <Icon style={{ width: size, height: size }} strokeWidth={1.8} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
