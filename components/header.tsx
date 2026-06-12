'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavClick = () => {
    setMenuOpen(false)
  }

  const navigation = [
    { name: 'Pet Insurance', href: '/providers' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Learn More', href: '#learn-more' },
    { name: 'FAQ', href: '/faq' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/30 dark:border-white/10 shadow-sm shadow-black/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-3 items-center h-20">
          {/* Hamburger Menu (left) */}
          <div className="flex justify-start">
            <button
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="inline-flex items-center justify-center p-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo (center) */}
          <div className="flex justify-center">
            <Link href="/" className="flex items-center" onClick={handleNavClick}>
              <Image
                src="/images/logo-trimmed.png"
                alt="Pet Keepings"
                width={681}
                height={168}
                className="h-11 w-auto dark:invert"
                priority
              />
            </Link>
          </div>

          {/* CTA Button (right) */}
          <div className="flex justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="-mx-6 px-6 py-4 border-t border-white/30 dark:border-white/10 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl backdrop-saturate-150">
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-900/5 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
