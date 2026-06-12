'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, UserPlus } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Hardcoded authorized admin email - only this email can login
  const AUTHORIZED_ADMIN_EMAIL = 'rondellhogue@gmail.com'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    // Check if email matches the authorized admin email
    if (email.toLowerCase() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      setError('You do not have admin access')
      setLoading(false)
      return
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('[v0] Login response:', { data, authError })

      if (authError) {
        setError(authError.message)
        setLoading(false)
        return
      }

      if (data?.user) {
        // Force hard redirect to bypass any caching issues
        window.location.href = '/admin/dashboard'
      } else {
        setError('Login failed. Please try again.')
        setLoading(false)
      }
    } catch (err) {
      console.log('[v0] Login error:', err)
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    // Check if email matches the authorized admin email
    if (email.toLowerCase() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      setError('This email is not authorized for admin access')
      setLoading(false)
      return
    }

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? 
          `${window.location.origin}/auth/callback`,
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // Link user_id to admin record
    if (data.user?.id) {
      await supabase
        .from('admin_users')
        .update({ user_id: data.user.id })
        .eq('email', email)
    }

    setMessage('Check your email for the confirmation link, then sign in.')
    setIsSignUp(false)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              {isSignUp ? <UserPlus className="w-8 h-8 text-blue-600" /> : <Lock className="w-8 h-8 text-blue-600" />}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isSignUp ? 'Create Admin Account' : 'Admin Access'}
            </h1>
            <p className="text-gray-500 mt-2">
              {isSignUp ? 'Set up your admin credentials' : 'Sign in to manage your site'}
            </p>
          </div>

          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {message}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                  placeholder={isSignUp ? 'Create a password' : 'Enter your password'}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (isSignUp ? 'Creating account...' : 'Signing in...') : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError(null)
                setMessage(null)
              }}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {isSignUp ? 'Already have an account? Sign in' : "First time? Create your account"}
            </button>
          </div>
        </div>

        <p className="text-center text-white/80 text-sm mt-6">
          Only authorized administrators can access this area.
        </p>
      </div>
    </div>
  )
}
