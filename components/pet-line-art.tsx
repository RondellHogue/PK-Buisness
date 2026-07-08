// Decorative white line-art of pet-related objects, drawn as simple outlines
// (Lemonade-style) to sit behind the pets in the hero's blue panel. Purely
// decorative and non-interactive.

type DrawProps = { className?: string }

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function DogHouse({ className }: DrawProps) {
  return (
    <svg viewBox="0 0 130 120" className={className} aria-hidden>
      <path {...stroke} d="M12 58 L65 16 L118 58" />
      <path {...stroke} d="M24 54 V104 H106 V54" />
      <path {...stroke} d="M50 104 V78 a15 15 0 0 1 30 0 V104" />
    </svg>
  )
}

function CatBed({ className }: DrawProps) {
  return (
    <svg viewBox="0 0 140 90" className={className} aria-hidden>
      <ellipse {...stroke} cx="70" cy="28" rx="52" ry="17" />
      <path {...stroke} d="M18 28 L27 64 C40 80 100 80 113 64 L122 28" />
      <ellipse {...stroke} cx="70" cy="33" rx="38" ry="11" />
    </svg>
  )
}

function BirdCage({ className }: DrawProps) {
  return (
    <svg viewBox="0 0 96 140" className={className} aria-hidden>
      <path {...stroke} d="M48 6 V18" />
      <ellipse {...stroke} cx="48" cy="22" rx="8" ry="5" />
      <path {...stroke} d="M14 48 Q48 10 82 48" />
      <path {...stroke} d="M14 48 V112 H82 V48" />
      <path {...stroke} d="M6 112 H90" />
      <path {...stroke} d="M11 122 H85" />
      <path {...stroke} d="M30 48 V112 M48 44 V112 M66 48 V112" />
    </svg>
  )
}

function FoodBowl({ className }: DrawProps) {
  return (
    <svg viewBox="0 0 130 78" className={className} aria-hidden>
      <ellipse {...stroke} cx="65" cy="26" rx="50" ry="15" />
      <path {...stroke} d="M16 27 C22 62 108 62 114 27" />
      <ellipse {...stroke} cx="65" cy="27" rx="38" ry="10" />
    </svg>
  )
}

function Yarn({ className }: DrawProps) {
  return (
    <svg viewBox="0 0 110 110" className={className} aria-hidden>
      <circle {...stroke} cx="52" cy="52" r="42" />
      <path {...stroke} d="M20 40 Q52 16 84 46" />
      <path {...stroke} d="M14 62 Q52 88 88 58" />
      <path {...stroke} d="M34 15 Q64 52 40 90" />
      <path {...stroke} d="M68 16 Q46 56 72 92" />
      <path {...stroke} d="M90 60 q22 8 6 30" />
    </svg>
  )
}

function Fish({ className }: DrawProps) {
  return (
    <svg viewBox="0 0 140 76" className={className} aria-hidden>
      <path {...stroke} d="M16 38 Q60 6 100 38 Q60 70 16 38 Z" />
      <path {...stroke} d="M100 38 L128 18 L122 38 L128 58 Z" />
      <circle cx="38" cy="32" r="3" fill="currentColor" />
    </svg>
  )
}

function Paw({ className }: DrawProps) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden>
      <ellipse {...stroke} cx="48" cy="62" rx="22" ry="18" />
      <ellipse {...stroke} cx="18" cy="38" rx="9" ry="12" />
      <ellipse {...stroke} cx="38" cy="24" rx="9" ry="12" />
      <ellipse {...stroke} cx="58" cy="24" rx="9" ry="12" />
      <ellipse {...stroke} cx="78" cy="38" rx="9" ry="12" />
    </svg>
  )
}

// Position + size each drawing across the blue panel. Values are percentages so
// the composition scales fluidly with the panel width.
const PIECES = [
  { Cmp: BirdCage, cls: 'left-[3%] top-[14%] w-16 md:w-24', rot: -8 },
  { Cmp: DogHouse, cls: 'left-[7%] bottom-[6%] w-24 md:w-36', rot: 0 },
  { Cmp: Yarn, cls: 'left-[24%] top-[10%] w-14 md:w-20', rot: 6 },
  { Cmp: Paw, cls: 'left-[44%] top-[6%] w-10 md:w-14', rot: -12 },
  { Cmp: Fish, cls: 'right-[22%] top-[12%] w-16 md:w-24', rot: 8 },
  { Cmp: FoodBowl, cls: 'right-[5%] top-[16%] w-20 md:w-28', rot: -4 },
  { Cmp: CatBed, cls: 'right-[4%] bottom-[7%] w-24 md:w-36', rot: 4 },
  { Cmp: Paw, cls: 'left-[16%] top-[46%] w-8 md:w-12', rot: 20 },
  { Cmp: Paw, cls: 'right-[16%] bottom-[24%] w-9 md:w-12', rot: -18 },
]

export function PetLineArt() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden text-white/15" aria-hidden>
      {PIECES.map((p, i) => {
        const Cmp = p.Cmp
        return (
          <div key={i} className={`absolute ${p.cls}`} style={{ transform: `rotate(${p.rot}deg)` }}>
            <Cmp className="h-auto w-full" />
          </div>
        )
      })}
    </div>
  )
}
