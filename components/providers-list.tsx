'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ArrowUpRight, ShieldCheck, Wallet, Percent, Clock, Infinity as InfinityIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Provider {
  id: string
  name: string
  url: string
  logo_url: string | null
  brand_color: string
  monthly_cost: string
  deductible: string
  reimbursement: string
  wait_period: string
  coverage_limit: string
  rating: number
  review_count: number
  highlights: string[]
  is_active: boolean
}

function formatReviews(count: number) {
  if (!count) return null
  if (count >= 1000) return `${Math.round(count / 1000)}k+ reviews`
  return `${count}+ reviews`
}

export function ProvidersList() {
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('insurance_providers')
        .select('*')
        .eq('is_active', true)
        .order('display_order')
      if (data) setProviders(data as Provider[])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (providers.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 p-12 text-center text-zinc-500">
        No providers available yet. Check back soon.
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {providers.map((provider, index) => {
        const reviews = formatReviews(provider.review_count)
        return (
          <motion.a
            key={provider.id}
            href={provider.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.4 }}
            className="group relative block overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:border-transparent"
          >
            {/* Brand accent bar */}
            <span
              aria-hidden
              className="absolute left-0 top-0 h-full w-1.5"
              style={{ backgroundColor: provider.brand_color }}
            />

            <div className="flex flex-col gap-6 p-6 pl-8 lg:flex-row lg:items-center lg:gap-8">
              {/* Logo + name */}
              <div className="flex items-center gap-4 lg:w-64 lg:shrink-0">
                {provider.logo_url ? (
                  <img
                    src={provider.logo_url || '/placeholder.svg'}
                    alt={`${provider.name} logo`}
                    className="h-16 w-16 shrink-0 rounded-xl object-contain bg-white"
                  />
                ) : (
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-2xl font-bold text-white"
                    style={{ backgroundColor: provider.brand_color }}
                  >
                    {provider.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {provider.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-zinc-900 dark:text-white">
                      {provider.rating}
                    </span>
                    {reviews && (
                      <span className="text-xs text-zinc-400">· {reviews}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
                <Stat icon={Wallet} label="Monthly" value={provider.monthly_cost} />
                <Stat icon={ShieldCheck} label="Deductible" value={provider.deductible} />
                <Stat icon={Percent} label="Reimburse" value={provider.reimbursement} />
                <Stat icon={Clock} label="Wait Period" value={provider.wait_period} />
                <Stat icon={InfinityIcon} label="Annual Limit" value={provider.coverage_limit} />
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between gap-4 lg:w-auto lg:shrink-0 lg:flex-col lg:items-end">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform group-hover:scale-105"
                  style={{ backgroundColor: provider.brand_color }}
                >
                  Visit Site
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>

            {/* Highlights */}
            {provider.highlights?.length > 0 && (
              <div className="flex flex-wrap gap-2 border-t border-zinc-100 dark:border-zinc-800 px-6 py-3 pl-8">
                {provider.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300"
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}
          </motion.a>
        )
      })}
    </div>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-1 truncate text-sm font-semibold text-zinc-900 dark:text-white">
        {value || 'N/A'}
      </div>
    </div>
  )
}
