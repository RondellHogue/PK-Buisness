'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setIsSubmitted(true)
  }

  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-card" />
          <div className="absolute inset-0 glass" />
          
          <div className="relative px-8 py-16 lg:px-16 lg:py-20">
            <div className="max-w-2xl mx-auto text-center">
              {!isSubmitted ? (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">
                    Stay Informed About Pet Health & Insurance
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Get the latest guides, industry updates, and expert tips delivered to your inbox. 
                    No spam, just valuable information for pet owners.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
                    >
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  <p className="mt-4 text-xs text-muted-foreground">
                    By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">You&apos;re subscribed!</h3>
                  <p className="text-muted-foreground">
                    Check your inbox for a welcome email. We&apos;re excited to share helpful pet insurance insights with you.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
