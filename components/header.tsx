'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { PetInsuranceModal } from './pet-insurance-modal'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [insuranceModalOpen, setInsuranceModalOpen] = useState(false)

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  const navigation = [
    { name: 'Pet Insurance', href: '/providers' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Learn More', href: '#learn-more' },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-cropped.png"
                alt="Pet Keepings"
                width={180}
                height={45}
                className="w-[180px] h-auto dark:invert"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick}
                  className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <button
              onClick={() => setInsuranceModalOpen(true)}
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
            >
              Get a Quote
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-zinc-100 dark:border-zinc-800">
              <nav className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={handleNavClick}
                    className="text-base font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setInsuranceModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 mt-2"
                >
                  Get a Quote
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <PetInsuranceModal isOpen={insuranceModalOpen} onClose={() => setInsuranceModalOpen(false)} />
    </>
  )
}
