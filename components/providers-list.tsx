'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  ArrowUpRight,
  ShieldCheck,
  Wallet,
  Percent,
  Clock,
  Infinity as InfinityIcon,
  ChevronDown,
  Check,
  X,
  Plus,
  Minus,
} from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { getProviderReview, type ProviderReview } from '@/lib/provider-reviews'

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
          <div key={i} className="h-32 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 animate-pulse" />
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
    <div className="space-y-16">
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">In-depth provider reviews</h2>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Expand any provider for a full breakdown of coverage, claims, pricing, and who it suits, with the
            drawbacks included.
          </p>
        </div>
        {/* Compact two-up tiles on mobile so ~4 fit on screen at once; the full
            review opens in a full-screen overlay. Single roomy column on desktop
            where the review expands inline. */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-1 lg:gap-5">
          {providers.map((provider, index) => (
            <ProviderCard key={provider.id} provider={provider} index={index} />
          ))}
        </div>
      </div>

      <ComparisonTable providers={providers} />
    </div>
  )
}

/* Pull the first number out of a string like "$25", "70-90%", "14 days". */
function leadingNum(s?: string | null) {
  const m = s?.match(/\d+(\.\d+)?/)
  return m ? parseFloat(m[0]) : null
}

/* ----------------------------- Comparison table ---------------------------- */

function ComparisonTable({ providers }: { providers: Provider[] }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Compare providers at a glance</h2>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Scroll sideways on mobile to see every column. Figures are estimates; confirm current terms with the
          provider.
        </p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-800/60 text-left">
              <th className="sticky left-0 z-10 bg-zinc-50 dark:bg-zinc-800/60 px-4 py-3 font-semibold text-zinc-900 dark:text-white">
                Provider
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Monthly</th>
              <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Reimbursement</th>
              <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Deductible</th>
              <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Waiting Period</th>
              <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Annual Limit</th>
              <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Best For</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p) => {
              const review = getProviderReview(p.name)
              return (
                <tr
                  key={p.id}
                  className="border-t border-zinc-100 dark:border-zinc-800 align-top hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30"
                >
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-white dark:bg-zinc-900 px-4 py-4 text-left font-medium text-zinc-900 dark:text-white"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: p.brand_color }}
                      />
                      {p.name}
                    </span>
                  </th>
                  <td className="px-4 py-4 text-zinc-600 dark:text-zinc-300">
                    <CellBar value={p.monthly_cost} pct={pctOf(leadingNum(p.monthly_cost), 80)} color={p.brand_color} />
                  </td>
                  <td className="px-4 py-4 text-zinc-600 dark:text-zinc-300">
                    <CellBar value={p.reimbursement} pct={leadingNum(p.reimbursement)} color={p.brand_color} />
                  </td>
                  <td className="px-4 py-4 text-zinc-600 dark:text-zinc-300">{p.deductible || '—'}</td>
                  <td className="px-4 py-4 text-zinc-600 dark:text-zinc-300">{p.wait_period || '—'}</td>
                  <td className="px-4 py-4 text-zinc-600 dark:text-zinc-300">{p.coverage_limit || '—'}</td>
                  <td className="px-4 py-4 text-zinc-600 dark:text-zinc-300">{review?.bestFor ?? '—'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* --------------------------- Expandable review card ------------------------ */

function ProviderCard({ provider, index }: { provider: Provider; index: number }) {
  const [open, setOpen] = useState(false)
  const reviews = formatReviews(provider.review_count)
  const review = getProviderReview(provider.name)

  // Lock body scroll while the mobile full-screen overlay is open (mobile only;
  // the desktop accordion should not lock scrolling).
  useEffect(() => {
    if (!open) return
    if (!window.matchMedia('(max-width: 1023px)').matches) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      {/* ---------------------- Compact tile (mobile only) ---------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.4 }}
        className="relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 lg:hidden"
      >
        <span aria-hidden className="absolute left-0 top-0 h-full w-1.5" style={{ backgroundColor: provider.brand_color }} />
        <div className="flex flex-1 flex-col p-4 pl-5">
          <div className="flex items-center gap-3">
            {provider.logo_url ? (
              <img
                src={provider.logo_url || '/placeholder.svg'}
                alt={`${provider.name} logo`}
                className="h-10 w-10 shrink-0 rounded-lg object-contain bg-white"
              />
            ) : (
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-base font-bold text-white"
                style={{ backgroundColor: provider.brand_color }}
              >
                {provider.name.charAt(0)}
              </div>
            )}
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-zinc-900 dark:text-white">{provider.name}</h3>
              <div className="mt-0.5 flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-zinc-900 dark:text-white">{provider.rating}</span>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <Stat icon={Wallet} label="Monthly" value={provider.monthly_cost} pct={pctOf(leadingNum(provider.monthly_cost), 80)} barColor={provider.brand_color} />
          </div>

          <button
            onClick={() => setOpen(true)}
            className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-200 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
            aria-expanded={open}
          >
            View More
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.div>

      {/* ------------------ Full-screen detail overlay (mobile) ----------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute inset-x-0 bottom-0 top-12 flex flex-col overflow-hidden rounded-t-3xl bg-white dark:bg-zinc-900"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky overlay header */}
              <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 p-4">
                {provider.logo_url ? (
                  <img
                    src={provider.logo_url || '/placeholder.svg'}
                    alt={`${provider.name} logo`}
                    className="h-11 w-11 shrink-0 rounded-xl object-contain bg-white"
                  />
                ) : (
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white"
                    style={{ backgroundColor: provider.brand_color }}
                  >
                    {provider.name.charAt(0)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-semibold text-zinc-900 dark:text-white">{provider.name}</h3>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-zinc-900 dark:text-white">{provider.rating}</span>
                    {reviews && <span className="text-xs text-zinc-400">· {reviews}</span>}
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <div className="grid grid-cols-2 gap-x-4 gap-y-4 p-5">
                  <Stat icon={Wallet} label="Monthly" value={provider.monthly_cost} pct={pctOf(leadingNum(provider.monthly_cost), 80)} barColor={provider.brand_color} />
                  <Stat icon={ShieldCheck} label="Deductible" value={provider.deductible} />
                  <Stat icon={Percent} label="Reimburse" value={provider.reimbursement} pct={leadingNum(provider.reimbursement)} barColor={provider.brand_color} />
                  <Stat icon={Clock} label="Wait Period" value={provider.wait_period} />
                  <Stat icon={InfinityIcon} label="Annual Limit" value={provider.coverage_limit} />
                </div>

                {provider.highlights?.length > 0 && (
                  <div className="flex flex-wrap gap-2 px-5 pb-2">
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

                {review && <ReviewBody name={provider.name} review={review} />}
              </div>

              {/* Sticky CTA */}
              <div className="border-t border-zinc-100 dark:border-zinc-800 p-4">
                <a
                  href={provider.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: provider.brand_color }}
                >
                  Visit {provider.name}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------------- Full row (desktop only) ------------------------ */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.4 }}
        className="relative hidden overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 lg:block"
      >
        <span aria-hidden className="absolute left-0 top-0 h-full w-1.5" style={{ backgroundColor: provider.brand_color }} />

        <div className="flex flex-row items-center gap-8 p-6 pl-8">
          {/* Logo + name */}
          <div className="flex items-center gap-4 w-56 shrink-0">
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
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{provider.name}</h3>
              <div className="mt-1 flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-zinc-900 dark:text-white">{provider.rating}</span>
                {reviews && <span className="text-xs text-zinc-400">· {reviews}</span>}
              </div>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-5 gap-x-6">
            <Stat icon={Wallet} label="Monthly" value={provider.monthly_cost} pct={pctOf(leadingNum(provider.monthly_cost), 80)} barColor={provider.brand_color} />
            <Stat icon={ShieldCheck} label="Deductible" value={provider.deductible} />
            <Stat icon={Percent} label="Reimburse" value={provider.reimbursement} pct={leadingNum(provider.reimbursement)} barColor={provider.brand_color} />
            <Stat icon={Clock} label="Wait Period" value={provider.wait_period} />
            <Stat icon={InfinityIcon} label="Annual Limit" value={provider.coverage_limit} />
          </div>

          <div className="flex w-auto shrink-0 flex-col items-end gap-2">
            <a
              href={provider.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: provider.brand_color }}
            >
              Visit Site
              <ArrowUpRight className="h-4 w-4" />
            </a>
            {review && (
              <button
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                aria-expanded={open}
              >
                {open ? 'Hide review' : 'Read review'}
                <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
        </div>

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

        <AnimatePresence initial={false}>
          {open && review && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-zinc-100 dark:border-zinc-800"
            >
              <ReviewBody name={provider.name} review={review} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

function ReviewBody({ name, review }: { name: string; review: ProviderReview }) {
  return (
    <div className="px-6 py-7 pl-8 space-y-7">
      <Block title="Overview">
        <p>{review.overview}</p>
      </Block>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 p-5">
          <h4 className="mb-3 flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400">
            <Plus className="h-4 w-4" /> Pros
          </h4>
          <ul className="space-y-2">
            {review.pros.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-rose-100 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 p-5">
          <h4 className="mb-3 flex items-center gap-2 font-semibold text-rose-700 dark:text-rose-400">
            <Minus className="h-4 w-4" /> Cons
          </h4>
          <ul className="space-y-2">
            {review.cons.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Block title="Coverage Details"><p>{review.coverageDetails}</p></Block>
        <Block title="Claims Experience"><p>{review.claimsExperience}</p></Block>
        <Block title="Pricing Considerations"><p>{review.pricingConsiderations}</p></Block>
        <Block title="Customer Experience"><p>{review.customerExperience}</p></Block>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-white">Best for</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">{review.bestFor}</p>
        </div>
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 p-4">
          <h4 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-white">Not ideal for</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">{review.notIdealFor}</p>
        </div>
      </div>

      <Block title="Alternative providers to consider">
        <div className="flex flex-wrap gap-2">
          {review.alternatives.map((alt) => (
            <span
              key={alt}
              className="rounded-full border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300"
            >
              {alt}
            </span>
          ))}
        </div>
      </Block>

      <Block title="Frequently asked questions">
        <div className="space-y-4">
          {review.faqs.map((f) => (
            <div key={f.q}>
              <p className="font-medium text-zinc-900 dark:text-white">{f.q}</p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{f.a}</p>
            </div>
          ))}
        </div>
      </Block>

      <div className="rounded-xl border border-zinc-100 dark:border-zinc-800 p-4 text-xs text-zinc-500 dark:text-zinc-400">
        <p>
          <span className="font-medium text-zinc-700 dark:text-zinc-300">Review methodology:</span> This summary draws
          on {name}&apos;s public policy information and recurring themes across independent review sources. See our{' '}
          <Link href="/methodology" className="text-blue-600 hover:underline">Review Methodology</Link>.
        </p>
        <p className="mt-2">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">Affiliate disclosure:</span> Some links may
          earn us a commission at no cost to you, and never affect our assessments. See our{' '}
          <Link href="/affiliate-disclosure" className="text-blue-600 hover:underline">Affiliate Disclosure</Link>.
        </p>
      </div>
    </div>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 font-semibold text-zinc-900 dark:text-white">{title}</h4>
      <div className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{children}</div>
    </div>
  )
}

/* Normalize a raw number to a 0-100 percentage against a max scale. */
function pctOf(n: number | null, max: number) {
  if (n == null) return null
  return Math.max(6, Math.min(100, (n / max) * 100))
}

/* A comparison-table cell that shows the value plus a small proportional bar. */
function CellBar({ value, pct, color }: { value?: string; pct?: number | null; color?: string }) {
  return (
    <div className="min-w-[88px]">
      <span className="font-medium text-zinc-900 dark:text-white">{value || '—'}</span>
      {pct != null && (
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color || '#2563eb' }} />
        </div>
      )}
    </div>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
  pct,
  barColor,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  pct?: number | null
  barColor?: string
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-1 truncate text-sm sm:text-base font-semibold text-zinc-900 dark:text-white">{value || 'N/A'}</div>
      {pct != null && (
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, backgroundColor: barColor || '#2563eb' }}
          />
        </div>
      )}
    </div>
  )
}
