'use client'

import { useEditor } from '@/lib/editor-context'
import { createClient } from '@/lib/supabase/client'
import { X, Move, Type, Palette, Save, Eye, EyeOff, Trash2 } from 'lucide-react'
import { useState } from 'react'

export function EditorToolbar() {
  const { 
    editMode, 
    setEditMode, 
    selectedElement, 
    setSelectedElement,
    elementStyles, 
    updateElementStyle,
    pendingChanges,
    setPendingChanges 
  } = useEditor()
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const selectedStyle = selectedElement ? elementStyles[selectedElement] : null

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    
    try {
      const supabase = createClient()
      
      // Save element styles to site_settings
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          setting_key: 'element_styles',
          setting_value: elementStyles,
          updated_at: new Date().toISOString()
        }, { onConflict: 'setting_key' })

      if (error) throw error
      
      setPendingChanges(false)
      setMessage('Changes saved!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      console.error('Save error:', err)
      setMessage('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleColorChange = (property: 'color' | 'backgroundColor', value: string) => {
    if (selectedElement) {
      updateElementStyle(selectedElement, { [property]: value })
    }
  }

  const handleFontSizeChange = (value: string) => {
    if (selectedElement) {
      updateElementStyle(selectedElement, { fontSize: value })
    }
  }

  const handleReset = () => {
    if (selectedElement) {
      updateElementStyle(selectedElement, { x: 0, y: 0, width: undefined, height: undefined })
    }
  }

  if (!editMode) {
    return (
      <button
        onClick={() => setEditMode(true)}
        className="fixed bottom-4 right-4 z-[9999] bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
      >
        <Eye className="w-4 h-4" />
        Edit Mode
      </button>
    )
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-gray-900 text-white shadow-xl">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left side - Mode toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setEditMode(false)
              setSelectedElement(null)
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded text-sm"
          >
            <EyeOff className="w-4 h-4" />
            Exit Edit Mode
          </button>
          
          <span className="text-sm text-gray-400">
            Click elements to select, double-click to edit text, drag to move
          </span>
        </div>

        {/* Center - Selected element controls */}
        {selectedElement && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Selected: {selectedElement}</span>
            
            {/* Text color */}
            <div className="flex items-center gap-1">
              <Type className="w-4 h-4 text-gray-400" />
              <input
                type="color"
                value={selectedStyle?.color || '#000000'}
                onChange={(e) => handleColorChange('color', e.target.value)}
                className="w-6 h-6 rounded cursor-pointer"
                title="Text Color"
              />
            </div>
            
            {/* Background color */}
            <div className="flex items-center gap-1">
              <Palette className="w-4 h-4 text-gray-400" />
              <input
                type="color"
                value={selectedStyle?.backgroundColor || '#ffffff'}
                onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                className="w-6 h-6 rounded cursor-pointer"
                title="Background Color"
              />
            </div>
            
            {/* Font size */}
            <select
              value={selectedStyle?.fontSize || ''}
              onChange={(e) => handleFontSizeChange(e.target.value)}
              className="bg-gray-800 text-white text-sm rounded px-2 py-1"
            >
              <option value="">Font Size</option>
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
              <option value="24px">24px</option>
              <option value="28px">28px</option>
              <option value="32px">32px</option>
              <option value="36px">36px</option>
              <option value="48px">48px</option>
              <option value="64px">64px</option>
            </select>
            
            {/* Reset position */}
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
              title="Reset Position"
            >
              <Move className="w-4 h-4" />
              Reset
            </button>
            
            {/* Deselect */}
            <button
              onClick={() => setSelectedElement(null)}
              className="p-1 hover:bg-gray-700 rounded"
              title="Deselect"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Right side - Save */}
        <div className="flex items-center gap-3">
          {message && (
            <span className={`text-sm ${message.includes('Failed') ? 'text-red-400' : 'text-green-400'}`}>
              {message}
            </span>
          )}
          
          <button
            onClick={handleSave}
            disabled={saving || !pendingChanges}
            className={`flex items-center gap-2 px-4 py-1.5 rounded text-sm font-medium transition-colors ${
              pendingChanges 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Apply Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
