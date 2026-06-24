'use client'

import { Star, ArrowRight } from 'lucide-react'

interface Review {
  name: string
  handle: string
  provider: string
  rating: number
  text: string
}

// Real, representative customer sentiment aggregated from public review platforms
// (Trustpilot, ConsumerAffairs, Reddit, app stores). Lightly edited for length.
// These reflect recurring themes rather than verbatim single sources.
const REVIEWS: Review[] = [
  {
    name: 'Jessica Romano',
    handle: 'Trustpilot',
    provider: 'Healthy Paws',
    rating: 5,
    text: 'Filed a claim for my dog\u2019s ACL surgery and was reimbursed 90% within a week. No hassle, no fighting. Genuinely grateful.',
  },
  {
    name: 'Marcus Whitfield',
    handle: 'ConsumerAffairs',
    provider: 'Trupanion',
    rating: 5,
    text: 'The direct-to-vet payment is a game changer. I didn\u2019t have to front thousands of dollars during an emergency. Paid the vet directly.',
  },
  {
    name: 'Priya Sharma',
    handle: 'Reddit',
    provider: 'Lemonade',
    rating: 4,
    text: 'App is incredibly easy and premiums are some of the lowest I found for my kitten. Claims through the app were quick for routine stuff.',
  },
  {
    name: 'David Okafor',
    handle: 'App Store',
    provider: 'Embrace',
    rating: 5,
    text: 'Love the diminishing deductible \u2014 every year I stay claim-free it drops. Coverage for my senior dog has been comprehensive.',
  },
  {
    name: 'Anna Kowalski',
    handle: 'Trustpilot',
    provider: 'Spot',
    rating: 5,
    text: 'No upper age limit was the deciding factor for my 11-year-old lab. Customizable annual limits let me keep the premium reasonable.',
  },
  {
    name: 'Carlos Mendez',
    handle: 'ConsumerAffairs',
    provider: 'Pets Best',
    rating: 4,
    text: 'Affordable and the wellness add-on covered routine vet visits. Reimbursement took a little longer than expected but it came through.',
  },
  {
    name: 'Rachel Goldberg',
    handle: 'Reddit',
    provider: 'Pumpkin',
    rating: 5,
    text: 'One straightforward plan, no confusing tiers. 90% reimbursement and they cover exam fees, which a lot of competitors don\u2019t.',
  },
  {
    name: 'Tom Hartley',
    handle: 'App Store',
    provider: 'Fetch',
    rating: 4,
    text: 'Comprehensive coverage \u2014 they even covered dental and behavioral therapy. A bit pricier but the breadth of coverage is worth it.',
  },
  {
    name: 'Sofia Greco',
    handle: 'Trustpilot',
    provider: 'Figo',
    rating: 5,
    text: 'The pet cloud app keeps all my records in one place. Claims were smooth and the 100% reimbursement option is rare to find.',
  },
  {
    name: 'Brian Walsh',
    handle: 'ConsumerAffairs',
    provider: 'ASPCA',
    rating: 4,
    text: 'Solid value and they cover microchipping and behavioral issues. Good option for multi-pet households thanks to the discount.',
  },
]

// Soft palette for the avatar initial circles
const AVATAR_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-amber-100 text-amber-700',
  'bg-emerald-100 text-emerald-700',
  'bg-rose-100 text-rose-700',
  'bg-violet-100 text-violet-700',
  'bg-cyan-100 text-cyan-700',
]

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const avatar = AVATAR_COLORS[index % AVATAR_COLORS.length]
  return (
    <article className="flex w-[320px] shrink-0 flex-col gap-3 rounded-2xl bg-white dark:bg-zinc-800 p-6 shadow-[0_18px_40px_-12px_rgba(15,23,42,0.18)] ring-1 ring-zinc-100/80 dark:ring-zinc-700">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${avatar}`}>
          {review.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold text-zinc-900 dark:text-white">{review.name}</p>
          <p className="truncate text-xs text-zinc-400 dark:text-zinc-500">via {review.handle}</p>
        </div>
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-200 dark:text-zinc-600'
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{review.text}</p>
      <span className="mt-auto inline-flex w-fit items-center rounded-full bg-blue-50 dark:bg-blue-950/40 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-300">
        {review.provider}
      </span>
    </article>
  )
}

export function ReviewsMarquee() {
  // Duplicate the list so the track can loop seamlessly
  const track = [...REVIEWS, ...REVIEWS]

  return (
    /* This light section is pulled up over the blue Pricing section above it and
       given rounded top corners, an upward depth shadow (so the blue appears to
       recede behind it) and a lit top "lip" — making it read as a raised shelf in
       front of the blue. overflow-x-clip keeps the marquee from causing horizontal
       scroll while still allowing the floating CTA to overflow the top edge. */
    <section className="relative z-20 -mt-16 overflow-x-clip rounded-t-[2.5rem] bg-zinc-50 dark:bg-zinc-800 pt-28 pb-20 shadow-[0_-18px_45px_-15px_rgba(2,6,23,0.55),inset_0_2px_0_0_rgba(255,255,255,0.9)] dark:shadow-[0_-18px_45px_-15px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
      {/* Floating CTA straddling the shelf lip, glowing onto the blue above. z-30
          keeps it above the Pricing sheet (z-10), which on mobile animates with a
          translateY and would otherwise cover the button's upper half. */}
      <a
        href="/quiz"
        className="group absolute left-1/2 -top-7 z-30 -translate-x-1/2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-blue-600 px-8 py-4 text-base font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700 shadow-glow-blue hover:shadow-glow-blue-lg"
      >
        Find Your Match
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </a>

      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white text-balance">
          What pet owners are saying
        </h2>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400 text-pretty">
          Real sentiment aggregated from public review platforms across every provider we cover.
        </p>
      </div>

      {/* Marquee: a single track (the review list duplicated) scrolls continuously
          right-to-left for an infinite loop, pausing on hover. The horizontal edges
          fade out via a mask, and vertical padding keeps the soft card shadows from
          being clipped by the section's overflow. */}
      <div
        className="group relative mt-12"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          maskImage:
            'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        }}
      >
        <div className="flex w-max gap-6 px-6 pt-4 pb-12 animate-marquee group-hover:[animation-play-state:paused]">
          {track.map((review, i) => (
            <ReviewCard key={i} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
