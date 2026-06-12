'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Check, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Provider {
  id: string
  name: string
  url: string
  logo_url: string
  brand_color: string
  monthly_cost: string
  deductible: string
  reimbursement: string
  wait_period: string
  coverage_limit: string
  rating: number
  is_active: boolean
}

export function ProviderSlider() {
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    loadProviders()
  }, [])

  async function loadProviders() {
    const { data } = await supabase
      .from('insurance_providers')
      .select('*')
      .eq('is_active', true)
      .order('display_order')
    
    if (data) setProviders(data)
    setLoading(false)
  }

  const itemsPerPage = 3
  const totalPages = Math.ceil(providers.length / itemsPerPage)
  const currentPage = Math.floor(currentIndex / itemsPerPage)

  const scroll = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(Math.max(0, currentIndex - itemsPerPage))
    } else if (direction === 'right' && currentIndex < providers.length - itemsPerPage) {
      setCurrentIndex(Math.min(providers.length - itemsPerPage, currentIndex + itemsPerPage))
    }
  }

  const goToPage = (page: number) => {
    setCurrentIndex(page * itemsPerPage)
  }

  const visibleProviders = providers.slice(currentIndex, currentIndex + itemsPerPage)

  if (loading) {
    return (
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="animate-pulse">Loading providers...</div>
        </div>
      </section>
    )
  }

  if (providers.length === 0) {
    return (
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-xl lg:text-2xl font-semibold text-foreground">Top Pet Insurance Providers</h2>
          <p className="mt-4 text-muted-foreground">Coming soon - check back for provider comparisons.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="providers" className="relative py-8 lg:py-12">
      <div className="absolute inset-0 glass-card-reflection" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <h2 className="text-xl lg:text-2xl font-semibold text-foreground tracking-tight">
            Top Pet Insurance Providers
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Compare the leading pet insurance companies to find the best coverage.
          </p>
        </motion.div>

        <div className="relative">
          {providers.length > itemsPerPage && (
            <>
              <button
                onClick={() => scroll('left')}
                disabled={currentIndex === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full glass flex items-center justify-center transition-all ${
                  currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:shadow-lg'
                }`}
              >
                <ChevronLeft className="w-6 h-6 text-foreground" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={currentIndex >= providers.length - itemsPerPage}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full glass flex items-center justify-center transition-all ${
                  currentIndex >= providers.length - itemsPerPage ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:shadow-lg'
                }`}
              >
                <ChevronRight className="w-6 h-6 text-foreground" />
              </button>
            </>
          )}

          <div ref={sliderRef} className="overflow-hidden">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {visibleProviders.map((provider) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-3xl p-6 hover:border-primary/40 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-5">
                    {provider.logo_url ? (
                      <img
                        src={provider.logo_url}
                        alt={`${provider.name} logo`}
                        className="w-16 h-16 object-contain rounded-2xl"
                      />
                    ) : (
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
                        style={{ backgroundColor: provider.brand_color }}
                      >
                        {provider.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Star className="w-5 h-5 fill-primary text-primary" />
                      <span className="font-semibold text-foreground">{provider.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-4">{provider.name}</h3>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-muted/50 rounded-xl p-3">
                      <div className="text-xs text-muted-foreground mb-1">Monthly</div>
                      <div className="font-semibold text-foreground text-sm">{provider.monthly_cost || 'N/A'}</div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-3">
                      <div className="text-xs text-muted-foreground mb-1">Deductible</div>
                      <div className="font-semibold text-foreground text-sm">{provider.deductible || 'N/A'}</div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-3">
                      <div className="text-xs text-muted-foreground mb-1">Reimburse</div>
                      <div className="font-semibold text-foreground text-sm">{provider.reimbursement || 'N/A'}</div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-3">
                      <div className="text-xs text-muted-foreground mb-1">Wait Period</div>
                      <div className="font-semibold text-foreground text-sm">{provider.wait_period || 'N/A'}</div>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-4">
                    <div className="text-xs text-muted-foreground mb-1">Annual Coverage Limit</div>
                    <div className="font-semibold text-primary">{provider.coverage_limit || 'N/A'}</div>
                  </div>

                  <div className="flex gap-3">
                    {provider.url ? (
                      <a
                        href={provider.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        View Details
                      </a>
                    ) : (
                      <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                        View Details
                      </button>
                    )}
                    {provider.url && (
                      <a
                        href={provider.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl glass px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentPage === index
                      ? 'w-8 h-2 bg-primary'
                      : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-xs text-muted-foreground text-center max-w-2xl mx-auto"
        >
          * Pricing and coverage details are estimates and may vary based on pet age, breed, location, and selected plan.
        </motion.p>
      </div>
    </section>
  )
}
