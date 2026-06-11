'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Edit2, Save, X, Upload, ExternalLink, GripVertical, LogOut, Palette, Type, Layout, Eye } from 'lucide-react'
import Link from 'next/link'

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
  display_order: number
  is_active: boolean
}

interface SiteSettings {
  colors?: { primary: string; accent: string; background: string; foreground: string }
  hero?: { title: string; highlight: string; subtitle: string; button1Text: string; button2Text: string }
  header?: { logoSize: string; navItems: string[] }
}

export default function AdminDashboard() {
  const [providers, setProviders] = useState<Provider[]>([])
  const [settings, setSettings] = useState<SiteSettings>({})
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'providers' | 'content' | 'colors'>('providers')
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [saveStatus, setSaveStatus] = useState<string | null>(null)
  
  const supabase = createClient()
  const router = useRouter()

  const emptyProvider: Omit<Provider, 'id'> = {
    name: '', url: '', logo_url: '', brand_color: '#2563eb',
    monthly_cost: '', deductible: '', reimbursement: '',
    wait_period: '', coverage_limit: '', rating: 4.5,
    display_order: 0, is_active: true
  }

  useEffect(() => { checkAuthAndLoad() }, [])

  async function checkAuthAndLoad() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== 'rondellhogue@gmail.com') {
      router.push('/admin/login')
      return
    }
    await loadData()
  }

  async function loadData() {
    setLoading(true)
    const { data: providerData } = await supabase.from('insurance_providers').select('*').order('display_order')
    if (providerData) setProviders(providerData)

    const { data: settingsData } = await supabase.from('site_settings').select('setting_key, setting_value')
    if (settingsData) {
      const obj: any = {}
      settingsData.forEach((s: any) => { obj[s.setting_key] = s.setting_value })
      setSettings(obj)
    }
    setLoading(false)
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !editingProvider) return
    setUploadingLogo(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) setEditingProvider({ ...editingProvider, logo_url: data.url })
    } catch (err) { console.error('Upload failed:', err) }
    setUploadingLogo(false)
  }

  async function saveProvider() {
    if (!editingProvider) return
    setSaveStatus('Saving...')
    if (isAddingNew) {
      const { id, ...data } = editingProvider
      await supabase.from('insurance_providers').insert([{ ...data, display_order: providers.length }])
    } else {
      await supabase.from('insurance_providers').update(editingProvider).eq('id', editingProvider.id)
    }
    setSaveStatus('Saved!')
    setTimeout(() => setSaveStatus(null), 2000)
    setEditingProvider(null)
    setIsAddingNew(false)
    loadData()
  }

  async function deleteProvider(id: string) {
    if (!confirm('Delete this provider?')) return
    await supabase.from('insurance_providers').delete().eq('id', id)
    loadData()
  }

  async function saveSetting(key: string, value: any) {
    setSaveStatus('Saving...')
    await supabase.from('site_settings').update({ setting_value: value }).eq('setting_key', key)
    setSaveStatus('Saved!')
    setTimeout(() => setSaveStatus(null), 2000)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (loading) return <div className="min-h-screen bg-gray-100 flex items-center justify-center"><div className="text-lg">Loading...</div></div>

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">PetKeepings Admin</h1>
          <div className="flex items-center gap-4">
            {saveStatus && <span className={`text-sm ${saveStatus === 'Saved!' ? 'text-green-600' : 'text-gray-600'}`}>{saveStatus}</span>}
            <Link href="/admin/editor" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
              <Eye className="w-4 h-4" /> Visual Editor
            </Link>
            <a href="/" target="_blank" className="text-sm text-blue-600 hover:underline flex items-center gap-1">View Site <ExternalLink className="w-3 h-3" /></a>
            <button onClick={handleSignOut} className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"><LogOut className="w-4 h-4" /> Sign Out</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-2 border-b">
          {(['providers', 'content', 'colors'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
              {tab === 'providers' ? 'Insurance Providers' : tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        {activeTab === 'providers' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Manage Insurance Providers</h2>
              <button onClick={() => { setEditingProvider({ id: 'new', ...emptyProvider }); setIsAddingNew(true) }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                <Plus className="w-4 h-4" /> Add Provider
              </button>
            </div>
            <div className="bg-white rounded-lg shadow">
              {providers.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No providers yet. Click &quot;Add Provider&quot; to create one.</div>
              ) : (
                <div className="divide-y">
                  {providers.map(p => (
                    <div key={p.id} className="p-4 flex items-center gap-4">
                      <GripVertical className="w-5 h-5 text-gray-400" />
                      {p.logo_url ? <img src={p.logo_url} alt={p.name} className="w-12 h-12 object-contain rounded" /> : (
                        <div className="w-12 h-12 rounded flex items-center justify-center text-white font-bold" style={{ backgroundColor: p.brand_color }}>{p.name.charAt(0)}</div>
                      )}
                      <div className="flex-1">
                        <div className="font-medium">{p.name}</div>
                        <div className="text-sm text-gray-500">{p.monthly_cost}/mo | {p.coverage_limit} limit</div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{p.is_active ? 'Active' : 'Inactive'}</span>
                      <button onClick={() => setEditingProvider(p)} className="p-2 text-gray-600 hover:bg-gray-100 rounded"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => deleteProvider(p.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Hero Section</h3>
              <div className="grid gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" value={settings.hero?.title || ''} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero!, title: e.target.value } })}
                    onBlur={() => saveSetting('hero', settings.hero)} className="w-full border rounded-lg px-3 py-2" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Highlighted Word</label>
                  <input type="text" value={settings.hero?.highlight || ''} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero!, highlight: e.target.value } })}
                    onBlur={() => saveSetting('hero', settings.hero)} className="w-full border rounded-lg px-3 py-2" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                  <input type="text" value={settings.hero?.subtitle || ''} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero!, subtitle: e.target.value } })}
                    onBlur={() => saveSetting('hero', settings.hero)} className="w-full border rounded-lg px-3 py-2" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Button 1 Text</label>
                    <input type="text" value={settings.hero?.button1Text || ''} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero!, button1Text: e.target.value } })}
                      onBlur={() => saveSetting('hero', settings.hero)} className="w-full border rounded-lg px-3 py-2" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Button 2 Text</label>
                    <input type="text" value={settings.hero?.button2Text || ''} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero!, button2Text: e.target.value } })}
                      onBlur={() => saveSetting('hero', settings.hero)} className="w-full border rounded-lg px-3 py-2" /></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-4">Site Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(settings.colors || {}).map(([key, value]) => (
                <div key={key}><label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{key}</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={value as string} onChange={(e) => setSettings({ ...settings, colors: { ...settings.colors!, [key]: e.target.value } })}
                      onBlur={() => saveSetting('colors', settings.colors)} className="w-10 h-10 rounded cursor-pointer" />
                    <input type="text" value={value as string} onChange={(e) => setSettings({ ...settings, colors: { ...settings.colors!, [key]: e.target.value } })}
                      onBlur={() => saveSetting('colors', settings.colors)} className="flex-1 border rounded px-2 py-1 text-sm font-mono" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {editingProvider && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">{isAddingNew ? 'Add New Provider' : 'Edit Provider'}</h3>
              <button onClick={() => { setEditingProvider(null); setIsAddingNew(false) }}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                <div className="flex items-center gap-4">
                  {editingProvider.logo_url ? <img src={editingProvider.logo_url} alt="Logo" className="w-16 h-16 object-contain rounded border" /> : (
                    <div className="w-16 h-16 rounded border flex items-center justify-center" style={{ backgroundColor: editingProvider.brand_color }}>
                      <span className="text-white text-2xl font-bold">{editingProvider.name?.charAt(0) || '?'}</span>
                    </div>
                  )}
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2">
                    <Upload className="w-4 h-4" />{uploadingLogo ? 'Uploading...' : 'Upload Logo'}
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Provider Name *</label>
                  <input type="text" value={editingProvider.name} onChange={(e) => setEditingProvider({ ...editingProvider, name: e.target.value })} className="w-full border rounded-lg px-3 py-2" placeholder="e.g., Healthy Paws" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                  <input type="url" value={editingProvider.url} onChange={(e) => setEditingProvider({ ...editingProvider, url: e.target.value })} className="w-full border rounded-lg px-3 py-2" placeholder="https://..." /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Brand Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={editingProvider.brand_color} onChange={(e) => setEditingProvider({ ...editingProvider, brand_color: e.target.value })} className="w-10 h-10 rounded cursor-pointer" />
                  <input type="text" value={editingProvider.brand_color} onChange={(e) => setEditingProvider({ ...editingProvider, brand_color: e.target.value })} className="border rounded px-2 py-1 text-sm font-mono" />
                </div>
              </div>
              <div className="border-t pt-4"><h4 className="font-medium mb-3">Pricing & Coverage Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Monthly Cost</label>
                    <input type="text" value={editingProvider.monthly_cost} onChange={(e) => setEditingProvider({ ...editingProvider, monthly_cost: e.target.value })} className="w-full border rounded-lg px-3 py-2" placeholder="$30-50" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Deductible</label>
                    <input type="text" value={editingProvider.deductible} onChange={(e) => setEditingProvider({ ...editingProvider, deductible: e.target.value })} className="w-full border rounded-lg px-3 py-2" placeholder="$100-500" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Reimbursement</label>
                    <input type="text" value={editingProvider.reimbursement} onChange={(e) => setEditingProvider({ ...editingProvider, reimbursement: e.target.value })} className="w-full border rounded-lg px-3 py-2" placeholder="70-90%" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Wait Period</label>
                    <input type="text" value={editingProvider.wait_period} onChange={(e) => setEditingProvider({ ...editingProvider, wait_period: e.target.value })} className="w-full border rounded-lg px-3 py-2" placeholder="14 days" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Coverage Limit</label>
                    <input type="text" value={editingProvider.coverage_limit} onChange={(e) => setEditingProvider({ ...editingProvider, coverage_limit: e.target.value })} className="w-full border rounded-lg px-3 py-2" placeholder="Unlimited" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                    <input type="number" min="1" max="5" step="0.1" value={editingProvider.rating} onChange={(e) => setEditingProvider({ ...editingProvider, rating: parseFloat(e.target.value) })} className="w-full border rounded-lg px-3 py-2" /></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="is_active" checked={editingProvider.is_active} onChange={(e) => setEditingProvider({ ...editingProvider, is_active: e.target.checked })} className="w-4 h-4" />
                <label htmlFor="is_active" className="text-sm">Show on website</label>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={() => { setEditingProvider(null); setIsAddingNew(false) }} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={saveProvider} disabled={!editingProvider.name} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"><Save className="w-4 h-4" /> Save Provider</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
