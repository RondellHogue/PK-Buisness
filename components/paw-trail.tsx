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
  color: string // resolved fill/stroke color for this position
}

// Royal blue (used over white sections) and white (used over blue sections)
const BLUE = '#1d4ed8'
const WHITE = '#ffffff'

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

// Blend between royal blue (over white, blueness=0) and white (over blue, blueness=1)
function colorForBlueness(blueness: number) {
  const a = hexToRgb(BLUE)
  const b = hexToRgb(WHITE)
  const r = Math.round(lerp(a.r, b.r, blueness))
  const g = Math.round(lerp(a.g, b.g, blueness))
  const bl = Math.round(lerp(a.b, b.b, blueness))
  return `rgb(${r}, ${g}, ${bl})`
}

function Paw({ species, color }: { species: Species; color: string }) {
  // Each species has a distinct pad + toe arrangement
  if (species === 'mouse') {
    return (
      <svg width="22" height="26" viewBox="0 0 22 26" fill={color} aria-hidden>
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
      <svg width="24" height="28" viewBox="0 0 24 28" stroke={color} strokeWidth="2.4" strokeLinecap="round" fill="none" aria-hidden>
        <line x1="12" y1="22" x2="12" y2="6" />
        <line x1="12" y1="11" x2="4" y2="4" />
        <line x1="12" y1="11" x2="20" y2="4" />
        <line x1="12" y1="22" x2="12" y2="26" />
      </svg>
    )
  }
  if (species === 'cat') {
    return (
      <svg width="26" height="28" viewBox="0 0 26 28" fill={color} aria-hidden>
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
    <svg width="30" height="32" viewBox="0 0 30 32" fill={color} aria-hidden>
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
  const [view, setView] = useState<{ scrollY: number; vh: number }>({ scrollY: 0, vh: 0 })
  const rafRef = useRef<number | null>(null)

  // Build the procedural trail between the dog image and the bottom of the page
  useEffect(() => {
    function build() {
      const dog = document.getElementById('hero-dog')
      if (!dog) return

      const vh = window.innerHeight
      const scrollY = window.scrollY
      const dogRect = dog.getBoundingClientRect()
      const docHeight = document.documentElement.scrollHeight

      const dogTopDocY = dogRect.top + scrollY

      // Measure the page's blue regions (in document coordinates) so prints can
      // be colored white over blue and royal blue over white, blending smoothly
      // across the boundaries. 'gradient' regions fade blue -> white top to bottom.
      type Region = { top: number; bottom: number; kind: 'blue' | 'gradient' }
      const regions: Region[] = Array.from(
        document.querySelectorAll<HTMLElement>('[data-paw-region]'),
      ).map((el) => {
        const r = el.getBoundingClientRect()
        return {
          top: r.top + scrollY,
          bottom: r.bottom + scrollY,
          kind: (el.dataset.pawRegion as 'blue' | 'gradient') ?? 'blue',
        }
      })

      // Width of the soft transition band at hard blue/white boundaries
      const band = 150

      function bluenessAt(y: number) {
        let value = 0
        for (const reg of regions) {
          if (reg.kind === 'blue') {
            // Ramp up around the top edge, hold at 1, ramp down around the bottom
            const up = smoothstep(reg.top - band, reg.top + band, y)
            const down = 1 - smoothstep(reg.bottom - band, reg.bottom + band, y)
            value = Math.max(value, up * down)
          } else {
            // Gradient: fully blue background at its top fading to white at bottom
            const within = y >= reg.top - band && y <= reg.bottom
            if (within) {
              const up = smoothstep(reg.top - band, reg.top + band, y)
              const fade = 1 - clamp((y - reg.top) / (reg.bottom - reg.top), 0, 1)
              value = Math.max(value, up * fade)
            }
          }
        }
        return value
      }

      // Trail originates UP in the white area above the dog, so the first prints
      // sit behind that white section and appear to emerge from behind it. They
      // then continue all the way down to the bottom of the page.
      const startPlaceY = Math.max(dogTopDocY - vh * 0.55, 0)
      const endPlaceY = docHeight - 160

      const span = Math.max(endPlaceY - startPlaceY, 200)
      // Evenly spaced steps roughly every 70px
      const count = Math.max(14, Math.round(span / 70))
      // A few wide meanders down the page (integer keeps it smooth/even)
      const waves = Math.max(4, Math.round(span / 850))
      const speciesCycle: Species[] = ['dog', 'dog', 'cat', 'mouse', 'cat', 'dog', 'bird', 'mouse']

      const next: Print[] = []
      for (let i = 0; i < count; i++) {
        const t = i / (count - 1)
        // Even vertical spacing from just below the dog to the page bottom
        const y = startPlaceY + t * span
        // Wide winding path that wanders across most of the screen width
        const wave = Math.sin(t * Math.PI * 2 * waves)
        // Alternate left/right foot around the path like real footsteps
        const foot: -1 | 1 = i % 2 === 0 ? -1 : 1
        const x = clamp(50 + wave * 34 + foot * 4, 6, 94)
        // Rotation points in the direction of travel (down the meander)
        const slope = Math.cos(t * Math.PI * 2 * waves)
        const rotate = 180 - slope * 26
        next.push({
          x,
          y,
          rotate,
          scale: 0.9,
          species: speciesCycle[i % speciesCycle.length],
          side: foot,
          color: colorForBlueness(bluenessAt(y)),
        })
      }

      setPrints(next)
      setView({ scrollY: window.scrollY, vh })
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

  // Track scroll position so prints can reveal just ahead of the viewport
  useEffect(() => {
    function onScroll() {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        setView({ scrollY: window.scrollY, vh: window.innerHeight })
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (prints.length === 0) return null

  // Reveal any print whose position is above a line slightly BELOW the viewport
  // bottom, so footprints stay just ahead of the user as they scroll.
  const lead = view.vh * 0.35
  const revealLine = view.scrollY + view.vh + lead

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden blur-[3px]" aria-hidden>
      {prints.map((p, i) => {
        const revealed = p.y <= revealLine
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
            <Paw species={p.species} color={p.color} />
          </div>
        )
      })}
    </div>
  )
}
