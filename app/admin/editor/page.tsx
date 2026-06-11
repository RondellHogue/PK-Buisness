'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Smartphone, 
  Monitor, 
  Tablet,
  Save,
  Undo,
  LogOut,
  Grid3X3,
  X,
  Type,
  Palette,
  Move,
  RotateCcw,
  MousePointer,
  Edit3,
  Image as ImageIcon
} from 'lucide-react'
import Link from 'next/link'

type DeviceView = 'desktop' | 'tablet' | 'mobile'

interface ElementData {
  id: string
  type: 'text' | 'image' | 'button' | 'section'
  content: string
  styles: {
    color?: string
    backgroundColor?: string
    fontSize?: string
    fontWeight?: string
    padding?: string
    margin?: string
    borderRadius?: string
    left?: string
    top?: string
    width?: string
    height?: string
  }
}

// Default site content that can be edited
const DEFAULT_CONTENT: Record<string, ElementData> = {
  'logo': { id: 'logo', type: 'image', content: '/images/logo-cropped.png', styles: { width: '180px', height: 'auto' } },
  'nav-home': { id: 'nav-home', type: 'text', content: 'Home', styles: { fontSize: '14px', color: '#1a1a2e' } },
  'nav-insurance': { id: 'nav-insurance', type: 'text', content: 'Pet Insurance', styles: { fontSize: '14px', color: '#1a1a2e' } },
  'nav-pricing': { id: 'nav-pricing', type: 'text', content: 'Pricing', styles: { fontSize: '14px', color: '#1a1a2e' } },
  'nav-reviews': { id: 'nav-reviews', type: 'text', content: 'Reviews', styles: { fontSize: '14px', color: '#1a1a2e' } },
  'nav-learn': { id: 'nav-learn', type: 'text', content: 'Learn More', styles: { fontSize: '14px', color: '#1a1a2e' } },
  'hero-title-1': { id: 'hero-title-1', type: 'text', content: 'Protect Your Pet Before', styles: { fontSize: '48px', fontWeight: '700', color: '#1a1a2e' } },
  'hero-title-highlight': { id: 'hero-title-highlight', type: 'text', content: 'Emergencies', styles: { fontSize: '48px', fontWeight: '700', color: '#2563eb' } },
  'hero-title-2': { id: 'hero-title-2', type: 'text', content: 'Become Expensive', styles: { fontSize: '48px', fontWeight: '700', color: '#1a1a2e' } },
  'hero-btn-1': { id: 'hero-btn-1', type: 'button', content: 'Explore Coverage Options', styles: { backgroundColor: '#2563eb', color: '#ffffff', padding: '12px 24px', borderRadius: '8px' } },
  'hero-btn-2': { id: 'hero-btn-2', type: 'button', content: 'Learn How Pet Insurance Works', styles: { backgroundColor: '#ffffff', color: '#1a1a2e', padding: '12px 24px', borderRadius: '8px' } },
  'section-title': { id: 'section-title', type: 'text', content: 'Top Pet Insurance Providers', styles: { fontSize: '32px', fontWeight: '700', color: '#1a1a2e' } },
}

export default function VisualEditorPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop')
  const [editMode, setEditMode] = useState(false)
  const [snapping, setSnapping] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [content, setContent] = useState<Record<string, ElementData>>(DEFAULT_CONTENT)
  const [hasChanges, setHasChanges] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  
  const editorRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const supabase = createClient()

  const AUTHORIZED_ADMIN_EMAIL = 'rondellhogue@gmail.com'

  useEffect(() => {
    checkAdmin()
    loadContent()
  }, [])

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email?.toLowerCase() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      router.push('/admin/login')
      return
    }
    setIsAdmin(true)
    setLoading(false)
  }

  const loadContent = async () => {
    const { data } = await supabase
      .from('site_settings')
      .select('setting_value')
      .eq('setting_key', 'editor_content')
      .single()
    if (data?.setting_value) {
      setContent({ ...DEFAULT_CONTENT, ...data.setting_value })
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await supabase
        .from('site_settings')
        .upsert({ 
          setting_key: 'editor_content', 
          setting_value: content,
          updated_at: new Date().toISOString()
        }, { onConflict: 'setting_key' })
      setHasChanges(false)
      alert('Changes saved!')
    } catch (error) {
      alert('Failed to save')
    }
    setSaving(false)
  }

  const updateElement = (id: string, updates: Partial<ElementData>) => {
    setContent(prev => ({
      ...prev,
      [id]: { ...prev[id], ...updates }
    }))
    setHasChanges(true)
  }

  const updateStyle = (id: string, styleProp: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [id]: { 
        ...prev[id], 
        styles: { ...prev[id].styles, [styleProp]: value }
      }
    }))
    setHasChanges(true)
  }

  const handleElementClick = (e: React.MouseEvent, id: string) => {
    if (!editMode) return
    e.stopPropagation()
    setSelectedId(id)
    setShowPopup(false)
  }

  const handleElementDoubleClick = (e: React.MouseEvent, id: string) => {
    if (!editMode) return
    e.stopPropagation()
    setSelectedId(id)
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setPopupPos({ x: rect.right + 10, y: rect.bottom + 10 })
    setShowPopup(true)
  }

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    if (!editMode || !selectedId || selectedId !== id) return
    e.preventDefault()
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !selectedId || !editorRef.current) return
    
    const editorRect = editorRef.current.getBoundingClientRect()
    let newX = e.clientX - editorRect.left - dragOffset.x
    let newY = e.clientY - editorRect.top - dragOffset.y

    // Snapping
    if (snapping) {
      const snapGrid = 20
      newX = Math.round(newX / snapGrid) * snapGrid
      newY = Math.round(newY / snapGrid) * snapGrid
    }

    updateStyle(selectedId, 'left', `${newX}px`)
    updateStyle(selectedId, 'top', `${newY}px`)
  }

  const handleMouseUp = () => {
    setDragging(false)
  }

  const resetElement = (id: string) => {
    if (DEFAULT_CONTENT[id]) {
      setContent(prev => ({
        ...prev,
        [id]: { ...DEFAULT_CONTENT[id] }
      }))
      setHasChanges(true)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const getDeviceWidth = () => {
    switch (deviceView) {
      case 'mobile': return 'w-[375px]'
      case 'tablet': return 'w-[768px]'
      case 'desktop': return 'w-full max-w-[1400px]'
    }
  }

  const EditableElement = ({ id, children, className = '' }: { id: string, children: React.ReactNode, className?: string }) => {
    const isSelected = selectedId === id
    const element = content[id]
    
    const style: React.CSSProperties = element?.styles ? {
      position: element.styles.left || element.styles.top ? 'relative' : undefined,
      left: element.styles.left,
      top: element.styles.top,
      width: element.styles.width,
      height: element.styles.height,
    } : {}

    return (
      <div
        className={`
          ${className}
          ${editMode ? 'cursor-pointer transition-all duration-150' : ''}
          ${editMode && !isSelected ? 'hover:outline hover:outline-2 hover:outline-dashed hover:outline-blue-400 hover:outline-offset-2' : ''}
          ${isSelected ? 'outline outline-2 outline-blue-600 outline-offset-2 shadow-[0_0_0_4px_rgba(37,99,235,0.2)]' : ''}
        `}
        style={style}
        onClick={(e) => handleElementClick(e, id)}
        onDoubleClick={(e) => handleElementDoubleClick(e, id)}
        onMouseDown={(e) => handleMouseDown(e, id)}
      >
        {children}
        {isSelected && editMode && (
          <>
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-600 border-2 border-white rounded-sm cursor-nw-resize" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 border-2 border-white rounded-sm cursor-ne-resize" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-600 border-2 border-white rounded-sm cursor-sw-resize" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-600 border-2 border-white rounded-sm cursor-se-resize" />
          </>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!isAdmin) return null

  const selected = selectedId ? content[selectedId] : null

  return (
    <div 
      className="min-h-screen bg-gray-900 flex flex-col"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Top Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-300 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          
          <div className="h-6 w-px bg-gray-600" />
          
          {/* Edit Mode Toggle */}
          <button
            onClick={() => {
              setEditMode(!editMode)
              if (editMode) {
                setSelectedId(null)
                setShowPopup(false)
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              editMode 
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/30' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {editMode ? (
              <>
                <Edit3 className="w-4 h-4" />
                <span>Editing ON</span>
              </>
            ) : (
              <>
                <MousePointer className="w-4 h-4" />
                <span>Enable Edit Mode</span>
              </>
            )}
          </button>

          <div className="h-6 w-px bg-gray-600" />
          
          {/* Device View Toggle */}
          <div className="flex items-center gap-1 bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setDeviceView('desktop')}
              className={`p-2 rounded ${deviceView === 'desktop' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceView('tablet')}
              className={`p-2 rounded ${deviceView === 'tablet' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceView('mobile')}
              className={`p-2 rounded ${deviceView === 'mobile' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {editMode && (
            <>
              <div className="h-6 w-px bg-gray-600" />
              <button
                onClick={() => setSnapping(!snapping)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded ${snapping ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                <Grid3X3 className="w-4 h-4" />
                <span className="text-sm">Snap</span>
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {hasChanges && (
            <span className="text-yellow-400 text-sm">Unsaved changes</span>
          )}
          
          <button
            onClick={() => {
              setContent(DEFAULT_CONTENT)
              setHasChanges(true)
            }}
            className="p-2 text-gray-400 hover:text-white"
            title="Reset all"
          >
            <Undo className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Apply Changes'}
          </button>

          <button onClick={handleSignOut} className="p-2 text-gray-400 hover:text-red-400">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Edit Mode Instructions */}
      {editMode && (
        <div className="bg-green-600/20 border-b border-green-600/30 px-4 py-2 text-center">
          <span className="text-green-400 text-sm font-medium">
            Edit Mode Active: Click to select elements | Double-click for edit options | Drag to reposition
          </span>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Properties Panel */}
        {editMode && selected && (
          <div className="w-72 bg-gray-800 border-r border-gray-700 overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Properties</h3>
              <button onClick={() => setSelectedId(null)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Element ID</p>
                <p className="text-white font-mono text-sm">{selected.id}</p>
              </div>

              {selected.type !== 'image' && (
                <div>
                  <label className="text-gray-400 text-xs block mb-1">Text Content</label>
                  <textarea
                    value={selected.content}
                    onChange={(e) => updateElement(selected.id, { content: e.target.value })}
                    className="w-full bg-gray-700 text-white rounded-lg p-2 text-sm border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                    rows={3}
                  />
                </div>
              )}

              <div>
                <label className="text-gray-400 text-xs block mb-1">Text Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={selected.styles.color || '#000000'}
                    onChange={(e) => updateStyle(selected.id, 'color', e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={selected.styles.color || ''}
                    onChange={(e) => updateStyle(selected.id, 'color', e.target.value)}
                    className="flex-1 bg-gray-700 text-white rounded px-2 py-1 text-sm"
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-xs block mb-1">Background</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={selected.styles.backgroundColor || '#ffffff'}
                    onChange={(e) => updateStyle(selected.id, 'backgroundColor', e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={selected.styles.backgroundColor || ''}
                    onChange={(e) => updateStyle(selected.id, 'backgroundColor', e.target.value)}
                    className="flex-1 bg-gray-700 text-white rounded px-2 py-1 text-sm"
                    placeholder="#ffffff"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-xs block mb-1">Font Size</label>
                <select
                  value={selected.styles.fontSize || '16px'}
                  onChange={(e) => updateStyle(selected.id, 'fontSize', e.target.value)}
                  className="w-full bg-gray-700 text-white rounded px-2 py-1.5 text-sm"
                >
                  {['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '40px', '48px', '56px', '64px'].map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-xs block mb-1">Font Weight</label>
                <select
                  value={selected.styles.fontWeight || '400'}
                  onChange={(e) => updateStyle(selected.id, 'fontWeight', e.target.value)}
                  className="w-full bg-gray-700 text-white rounded px-2 py-1.5 text-sm"
                >
                  {['400', '500', '600', '700', '800'].map(weight => (
                    <option key={weight} value={weight}>{weight}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-xs block mb-1">Width</label>
                <input
                  type="text"
                  value={selected.styles.width || ''}
                  onChange={(e) => updateStyle(selected.id, 'width', e.target.value)}
                  className="w-full bg-gray-700 text-white rounded px-2 py-1 text-sm"
                  placeholder="auto"
                />
              </div>

              <button
                onClick={() => resetElement(selected.id)}
                className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg py-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset to Default
              </button>
            </div>
          </div>
        )}

        {/* Site Preview */}
        <div className="flex-1 overflow-auto bg-gray-900 p-8">
          <div 
            ref={editorRef}
            className={`${getDeviceWidth()} mx-auto bg-white rounded-lg shadow-2xl overflow-hidden min-h-[800px]`}
          >
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <EditableElement id="logo">
                  <img 
                    src={content['logo']?.content || '/images/logo-cropped.png'} 
                    alt="Logo" 
                    className="h-12 w-auto invert brightness-0 invert"
                    style={{ width: content['logo']?.styles.width }}
                  />
                </EditableElement>
                
                <nav className="flex items-center gap-6">
                  {['nav-home', 'nav-insurance', 'nav-pricing', 'nav-reviews', 'nav-learn'].map(id => (
                    <EditableElement key={id} id={id}>
                      <span 
                        className="text-white hover:text-blue-200 transition-colors"
                        style={{
                          fontSize: content[id]?.styles.fontSize,
                          color: '#ffffff'
                        }}
                      >
                        {content[id]?.content}
                      </span>
                    </EditableElement>
                  ))}
                </nav>
              </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-blue-600 via-blue-400 to-white py-20 px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="mb-8 flex flex-wrap justify-center gap-x-3">
                  <EditableElement id="hero-title-1">
                    <span style={{
                      fontSize: content['hero-title-1']?.styles.fontSize,
                      fontWeight: content['hero-title-1']?.styles.fontWeight,
                      color: content['hero-title-1']?.styles.color,
                    }}>
                      {content['hero-title-1']?.content}
                    </span>
                  </EditableElement>
                  <EditableElement id="hero-title-highlight">
                    <span style={{
                      fontSize: content['hero-title-highlight']?.styles.fontSize,
                      fontWeight: content['hero-title-highlight']?.styles.fontWeight,
                      color: content['hero-title-highlight']?.styles.color,
                    }}>
                      {content['hero-title-highlight']?.content}
                    </span>
                  </EditableElement>
                  <EditableElement id="hero-title-2">
                    <span style={{
                      fontSize: content['hero-title-2']?.styles.fontSize,
                      fontWeight: content['hero-title-2']?.styles.fontWeight,
                      color: content['hero-title-2']?.styles.color,
                    }}>
                      {content['hero-title-2']?.content}
                    </span>
                  </EditableElement>
                </h1>

                <div className="flex justify-center gap-4 flex-wrap">
                  <EditableElement id="hero-btn-1">
                    <button style={{
                      backgroundColor: content['hero-btn-1']?.styles.backgroundColor,
                      color: content['hero-btn-1']?.styles.color,
                      padding: content['hero-btn-1']?.styles.padding,
                      borderRadius: content['hero-btn-1']?.styles.borderRadius,
                    }} className="font-medium shadow-lg">
                      {content['hero-btn-1']?.content}
                    </button>
                  </EditableElement>
                  <EditableElement id="hero-btn-2">
                    <button style={{
                      backgroundColor: content['hero-btn-2']?.styles.backgroundColor,
                      color: content['hero-btn-2']?.styles.color,
                      padding: content['hero-btn-2']?.styles.padding,
                      borderRadius: content['hero-btn-2']?.styles.borderRadius,
                    }} className="font-medium border border-gray-200">
                      {content['hero-btn-2']?.content}
                    </button>
                  </EditableElement>
                </div>
              </div>
            </section>

            {/* Providers Section */}
            <section className="py-16 px-6 bg-white">
              <div className="max-w-6xl mx-auto text-center">
                <EditableElement id="section-title">
                  <h2 style={{
                    fontSize: content['section-title']?.styles.fontSize,
                    fontWeight: content['section-title']?.styles.fontWeight,
                    color: content['section-title']?.styles.color,
                  }}>
                    {content['section-title']?.content}
                  </h2>
                </EditableElement>
                <p className="text-gray-500 mt-4">Coming soon - check back for provider comparisons.</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Double-click Popup */}
      {showPopup && selected && (
        <div 
          className="fixed bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-2 z-50"
          style={{ left: popupPos.x, top: popupPos.y }}
        >
          <div className="flex flex-col gap-1">
            <button 
              onClick={() => {
                const newText = prompt('Edit text:', selected.content)
                if (newText) updateElement(selected.id, { content: newText })
                setShowPopup(false)
              }}
              className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-gray-700 rounded"
            >
              <Type className="w-4 h-4" /> Edit Text
            </button>
            <button 
              onClick={() => {
                const newColor = prompt('Enter color (hex):', selected.styles.color)
                if (newColor) updateStyle(selected.id, 'color', newColor)
                setShowPopup(false)
              }}
              className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-gray-700 rounded"
            >
              <Palette className="w-4 h-4" /> Change Color
            </button>
            <button 
              onClick={() => {
                resetElement(selected.id)
                setShowPopup(false)
              }}
              className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-gray-700 rounded"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close popup */}
      {showPopup && (
        <div className="fixed inset-0 z-40" onClick={() => setShowPopup(false)} />
      )}
    </div>
  )
}
