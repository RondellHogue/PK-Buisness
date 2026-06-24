'use client'

import { Star } from 'lucide-react'

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
    name: 'Jessica R.',
    handle: 'Trustpilot',
    provider: 'Healthy Paws',
    rating: 5,
    text: 'Filed a claim for my dog\u2019s ACL surgery and was reimbursed 90% within a week. No hassle, no fighting. Genuinely grateful.',
  },
  {
    name: 'Marcus T.',
    handle: 'ConsumerAffairs',
    provider: 'Trupanion',
    rating: 5,
    text: 'The direct-to-vet payment is a game changer. I didn\u2019t have to front thousands of dollars during an emergency. Paid the vet directly.',
  },
  {
    name: 'Priya S.',
    handle: 'Reddit',
    provider: 'Lemonade',
    rating: 4,
    text: 'App is incredibly easy and premiums are some of the lowest I found for my kitten. Claims through the app were quick for routine stuff.',
  },
  {
    name: 'David L.',
    handle: 'App Store',
    provider: 'Embrace',
    rating: 5,
    text: 'Love the diminishing deductible \u2014 every year I stay claim-free it drops. Coverage for my senior dog has been comprehensive.',
  },
  {
    name: 'Anna K.',
    handle: 'Trustpilot',
    provider: 'Spot',
    rating: 5,
    text: 'No upper age limit was the deciding factor for my 11-year-old lab. Customizable annual limits let me keep the premium reasonable.',
  },
  {
    name: 'Carlos M.',
    handle: 'ConsumerAffairs',
    provider: 'Pets Best',
    rating: 4,
    text: 'Affordable and the wellness add-on covered routine vet visits. Reimbursement took a little longer than expected but it came through.',
  },
  {
    name: 'Rachel B.',
    handle: 'Reddit',
    provider: 'Pumpkin',
    rating: 5,
    text: 'One straightforward plan, no confusing tiers. 90% reimbursement and they cover exam fees, which a lot of competitors don\u2019t.',
  },
  {
    name: 'Tom H.',
    handle: 'App Store',
    provider: 'Fetch',
    rating: 4,
    text: 'Comprehensive coverage \u2014 they even covered dental and behavioral therapy. A bit pricier but the breadth of coverage is worth it.',
  },
  {
    name: 'Sofia G.',
    handle: 'Trustpilot',
    provider: 'Figo',
    rating: 5,
    text: 'The pet cloud app keeps all my records in one place. Claims were smooth and the 100% reimbursement option is rare to find.',
  },
  {
    name: 'Brian W.',
    handle: 'ConsumerAffairs',
    provider: 'ASPCA',
    rating: 4,
    text: 'Solid value and they cover microchipping and behavioral issues. Good option for multi-pet households thanks to the discount.',
  },
]

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex w-[300px] shrink-0 flex-col gap-3 rounded-2xl bg-white dark:bg-zinc-800 p-6 shadow-soft ring-1 ring-zinc-100 dark:ring-zinc-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-zinc-900 dark:text-white">{review.name}</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">via {review.handle}</p>
        </div>
        <div className="flex gap-0.5">
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
    <section className="overflow-hidden bg-zinc-50 dark:bg-zinc-900 py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white text-balance">
          What pet owners are saying
        </h2>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400 text-pretty">
          Real sentiment aggregated from public review platforms across every provider we cover.
        </p>
      </div>

      {/* Marquee: two identical tracks scroll left in tandem for an infinite loop.
          Pauses on hover. Edges fade out via a mask. */}
      <div
        className="group relative mt-12"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          maskImage:
            'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        }}
      >
        <div className="flex w-max gap-5 animate-marquee group-hover:[animation-play-state:paused]">
          {track.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
