'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { sendContactMessage } from './actions'
import { Send, Check, Lock, Mail } from 'lucide-react'

const SUPPORT_EMAIL = 'help@pkservice.com'

export default function ContactPage() {
  const [fromEmail, setFromEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSend = async () => {
    setError('')
    setSending(true)
    const result = await sendContactMessage({ fromEmail, subject, body })
    setSending(false)
    if (result.success) {
      setSent(true)
    } else {
      setError(result.error || 'Something went wrong.')
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <PageHeader />
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-blue-600 mb-3">Get in touch</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white text-balance">
            Contact our team
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 text-pretty">
            Have a question about pet insurance? Compose a message below and we&apos;ll get back to you.
          </p>
        </div>

        {/* Email composer window */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-900/5 overflow-hidden">
          {/* Window title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex items-center gap-2 mx-auto text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <Mail className="w-4 h-4" />
              New Message
            </div>
          </div>

          {sent ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center mb-4">
                <Check className="w-7 h-7 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">Message sent</h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
                Thanks for reaching out. Our team will review your message and reply to{' '}
                <span className="font-medium text-zinc-900 dark:text-white">{fromEmail}</span> soon.
              </p>
              <button
                onClick={() => {
                  setSent(false)
                  setFromEmail('')
                  setSubject('')
                  setBody('')
                }}
                className="mt-6 inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {/* To (locked) */}
              <div className="flex items-center gap-3 px-5 py-3">
                <label className="text-sm font-medium text-zinc-400 w-16 shrink-0">To</label>
                <div className="flex items-center gap-2 flex-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-sm font-medium text-blue-700 dark:text-blue-300">
                    <Lock className="w-3 h-3" />
                    {SUPPORT_EMAIL}
                  </span>
                </div>
              </div>

              {/* From */}
              <div className="flex items-center gap-3 px-5 py-3">
                <label htmlFor="from" className="text-sm font-medium text-zinc-400 w-16 shrink-0">
                  From
                </label>
                <input
                  id="from"
                  type="email"
                  value={fromEmail}
                  onChange={(e) => setFromEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none"
                />
              </div>

              {/* Subject */}
              <div className="flex items-center gap-3 px-5 py-3">
                <label htmlFor="subject" className="text-sm font-medium text-zinc-400 w-16 shrink-0">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What can we help you with?"
                  className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none"
                />
              </div>

              {/* Body */}
              <div className="px-5 py-3">
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your message here..."
                  rows={10}
                  className="w-full bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Footer / send */}
              <div className="flex items-center justify-between gap-4 px-5 py-4 bg-zinc-50 dark:bg-zinc-800/50">
                {error ? (
                  <p className="text-sm text-red-500">{error}</p>
                ) : (
                  <p className="text-xs text-zinc-400">Your message goes straight to our support inbox.</p>
                )}
                <button
                  onClick={handleSend}
                  disabled={sending}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-60"
                >
                  {sending ? 'Sending...' : 'Send'}
                  {!sending && <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
