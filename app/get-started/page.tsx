'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Dog, Cat, Bird, Rabbit, Fish, HelpCircle, Star, Check } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const petTypes = [
  { id: 'dog', name: 'Dog', icon: Dog },
  { id: 'cat', name: 'Cat', icon: Cat },
  { id: 'bird', name: 'Bird', icon: Bird },
  { id: 'rabbit', name: 'Rabbit', icon: Rabbit },
  { id: 'fish', name: 'Fish', icon: Fish },
  { id: 'other', name: 'Other', icon: HelpCircle },
]

const providers = [
  { name: 'Lemonade', price: 15, rating: 5, features: ['Fast claims', 'No waiting period', 'Customizable plans'] },
  { name: 'Spot', price: 20, rating: 5, features: ['Wellness coverage', 'No age limits', '90% reimbursement'], url: 'https://sovrn.co/ie9i24q' },
  { name: 'Embrace', price: 25, rating: 4, features: ['Dental coverage', 'Rx coverage', 'Diminishing deductible'] },
  { name: 'Healthy Paws', price: 30, rating: 4, features: ['Unlimited benefits', 'Fast processing', 'No caps'] },
]

export default function GetStartedPage() {
  const [step, setStep] = useState(1)
  const [selectedPet, setSelectedPet] = useState<string | null>(null)
  const [petCount, setPetCount] = useState(1)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-zinc-900 dark:to-zinc-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-cropped.png"
              alt="Pet Keepings"
              width={140}
              height={35}
              className="h-9 w-auto dark:invert"
            />
          </Link>
          <Link 
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="fixed top-[73px] left-0 right-0 z-40 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Step {step} of 3</span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {step === 1 && 'Select your pet'}
              {step === 2 && 'Number of pets'}
              {step === 3 && 'View providers'}
            </span>
          </div>
          <div className="h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Select Pet Type */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h1 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-white mb-4">
                  What type of pet do you have?
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 mb-12 max-w-lg mx-auto">
                  Select your pet type to find the best insurance options tailored for them.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  {petTypes.map((pet) => {
                    const Icon = pet.icon
                    return (
                      <button
                        key={pet.id}
                        onClick={() => setSelectedPet(pet.id)}
                        className={`p-6 rounded-2xl border-2 transition-all ${
                          selectedPet === pet.id
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600'
                        }`}
                      >
                        <Icon className={`w-10 h-10 mx-auto mb-3 ${
                          selectedPet === pet.id ? 'text-blue-600' : 'text-zinc-400'
                        }`} />
                        <span className={`font-medium ${
                          selectedPet === pet.id ? 'text-blue-600' : 'text-zinc-700 dark:text-zinc-300'
                        }`}>
                          {pet.name}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() => selectedPet && setStep(2)}
                    disabled={!selectedPet}
                    className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Number of Pets */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h1 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-white mb-4">
                  How many pets do you have?
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 mb-12 max-w-lg mx-auto">
                  Many providers offer multi-pet discounts. Let us know how many pets you want to insure.
                </p>

                <div className="max-w-md mx-auto">
                  <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-700">
                    <div className="text-7xl font-bold text-blue-600 mb-6">{petCount}</div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                      {petCount === 1 ? 'pet' : 'pets'} to insure
                    </p>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={petCount}
                      onChange={(e) => setPetCount(parseInt(e.target.value))}
                      className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between mt-2 text-xs text-zinc-400">
                      <span>1</span>
                      <span>10</span>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-center gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 px-6 py-4 text-base font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                  >
                    See Providers
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Providers */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h1 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-white mb-4">
                  Recommended providers for you
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 mb-12 max-w-lg mx-auto">
                  Based on your {selectedPet} and {petCount} {petCount === 1 ? 'pet' : 'pets'}, here are our top recommendations.
                </p>

                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  {providers.map((provider, index) => (
                    <motion.div
                      key={provider.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white dark:bg-zinc-800 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700 text-left hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">{provider.name}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < provider.rating ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-blue-600">${provider.price}</span>
                          <span className="text-sm text-zinc-500 dark:text-zinc-400">/mo</span>
                        </div>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {provider.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                            <Check className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {(provider as { url?: string }).url ? (
                        <a
                          href={(provider as { url?: string }).url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full py-3 text-center text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                        >
                          Get Quote
                        </a>
                      ) : (
                        <button className="w-full py-3 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                          Get Quote
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 flex justify-center gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 px-6 py-4 text-base font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                  >
                    Learn More About These Providers
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
