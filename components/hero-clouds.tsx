'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

type CloudConfig = {
  src: string
  /** vertical position within the blue panel, as a % from the top. The range is
      kept high (7%–19%) so clouds sit above the cat stand and the right house roof. */
  topPct: number
  /** rendered width in px */
  width: number
  opacity: number
  /** base horizontal speed in px/second; a small ± variation is applied per cloud */
  speed: number
}

// Distinct clouds with varied art, size, opacity and speed. Even horizontal spacing
// is computed at runtime from the container width; vertical positions are staggered.
const CLOUDS: CloudConfig[] = [
  { src: '/images/cloud-2.png', topPct: 9, width: 190, opacity: 0.5, speed: 20 },
  { src: '/images/cloud-1.png', topPct: 16, width: 120, opacity: 0.3, speed: 14 },
  { src: '/images/cloud-1.png', topPct: 7, width: 150, opacity: 0.42, speed: 17 },
  { src: '/images/cloud-2.png', topPct: 19, width: 95, opacity: 0.24, speed: 12 },
  { src: '/images/cloud-1.png', topPct: 12, width: 168, opacity: 0.44, speed: 18 },
]

export function HeroClouds() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Respect reduced-motion: render clouds statically, no animation loop.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const container = containerRef.current
    if (!container) return

    const SPAWN_MARGIN = 80 // px of clear space just outside each edge
    let width = container.clientWidth

    // Per-cloud live horizontal position (px) and resolved speed (px/s).
    const xs: number[] = []
    const speeds: number[] = []

    const initPositions = () => {
      width = container.clientWidth
      // Total distance a cloud travels: full container width plus a margin and its
      // own width so it fully clears both edges before wrapping.
      for (let i = 0; i < CLOUDS.length; i++) {
        const cloud = CLOUDS[i]
        const span = width + SPAWN_MARGIN * 2 + cloud.width
        // Spread clouds evenly across the travel span for balanced distribution.
        const start = -SPAWN_MARGIN - cloud.width + (span / CLOUDS.length) * i
        xs[i] = start
        // Subtle deterministic speed variation (~±12%) for depth.
        const variation = 1 + ((i % 3) - 1) * 0.12
        speeds[i] = cloud.speed * variation
      }
    }
    initPositions()

    let raf = 0
    let last = performance.now()

    const frame = (now: number) => {
      // Delta-time based movement keeps speed constant at any frame rate.
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      for (let i = 0; i < CLOUDS.length; i++) {
        const cloud = CLOUDS[i]
        // Move right -> left.
        xs[i] -= speeds[i] * dt
        const span = width + SPAWN_MARGIN * 2 + cloud.width
        // Seamless wrap: once fully off the left edge, respawn just past the right.
        if (xs[i] < -cloud.width - SPAWN_MARGIN) {
          xs[i] += span
        }
        const node = nodeRefs.current[i]
        if (node) node.style.transform = `translate3d(${xs[i]}px, 0, 0)`
      }

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    const onResize = () => initPositions()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div ref={containerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {CLOUDS.map((cloud, i) => (
        <div
          key={i}
          ref={(el) => {
            nodeRefs.current[i] = el
          }}
          className="absolute left-0 will-change-transform"
          style={{ top: `${cloud.topPct}%`, opacity: cloud.opacity }}
        >
          <Image
            src={cloud.src || '/placeholder.svg'}
            alt=""
            width={430}
            height={150}
            className="h-auto select-none"
            // Invert the white cloud art into the same darker navy tone as the
            // Vet Clinic line work so it recedes into the blue panel.
            style={{ width: cloud.width, filter: 'invert(1) brightness(0.7)' }}
          />
        </div>
      ))}
    </div>
  )
}
