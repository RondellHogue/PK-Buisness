import Image from 'next/image'

type Cloud = {
  src: string
  /** vertical position within the blue panel, from the top */
  top: string
  /** rendered width in px */
  width: number
  opacity: number
  /** seconds for one full left-to-right pass */
  duration: number
  /** negative delay so clouds are already mid-flight on load */
  delay: number
}

// A single high line of clouds drifting left-to-right. They sit near the top of the
// blue panel — above the cat stand and the right-hand house roof — so they read as a
// distant sky band. Varying size/opacity/speed still gives a layered depth feel.
const CLOUDS: Cloud[] = [
  { src: '/images/cloud-2.png', top: '10%', width: 190, opacity: 0.5, duration: 75, delay: -5 },
  { src: '/images/cloud-1.png', top: '16%', width: 120, opacity: 0.3, duration: 110, delay: -46 },
  { src: '/images/cloud-1.png', top: '7%', width: 150, opacity: 0.42, duration: 92, delay: -70 },
  { src: '/images/cloud-2.png', top: '19%', width: 95, opacity: 0.24, duration: 125, delay: -22 },
  { src: '/images/cloud-1.png', top: '12%', width: 168, opacity: 0.44, duration: 84, delay: -58 },
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
            // Invert the white cloud art into the same darker navy tone as the
            // Vet Clinic line work so it recedes into the blue panel.
            style={{ width: cloud.width, filter: 'invert(1) brightness(0.7)' }}
          />
        </div>
      ))}
    </div>
  )
}
