'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface ElementStyle {
  id: string
  x?: number
  y?: number
  width?: number
  height?: number
  fontSize?: string
  color?: string
  backgroundColor?: string
  text?: string
}

interface EditorContextType {
  editMode: boolean
  setEditMode: (mode: boolean) => void
  selectedElement: string | null
  setSelectedElement: (id: string | null) => void
  elementStyles: Record<string, ElementStyle>
  updateElementStyle: (id: string, style: Partial<ElementStyle>) => void
  pendingChanges: boolean
  setPendingChanges: (pending: boolean) => void
}

const EditorContext = createContext<EditorContextType | null>(null)

export function useEditor() {
  const context = useContext(EditorContext)
  if (!context) {
    return {
      editMode: false,
      setEditMode: () => {},
      selectedElement: null,
      setSelectedElement: () => {},
      elementStyles: {},
      updateElementStyle: () => {},
      pendingChanges: false,
      setPendingChanges: () => {},
    }
  }
  return context
}

export function EditorProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [elementStyles, setElementStyles] = useState<Record<string, ElementStyle>>({})
  const [pendingChanges, setPendingChanges] = useState(false)

  const updateElementStyle = (id: string, style: Partial<ElementStyle>) => {
    setElementStyles(prev => ({
      ...prev,
      [id]: { ...prev[id], id, ...style }
    }))
    setPendingChanges(true)
  }

  return (
    <EditorContext.Provider value={{
      editMode,
      setEditMode,
      selectedElement,
      setSelectedElement,
      elementStyles,
      updateElementStyle,
      pendingChanges,
      setPendingChanges,
    }}>
      {children}
    </EditorContext.Provider>
  )
}
