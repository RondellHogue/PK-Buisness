'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Dog, Cat, Bird, Rabbit, Fish, Turtle, Snail, Squirrel, Mouse, ChevronRight, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const petTypes = [
  { id: 'dog', name: 'Dog', icon: Dog },
  { id: 'cat', name: 'Cat', icon: Cat },
  { id: 'bird', name: 'Bird', icon: Bird },
  { id: 'rabbit', name: 'Rabbit', icon: Rabbit },
  { id: 'fish', name: 'Fish', icon: Fish },
  { id: 'reptile', name: 'Reptile', icon: Turtle },
  { id: 'snake', name: 'Snake', icon: Snail },
  { id: 'ferret', name: 'Ferret', icon: Squirrel },
  { id: 'rodent', name: 'Rodent', icon: Mouse },
  { id: 'other', name: 'Other', icon: null },
]

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
  const [selectedPets, setSelectedPets] = useState<string[]>([])
  const [petCounts, setPetCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

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
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
      runLoading()
    }
  }

  const handleBack = () => {
    if (step > 1 && !loading) setStep(step - 1)
  }

  const runLoading = () => {
    setLoading(true)
    setPhraseIndex(0)
    // Rotate punny phrases every other second (every 1s here for liveliness)
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % punnyPhrases.length)
    }, 1000)
    timers.current.push(interval as unknown as ReturnType<typeof setTimeout>)
    // Total load time: 3 seconds
    const done = setTimeout(() => {
      clearInterval(interval)
      setLoading(false)
    }, 3000)
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
    setSelectedPets([])
    setPetCounts({})
    setLoading(false)
    setPhraseIndex(0)
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
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Find Your Coverage</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Step {step} of 3</p>
            </div>
            <button onClick={handleClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition">
              <X className="w-5 h-5 text-zinc-500" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-zinc-100 dark:bg-zinc-800">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          {/* Content */}
          <div className="p-6">
            {step === 1 && (
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">What type of pets do you have?</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Select all that apply</p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {petTypes.map((pet) => {
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
                          className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
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

            {step === 3 && loading && (
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

            {step === 3 && !loading && (
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">Recommended Providers</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Based on your selection, here are the best matches</p>
                <div className="space-y-3">
                  {['Lemonade', 'Spot', 'Embrace', 'Healthy Paws'].map((provider, i) => (
                    <div key={provider} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">{provider[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium text-zinc-900 dark:text-white">{provider}</p>
                          <p className="text-sm text-zinc-500">From ${15 + i * 5}/mo</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        {'★'.repeat(5 - Math.floor(i / 2))}
                        <span className="text-zinc-400">{'★'.repeat(Math.floor(i / 2))}</span>
                      </div>
                    </div>
                  ))}
                </div>
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
              {step < 3 ? (
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
