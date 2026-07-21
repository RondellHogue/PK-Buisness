'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Dog, Cat, Bird, Rabbit, Fish, Turtle, Worm, Squirrel, Rat, ChevronRight, Loader2, Star, ArrowUpRight, MoreHorizontal, BarChart3, ShieldCheck, PawPrint } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const petTypes = [
  { id: 'dog', name: 'Dog', icon: Dog },
  { id: 'cat', name: 'Cat', icon: Cat },
  { id: 'bird', name: 'Bird', icon: Bird },
  { id: 'rabbit', name: 'Rabbit', icon: Rabbit },
  { id: 'fish', name: 'Fish', icon: Fish },
  { id: 'turtle', name: 'Turtle', icon: Turtle },
  { id: 'snake', name: 'Snake', icon: Worm },
  { id: 'ferret', name: 'Ferret', icon: Squirrel },
  { id: 'rodent', name: 'Rodent', icon: Rat },
  { id: 'other', name: 'Other', icon: null },
]

interface RecommendedProvider {
  id: string
  name: string
  url: string
  logo_url: string | null
  brand_color: string
  monthly_cost: string
  rating: number
}

// Age tiers, each with a representative age range shown to the user
const ageOptions = [
  { label: 'Young', range: '0–2 years' },
  { label: 'Adult', range: '3–7 years' },
  { label: 'Senior', range: '8+ years' },
]

// Budget tiers mirror the "Find Your Match" quiz wording
const budgetOptions = [
  { label: 'Tight', detail: 'Keep it low' },
  { label: 'Moderate', detail: 'Value matters' },
  { label: 'Flexible', detail: 'I want the best plan' },
]

// Reusable slider used for the age and budget questions
function QuizSlider({
  options,
  value,
  onChange,
}: {
  options: { label: string; range?: string; detail?: string }[]
  value: number
  onChange: (index: number) => void
}) {
  const current = options[value]
  // Percentage of the track that is "filled" up to the selected value
  const pct = options.length > 1 ? (value / (options.length - 1)) * 100 : 0
  return (
    <div className="mt-4">
      <div className="mb-8 text-center">
        <span className="text-2xl font-semibold text-blue-600">{current.label}</span>
        {(current.range || current.detail) && (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{current.range ?? current.detail}</p>
        )}
      </div>
      <input
        type="range"
        min={0}
        max={options.length - 1}
        step={1}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full accent-blue-600"
        style={{ background: `linear-gradient(to right, #2563eb ${pct}%, #d4d4d8 ${pct}%)` }}
        aria-label="Select an option"
      />
      <div className="mt-3 flex justify-between">
        {options.map((o, i) => (
          <button
            key={o.label}
            type="button"
            onClick={() => onChange(i)}
            className={`text-xs font-medium transition-colors ${
              i === value ? 'text-blue-600' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

const punnyPhrases = [
  'Fetching the best deals...',
  'Paws-ing to compare providers...',
  'Sniffing out hidden savings...',
  'Crunching the fur-midable numbers...',
  'Unleashing curated matches...',
  'Herding the top insurers...',
  'Pawsitively analyzing coverage...',
  'Digging up the purr-fect plan...',
]

interface PetInsuranceModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PetInsuranceModal({ isOpen, onClose }: PetInsuranceModalProps) {
  const [step, setStep] = useState(1)
  const [showAllPets, setShowAllPets] = useState(false)
  const [selectedPets, setSelectedPets] = useState<string[]>([])
  const [petCounts, setPetCounts] = useState<Record<string, number>>({})
  const [ageIndex, setAgeIndex] = useState(1)
  const [budgetIndex, setBudgetIndex] = useState(1)
  const [loading, setLoading] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [allProviders, setAllProviders] = useState<RecommendedProvider[]>([])
  const [recommended, setRecommended] = useState<RecommendedProvider[]>([])
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const supabase = useRef(createClient())

  useEffect(() => {
    if (!isOpen) return
    async function load() {
      const { data } = await supabase.current
        .from('insurance_providers')
        .select('id, name, url, logo_url, brand_color, monthly_cost, rating')
        .eq('is_active', true)
      if (data) setAllProviders(data as RecommendedProvider[])
    }
    load()
  }, [isOpen])

  const togglePet = (id: string) => {
    setSelectedPets((prev) => {
      if (prev.includes(id)) {
        const next = prev.filter((p) => p !== id)
        setPetCounts((counts) => {
          const c = { ...counts }
          delete c[id]
          return c
        })
        return next
      }
      setPetCounts((counts) => ({ ...counts, [id]: counts[id] || 1 }))
      return [...prev, id]
    })
  }

  const handleNext = () => {
    if (step === 4) {
      setStep(5)
      runLoading()
    } else if (step < 4) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1 && !loading) setStep(step - 1)
  }

  const runLoading = () => {
    setLoading(true)
    setPhraseIndex(0)
    // Randomly curate a fresh set of recommendations each quote
    const shuffled = [...allProviders].sort(() => Math.random() - 0.5)
    const count = Math.min(shuffled.length, 3 + Math.floor(Math.random() * 2)) // 3 or 4
    setRecommended(shuffled.slice(0, count))
    // Rotate punny phrases every second
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % punnyPhrases.length)
    }, 1000)
    timers.current.push(interval as unknown as ReturnType<typeof setTimeout>)
    // Total load time: 2.9 seconds
    const done = setTimeout(() => {
      clearInterval(interval)
      setLoading(false)
    }, 2900)
    timers.current.push(done)
  }

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => clearTimeout(t))
    }
  }, [])

  const handleClose = () => {
    timers.current.forEach((t) => clearTimeout(t))
    timers.current = []
    setStep(1)
    setShowAllPets(false)
    setSelectedPets([])
    setPetCounts({})
    setAgeIndex(1)
    setBudgetIndex(1)
    setLoading(false)
    setPhraseIndex(0)
    setRecommended([])
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            // Step 1 with only the 3 starter tiles uses a compact box; choosing
            // "More" (or any later step) expands it to fit all options.
            maxWidth: step === 1 && !showAllPets ? 440 : 672,
          }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header — themed blue banner with a protection badge */}
          <div className="relative flex items-center justify-between gap-4 overflow-hidden bg-gradient-to-br from-blue-600 to-blue-500 p-6 text-white">
            {/* Decorative watermark paw for a warm, on-theme feel */}
            <PawPrint
              aria-hidden="true"
              className="pointer-events-none absolute -right-3 -top-4 h-28 w-28 rotate-12 text-white/10"
            />
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
                <ShieldCheck className="h-6 w-6 text-white" />
              </span>
              <div>
                <h2 className="text-xl font-semibold leading-tight">Find Your Coverage</h2>
                <p className="text-sm text-blue-100">Personalized pet protection in a few taps</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="relative z-10 rounded-full p-2 transition hover:bg-white/15"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Step indicator — segmented dots read cleaner than a raw progress bar */}
          <div className="flex items-center justify-between gap-3 border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
            <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Step {step} of 5
            </span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === step
                      ? 'w-6 bg-blue-600'
                      : s < step
                        ? 'w-1.5 bg-blue-600'
                        : 'w-1.5 bg-zinc-200 dark:bg-zinc-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === 1 && (
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">What type of pets do you have?</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Select all that apply</p>
                <div className={`grid gap-3 ${showAllPets ? 'grid-cols-3 sm:grid-cols-5' : 'grid-cols-3'}`}>
                  {(showAllPets ? petTypes : petTypes.slice(0, 2)).map((pet) => {
                    const selected = selectedPets.includes(pet.id)
                    return (
                      <button
                        key={pet.id}
                        onClick={() => togglePet(pet.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                          selected
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                        }`}
                      >
                        {pet.icon ? (
                          <pet.icon className={`w-7 h-7 mb-2 ${selected ? 'text-blue-600' : 'text-zinc-400'}`} />
                        ) : (
                          <div className={`w-7 h-7 mb-2 rounded-full ${selected ? 'bg-blue-600' : 'bg-zinc-300'}`} />
                        )}
                        <span className={`text-sm font-medium ${selected ? 'text-blue-600' : 'text-zinc-600 dark:text-zinc-300'}`}>
                          {pet.name}
                        </span>
                      </button>
                    )
                  })}
                  {/* "More" tile reveals the rest of the pet types when clicked */}
                  {!showAllPets && (
                    <button
                      onClick={() => setShowAllPets(true)}
                      className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-600 text-zinc-500 dark:text-zinc-400 transition-all hover:border-blue-400 hover:text-blue-600"
                    >
                      <MoreHorizontal className="w-7 h-7 mb-2" />
                      <span className="text-sm font-medium">More</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">How many of each?</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Set the number of pets for each type</p>
                <div className="space-y-6 max-h-[340px] overflow-y-auto pr-1">
                  {selectedPets.map((id) => {
                    const pet = petTypes.find((p) => p.id === id)!
                    const count = petCounts[id] || 1
                    return (
                      <div key={id} className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {pet.icon ? (
                              <pet.icon className="w-5 h-5 text-blue-600" />
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-blue-600" />
                            )}
                            <span className="font-medium text-zinc-900 dark:text-white">{pet.name}</span>
                          </div>
                          <span className="text-2xl font-bold text-blue-600 tabular-nums w-8 text-right">{count}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={count}
                          onChange={(e) => setPetCounts((c) => ({ ...c, [id]: parseInt(e.target.value) }))}
                          className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          style={{ background: `linear-gradient(to right, #2563eb ${((count - 1) / 9) * 100}%, #d4d4d8 ${((count - 1) / 9) * 100}%)` }}
                        />
                        <div className="flex justify-between mt-1 text-xs text-zinc-400">
                          <span>1</span>
                          <span>10</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">How old is your pet?</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Slide to the life stage that fits best</p>
                <QuizSlider options={ageOptions} value={ageIndex} onChange={setAgeIndex} />
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">What is your monthly budget?</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Slide to set your comfort level</p>
                <QuizSlider options={budgetOptions} value={budgetIndex} onChange={setBudgetIndex} />
              </div>
            )}

            {step === 5 && loading && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-6" />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={phraseIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="text-lg font-medium text-zinc-700 dark:text-zinc-200"
                  >
                    {punnyPhrases[phraseIndex]}
                  </motion.p>
                </AnimatePresence>
                <p className="text-sm text-zinc-400 mt-2">Curating your personalized recommendation</p>
              </div>
            )}

            {step === 5 && !loading && (
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">Your Curated Matches</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Based on your selection, here are the best providers for you. Click any to visit their site.</p>
                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                  {recommended.map((provider, i) => (
                    <motion.a
                      key={provider.id}
                      href={provider.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.35 }}
                      className="group relative flex items-center justify-between overflow-hidden p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-transparent hover:border-blue-500 hover:shadow-md transition-all"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-0 h-full w-1.5"
                        style={{ backgroundColor: provider.brand_color }}
                      />
                      <div className="flex items-center gap-3 pl-2">
                        {provider.logo_url ? (
                          <img
                            src={provider.logo_url || '/placeholder.svg'}
                            alt={`${provider.name} logo`}
                            className="w-12 h-12 rounded-xl object-contain bg-white shrink-0"
                          />
                        ) : (
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white shrink-0"
                            style={{ backgroundColor: provider.brand_color }}
                          >
                            {provider.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          {i === 0 && (
                            <span className="inline-block mb-1 rounded-full bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-600">
                              Top Match
                            </span>
                          )}
                          <p className="font-medium text-zinc-900 dark:text-white">{provider.name}</p>
                          <div className="flex items-center gap-2 text-sm text-zinc-500">
                            <span>{provider.monthly_cost || 'Custom pricing'}</span>
                            <span className="flex items-center gap-0.5 text-yellow-500">
                              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                              {provider.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-white transition-transform group-hover:scale-105 shrink-0"
                        style={{ backgroundColor: provider.brand_color }}
                      >
                        Visit
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </motion.a>
                  ))}
                </div>
                <Link
                  href="/providers"
                  onClick={handleClose}
                  className="mt-5 flex items-center justify-center gap-2 w-full rounded-full border border-zinc-200 dark:border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200 transition-colors hover:border-blue-500 hover:text-blue-600"
                >
                  <BarChart3 className="w-4 h-4" />
                  Compare full stats for all providers
                </Link>
              </div>
            )}
          </div>

          {/* Footer */}
          {!loading && (
            <div className="flex items-center justify-between p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className="px-5 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              {step < 5 ? (
                <button
                  onClick={handleNext}
                  disabled={step === 1 && selectedPets.length === 0}
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition"
                >
                  Done
                </button>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
