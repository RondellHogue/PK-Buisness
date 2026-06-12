import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { FeaturesSection } from '@/components/features-section'
import { PricingSection } from '@/components/pricing-section'
import { HowItWorks } from '@/components/how-it-works'
import { LearnMoreSection } from '@/components/learn-more-section'
import { Footer } from '@/components/footer'
import { ThemeToggle } from '@/components/theme-toggle'
import { PetIconPattern } from '@/components/pet-icon-pattern'

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-zinc-900">
      <PetIconPattern />
      <Header />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <HowItWorks />
      <LearnMoreSection />
      <Footer />
      <ThemeToggle />
    </main>
  )
}
