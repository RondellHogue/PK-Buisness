'use client'

import { useState } from 'react'
import { X, Dog, Cat, Bird, Rabbit, Fish, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const petTypes = [
  { id: 'dog', name: 'Dog', icon: Dog },
  { id: 'cat', name: 'Cat', icon: Cat },
  { id: 'bird', name: 'Bird', icon: Bird },
  { id: 'rabbit', name: 'Rabbit', icon: Rabbit },
  { id: 'fish', name: 'Fish', icon: Fish },
  { id: 'other', name: 'Other', icon: null },
]

interface PetInsuranceModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PetInsuranceModal({ isOpen, onClose }: PetInsuranceModalProps) {
  const [step, setStep] = useState(1)
  const [selectedPet, setSelectedPet] = useState<string | null>(null)
  const [petCount, setPetCount] = useState(1)

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleClose = () => {
    setStep(1)
    setSelectedPet(null)
    setPetCount(1)
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
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">What type of pet do you have?</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Select the pet you want to insure</p>
                <div className="grid grid-cols-3 gap-4">
                  {petTypes.map((pet) => (
                    <button
                      key={pet.id}
                      onClick={() => setSelectedPet(pet.id)}
                      className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${
                        selectedPet === pet.id
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                      }`}
                    >
                      {pet.icon ? (
                        <pet.icon className={`w-8 h-8 mb-2 ${selectedPet === pet.id ? 'text-blue-600' : 'text-zinc-400'}`} />
                      ) : (
                        <div className={`w-8 h-8 mb-2 rounded-full ${selectedPet === pet.id ? 'bg-blue-600' : 'bg-zinc-300'}`} />
                      )}
                      <span className={`text-sm font-medium ${selectedPet === pet.id ? 'text-blue-600' : 'text-zinc-600 dark:text-zinc-300'}`}>
                        {pet.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">How many pets?</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">Select the number of pets to insure</p>
                <div className="flex flex-col items-center">
                  <div className="text-6xl font-bold text-blue-600 mb-6">{petCount}</div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={petCount}
                    onChange={(e) => setPetCount(parseInt(e.target.value))}
                    className="w-full max-w-md h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between w-full max-w-md mt-2 text-sm text-zinc-500">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
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
                disabled={step === 1 && !selectedPet}
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
