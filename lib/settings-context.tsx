'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface SiteSettings {
  colors: {
    primary: string
    primaryForeground: string
    background: string
    foreground: string
    accent: string
    muted: string
  }
  typography: {
    headingSize: string
    bodySize: string
    fontFamily: string
  }
  hero: {
    title: string
    highlight: string
    subtitle: string
    button1Text: string
    button2Text: string
  }
  header: {
    logoSize: string
    navItems: string[]
  }
  animations: {
    enabled: boolean
    duration: number
    type: string
  }
}

const defaultSettings: SiteSettings = {
  colors: {
    primary: '#2563eb',
    primaryForeground: '#ffffff',
    background: '#ffffff',
    foreground: '#1a1a2e',
    accent: '#3b82f6',
    muted: '#64748b',
  },
  typography: {
    headingSize: 'text-2xl',
    bodySize: 'text-base',
    fontFamily: 'font-sans',
  },
  hero: {
    title: 'Protect Your Pet Before',
    highlight: 'Emergencies',
    subtitle: 'Become Expensive',
    button1Text: 'Explore Coverage Options',
    button2Text: 'Learn How Pet Insurance Works',
  },
  header: {
    logoSize: 'h-14',
    navItems: ['Home', 'Pet Insurance', 'Pricing', 'Reviews', 'Learn More'],
  },
  animations: {
    enabled: true,
    duration: 0.6,
    type: 'fade',
  },
}

interface SettingsContextType {
  settings: SiteSettings
  loading: boolean
  refreshSettings: () => Promise<void>
}

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  loading: true,
  refreshSettings: async () => {},
})

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)

  const fetchSettings = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('site_settings')
        .select('setting_key, setting_value')

      if (error) {
        console.error('Error fetching settings:', error)
        return
      }

      if (data) {
        const newSettings = { ...defaultSettings }
        data.forEach((row) => {
          const key = row.setting_key as keyof SiteSettings
          if (key in newSettings) {
            newSettings[key] = row.setting_value as any
          }
        })
        setSettings(newSettings)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}
