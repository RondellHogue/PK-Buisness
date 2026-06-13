'use client'

import { useEffect, useRef, useState } from 'react'

type Species = 'dog' | 'cat' | 'mouse' | 'bird'

interface Print {
  x: number // viewport percentage 0-100
  y: number // document px
  rotate: number
  scale: number
  species: Species
  side: -1 | 1 // left/right foot offset
}

// Royal blue
const COLOR = '#1d4ed8'

function Paw({ species, side }: { species: Species; side: -1 | 1 }) {
  // Each species has a distinct pad + toe arrangement
  if (species === 'mouse') {
    return (
      <svg width="22" height="26" viewBox="0 0 22 26" fill={COLOR} aria-hidden>
        <ellipse cx="11" cy="17" rx="5" ry="6.5" />
        <circle cx="5" cy="9" r="2" />
        <circle cx="11" cy="6.5" r="2.2" />
        <circle cx="17" cy="9" r="2" />
        <circle cx="8" cy="13" r="1.4" />
        <circle cx="14" cy="13" r="1.4" />
      </svg>
    )
  }
  if (species === 'bird') {
    // Three-toed track
    return (
      <svg width="24" height="28" viewBox="0 0 24 28" stroke={COLOR} strokeWidth="2.4" strokeLinecap="round" fill="none" aria-hidden>
        <line x1="12" y1="22" x2="12" y2="6" />
        <line x1="12" y1="11" x2="4" y2="4" />
        <line x1="12" y1="11" x2="20" y2="4" />
        <line x1="12" y1="22" x2="12" y2="26" />
      </svg>
    )
  }
  if (species === 'cat') {
    return (
      <svg width="26" height="28" viewBox="0 0 26 28" fill={COLOR} aria-hidden>
        <ellipse cx="13" cy="19" rx="6.5" ry="6" />
        <ellipse cx="5" cy="11" rx="2.3" ry="3" />
        <ellipse cx="10" cy="7.5" rx="2.4" ry="3.2" />
        <ellipse cx="16" cy="7.5" rx="2.4" ry="3.2" />
        <ellipse cx="21" cy="11" rx="2.3" ry="3" />
      </svg>
    )
  }
  // dog (larger, splayed toes)
  return (
    <svg width="30" height="32" viewBox="0 0 30 32" fill={COLOR} aria-hidden>
      <ellipse cx="15" cy="22" rx="8" ry="7.5" />
      <ellipse cx="5" cy="12" rx="2.8" ry="3.8" />
      <ellipse cx="11.5" cy="7" rx="2.9" ry="4" />
      <ellipse cx="18.5" cy="7" rx="2.9" ry="4" />
      <ellipse cx="25" cy="12" rx="2.8" ry="3.8" />
    </svg>
  )
}

export function PawTrail() {
  const [prints, setPrints] = useState<Print[]>([])
  const [bounds, setBounds] = useState<{ startScroll: number; endScroll: number } | null>(null)
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  // Build the procedural trail between the dog image and the pricing section
  useEffect(() => {
    function build() {
      const dog = document.getElementById('hero-dog')
      if (!dog) return

      const vh = window.innerHeight
      const scrollY = window.scrollY
      const dogRect = dog.getBoundingClientRect()
      const docHeight = document.documentElement.scrollHeight

      const dogCenterDocY = dogRect.top + scrollY + dogRect.height / 2
      const dogBottomDocY = dogRect.bottom + scrollY

      // Trail begins well BELOW the dog image (so no print lands on the photo
      // and there's clear breathing room) and continues to the bottom of the page.
      const startPlaceY = dogBottomDocY + 220
      const endPlaceY = docHeight - 120

      // Scroll range during which the trail is revealed. Start later (well after
      // the dog has passed center) so users clearly watch the prints "walk" down
      // the page as they scroll rather than having them appear all at once.
      const startScroll = dogCenterDocY + vh * 0.35
      const endScroll = docHeight - vh * 0.9

      const span = Math.max(endPlaceY - startPlaceY, 120)
      const count = Math.max(12, Math.round(span / 78))
      // Number of horizontal meanders scales with page length
      const waves = Math.max(4, span / 520)
      const speciesCycle: Species[] = ['dog', 'dog', 'cat', 'mouse', 'cat', 'dog', 'bird', 'mouse']

      const next: Print[] = []
      for (let i = 0; i < count; i++) {
        const t = i / (count - 1)
        const y = startPlaceY + t * span
        // Winding horizontal path: meanders across the screen and drifts toward edges
        const wave = Math.sin(t * Math.PI * waves)
        const x = 50 + wave * 36
        // direction of travel for rotation
        const slope = Math.cos(t * Math.PI * waves)
        const rotate = -slope * 32 + (t * 18 - 9)
        const side: -1 | 1 = i % 2 === 0 ? -1 : 1
        next.push({
          x,
          y,
          rotate,
          scale: 0.85 + ((i * 13) % 7) / 20,
          species: speciesCycle[i % speciesCycle.length],
          side,
        })
      }

      setPrints(next)
      setBounds({ startScroll, endScroll })
    }

    build()
    window.addEventListener('resize', build)
    // Rebuild after fonts/images settle
    const t = setTimeout(build, 600)
    return () => {
      window.removeEventListener('resize', build)
      clearTimeout(t)
    }
  }, [])

  // Track scroll progress within the active range
  useEffect(() => {
    if (!bounds) return
    function onScroll() {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        const { startScroll, endScroll } = bounds!
        const p = (window.scrollY - startScroll) / (endScroll - startScroll)
        setProgress(Math.min(1, Math.max(0, p)))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [bounds])

  if (prints.length === 0) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden blur-[3px]" aria-hidden>
      {prints.map((p, i) => {
        const threshold = i / prints.length
        const revealed = progress >= threshold
        return (
          <div
            key={i}
            className="absolute transition-all duration-500 ease-out"
            style={{
              top: p.y,
              left: `${p.x}%`,
              transform: `translate(calc(-50% + ${p.side * 8}px), -50%) rotate(${p.rotate}deg) scale(${
                revealed ? p.scale : p.scale * 0.6
              })`,
              opacity: revealed ? 0.55 : 0,
            }}
          >
            <Paw species={p.species} side={p.side} />
          </div>
        )
      })}
    </div>
  )
}
