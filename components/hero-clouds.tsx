import Image from 'next/image'

type Cloud = {
  src: string
  /** vertical position within the blue panel, from the top */
  top: string
  /** rendered width in px */
  width: number
  opacity: number
  /** seconds for one full right-to-left pass */
  duration: number
  /** negative delay so clouds are already mid-flight on load */
  delay: number
}

// A small, layered set of clouds. Varying size/opacity/speed creates a subtle sense
// of depth as they drift across the blue. Kept in the upper half of the panel so they
// read as "sky" behind the pets and the Vet Clinic line-art.
const CLOUDS: Cloud[] = [
  { src: '/images/cloud-2.png', top: '8%', width: 190, opacity: 0.5, duration: 75, delay: -5 },
  { src: '/images/cloud-1.png', top: '22%', width: 120, opacity: 0.32, duration: 105, delay: -40 },
  { src: '/images/cloud-1.png', top: '4%', width: 150, opacity: 0.42, duration: 90, delay: -68 },
  { src: '/images/cloud-2.png', top: '34%', width: 95, opacity: 0.25, duration: 120, delay: -20 },
  { src: '/images/cloud-1.png', top: '16%', width: 170, opacity: 0.45, duration: 82, delay: -55 },
  { src: '/images/cloud-2.png', top: '40%', width: 110, opacity: 0.28, duration: 110, delay: -90 },
]

export function HeroClouds() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {CLOUDS.map((cloud, i) => (
        <div
          key={i}
          className="absolute left-0 top-0 motion-reduce:hidden will-change-transform"
          style={{
            top: cloud.top,
            opacity: cloud.opacity,
            animation: `cloud-drift ${cloud.duration}s linear infinite`,
            animationDelay: `${cloud.delay}s`,
          }}
        >
          <Image
            src={cloud.src || '/placeholder.svg'}
            alt=""
            width={430}
            height={150}
            className="h-auto select-none"
            style={{ width: cloud.width }}
          />
        </div>
      ))}
    </div>
  )
}
