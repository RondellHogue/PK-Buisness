'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, RotateCcw, ArrowUpRight, Star } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface Provider {
  id: string
  name: string
  url: string
  brand_color: string
  monthly_cost: string
  reimbursement: string
  rating: number
}

// Each answer boosts certain providers (by lowercased name) and contributes a
// short reason fragment shown in the result. Scoring is transparent on purpose.
interface Option {
  label: string
  // Short label used for slider tick marks
  short?: string
  boosts: Record<string, number>
  reason?: string
}

interface Question {
  id: string
  prompt: string
  // 'cards' (default) renders tappable option cards; 'slider' renders a range slider
  type?: 'cards' | 'slider'
  options: Option[]
}

const QUESTIONS: Question[] = [
  {
    id: 'pet',
    prompt: 'What kind of pet are you insuring?',
    options: [
      { label: 'A dog', boosts: {} },
      { label: 'A cat', boosts: { aspca: 1, spot: 1 }, reason: 'tends to price well for cats' },
      { label: 'More than one pet', boosts: { aspca: 2, 'pets best': 1 }, reason: 'offers a multi-pet discount' },
    ],
  },
  {
    id: 'age',
    prompt: 'How old is your pet?',
    type: 'slider',
    options: [
      {
        label: 'Young (puppy or kitten)',
        short: 'Young',
        boosts: { 'healthy paws': 2, lemonade: 2, 'pets best': 1 },
        reason: 'is competitively priced for young, healthy pets',
      },
      {
        label: 'Adult',
        short: 'Adult',
        boosts: { embrace: 1, spot: 1, figo: 1 },
        reason: 'balances price and coverage well for adult pets',
      },
      {
        label: 'Senior',
        short: 'Senior',
        boosts: { spot: 2, pumpkin: 2, aspca: 2, embrace: 1 },
        reason: 'enrolls older pets without an upper age limit',
      },
    ],
  },
  {
    id: 'priority',
    prompt: 'What matters most to you?',
    options: [
      {
        label: 'The lowest monthly price',
        boosts: { lemonade: 3, 'pets best': 2, aspca: 1 },
        reason: 'is among the more affordable options',
      },
      {
        label: 'The most comprehensive coverage',
        boosts: { fetch: 3, pumpkin: 2, trupanion: 1, 'healthy paws': 1 },
        reason: 'offers broad, inclusive coverage',
      },
      {
        label: 'Having my vet paid directly',
        boosts: { trupanion: 3, 'pets best': 2 },
        reason: 'can pay participating vets directly at checkout',
      },
      {
        label: 'Fast claims and a great app',
        boosts: { lemonade: 3, figo: 2, 'healthy paws': 1 },
        reason: 'is known for fast, app-based claims',
      },
    ],
  },
  {
    id: 'budget',
    prompt: 'What is your monthly budget?',
    type: 'slider',
    options: [
      {
        label: 'Tight — keep it low',
        short: 'Tight',
        boosts: { lemonade: 2, 'pets best': 2, aspca: 1 },
        reason: 'fits a lower monthly budget',
      },
      {
        label: 'Moderate — value matters',
        short: 'Moderate',
        boosts: { spot: 2, embrace: 2, figo: 1 },
        reason: 'offers strong mid-range value',
      },
      {
        label: 'Flexible — I want the best plan',
        short: 'Flexible',
        boosts: { trupanion: 2, fetch: 2, pumpkin: 1 },
        reason: 'justifies a higher premium with its coverage',
      },
    ],
  },
  {
    id: 'feature',
    prompt: 'Which feature is most important?',
    options: [
      {
        label: 'Routine / wellness coverage',
        boosts: { embrace: 2, pumpkin: 2, lemonade: 1, 'pets best': 1 },
        reason: 'offers an optional wellness/routine package',
      },
      {
        label: 'Dental coverage',
        boosts: { embrace: 2, pumpkin: 2, fetch: 2 },
        reason: 'includes dental illness coverage',
      },
      {
        label: 'Unlimited annual payouts',
        boosts: { 'healthy paws': 3, trupanion: 2, spot: 1 },
        reason: 'offers unlimited annual payout options',
      },
      {
        label: 'Exam fees included',
        boosts: { spot: 2, fetch: 2, aspca: 2, pumpkin: 1 },
        reason: 'includes exam fees for covered visits',
      },
    ],
  },
]

// Slider-based question: pick along an ordered scale, then confirm to advance.
function SliderQuestion({
  options,
  initial,
  onConfirm,
}: {
  options: Option[]
  initial: number | null
  onConfirm: (index: number) => void
}) {
  const [value, setValue] = useState(initial ?? Math.floor((options.length - 1) / 2))

  return (
    <div className="mt-8">
      <div className="mb-8 text-center">
        <span className="text-xl md:text-2xl font-semibold text-blue-600">{options[value].label}</span>
      </div>
      <input
        type="range"
        min={0}
        max={options.length - 1}
        step={1}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 dark:bg-zinc-700 accent-blue-600"
        aria-label="Select an option"
      />
      <div className="mt-3 flex justify-between">
        {options.map((o, i) => (
          <button
            key={o.label}
            type="button"
            onClick={() => setValue(i)}
            className={`text-xs font-medium transition-colors ${
              i === value ? 'text-blue-600' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
            }`}
          >
            {o.short ?? o.label}
          </button>
        ))}
      </div>
      <button
        onClick={() => onConfirm(value)}
        className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Continue <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )
}

export function InsuranceQuiz() {
  const [providers, setProviders] = useState<Provider[]>([])
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null))
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('insurance_providers')
        .select('id,name,url,brand_color,monthly_cost,reimbursement,rating')
        .eq('is_active', true)
        .order('display_order')
      if (data) setProviders(data as Provider[])
    }
    load()
  }, [])

  const finished = step >= QUESTIONS.length

  const results = useMemo(() => {
    if (!finished || providers.length === 0) return []
    const scores: Record<string, number> = {}
    const reasons: Record<string, string[]> = {}
    answers.forEach((ansIdx, qIdx) => {
      if (ansIdx === null) return
      const opt = QUESTIONS[qIdx].options[ansIdx]
      Object.entries(opt.boosts).forEach(([key, val]) => {
        scores[key] = (scores[key] || 0) + val
        if (opt.reason) {
          reasons[key] = reasons[key] || []
          if (!reasons[key].includes(opt.reason)) reasons[key].push(opt.reason)
        }
      })
    })
    return providers
      .map((p) => ({
        provider: p,
        score: scores[p.name.toLowerCase()] || 0,
        reasons: reasons[p.name.toLowerCase()] || [],
      }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score || b.provider.rating - a.provider.rating)
      .slice(0, 3)
  }, [finished, providers, answers])

  function choose(optIdx: number) {
    const next = [...answers]
    next[step] = optIdx
    setAnswers(next)
    setStep(step + 1)
  }

  function reset() {
    setAnswers(Array(QUESTIONS.length).fill(null))
    setStep(0)
  }

  const progress = Math.round((Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100)

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <span>{finished ? 'Your matches' : `Question ${step + 1} of ${QUESTIONS.length}`}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <motion.div
            className="h-full rounded-full bg-blue-600"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white text-balance">
              {QUESTIONS[step].prompt}
            </h2>
            {QUESTIONS[step].type === 'slider' ? (
              <SliderQuestion
                options={QUESTIONS[step].options}
                initial={answers[step]}
                onConfirm={(i) => choose(i)}
              />
            ) : (
              <div className="mt-6 space-y-3">
                {QUESTIONS[step].options.map((opt, i) => (
                  <button
                    key={opt.label}
                    onClick={() => choose(i)}
                    className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-5 py-4 text-left text-zinc-800 dark:text-zinc-100 transition-all hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
                  >
                    <span className="font-medium">{opt.label}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-zinc-300 transition-all group-hover:translate-x-1 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            )}
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div key="results" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
              Based on your answers
            </h2>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              These providers fit your priorities most closely. They are suggestions to start your research, not a
              guarantee of the best price or fit. Always confirm details directly with the provider.
            </p>

            <div className="mt-6 space-y-4">
              {results.length === 0 && (
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 text-zinc-500">
                  We could not find a clear match. Try the full comparison instead.
                </div>
              )}
              {results.map(({ provider, reasons }, idx) => (
                <div
                  key={provider.id}
                  className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5"
                >
                  <span aria-hidden className="absolute left-0 top-0 h-full w-1.5" style={{ backgroundColor: provider.brand_color }} />
                  <div className="flex items-start justify-between gap-4 pl-2">
                    <div>
                      <div className="flex items-center gap-2">
                        {idx === 0 && (
                          <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
                            Top match
                          </span>
                        )}
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{provider.name}</h3>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {provider.rating} · {provider.monthly_cost}
                      </div>
                      {reasons.length > 0 && (
                        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
                          <span className="font-medium text-zinc-900 dark:text-white">Why: </span>
                          Based on your answers, {provider.name} {reasons.join(', ')}.
                        </p>
                      )}
                    </div>
                    <a
                      href={provider.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white"
                      style={{ backgroundColor: provider.brand_color }}
                    >
                      Visit
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                <RotateCcw className="h-4 w-4" /> Redo
              </button>
              <Link
                href="/providers"
                className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                See full comparison <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="mt-6 text-xs text-zinc-400">
              Recommendations are generated from your answers using a fixed, disclosed set of criteria. Read our{' '}
              <Link href="/methodology" className="text-blue-600 hover:underline">methodology</Link> and{' '}
              <Link href="/affiliate-disclosure" className="text-blue-600 hover:underline">affiliate disclosure</Link>.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
