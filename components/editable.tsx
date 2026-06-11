'use client'

import { useEditor } from '@/lib/editor-context'
import { useState, useRef, useEffect, ReactNode } from 'react'

interface EditableProps {
  id: string
  children: ReactNode
  className?: string
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'section'
  editable?: 'text' | 'style' | 'both'
}

export function Editable({ id, children, className = '', as: Component = 'div', editable = 'both' }: EditableProps) {
  const { editMode, selectedElement, setSelectedElement, elementStyles, updateElementStyle } = useEditor()
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isEditingText, setIsEditingText] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  
  const style = elementStyles[id] || {}
  const isSelected = selectedElement === id

  const handleClick = (e: React.MouseEvent) => {
    if (!editMode) return
    e.stopPropagation()
    setSelectedElement(id)
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!editMode || editable === 'style') return
    e.stopPropagation()
    setIsEditingText(true)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!editMode || !isSelected || isEditingText) return
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX - (style.x || 0), y: e.clientY - (style.y || 0) })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateElementStyle(id, {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
    if (isResizing && elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect()
      updateElementStyle(id, {
        width: e.clientX - rect.left,
        height: e.clientY - rect.top,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  const handleTextChange = (e: React.FormEvent<HTMLDivElement>) => {
    updateElementStyle(id, { text: e.currentTarget.textContent || '' })
  }

  const handleBlur = () => {
    setIsEditingText(false)
  }

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragStart])

  const computedStyle: React.CSSProperties = {
    ...(style.x !== undefined || style.y !== undefined ? {
      position: 'relative' as const,
      left: style.x,
      top: style.y,
    } : {}),
    ...(style.width ? { width: style.width } : {}),
    ...(style.height ? { height: style.height } : {}),
    ...(style.fontSize ? { fontSize: style.fontSize } : {}),
    ...(style.color ? { color: style.color } : {}),
    ...(style.backgroundColor ? { backgroundColor: style.backgroundColor } : {}),
    ...(editMode ? { cursor: isSelected ? 'move' : 'pointer' } : {}),
  }

  return (
    <Component
      ref={elementRef as any}
      className={`${className} ${editMode ? 'editable-element' : ''} ${isSelected ? 'editable-selected' : ''}`}
      style={computedStyle}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      contentEditable={isEditingText}
      suppressContentEditableWarning
      onInput={handleTextChange}
      onBlur={handleBlur}
      data-editable-id={id}
    >
      {style.text !== undefined ? style.text : children}
      
      {/* Resize handle */}
      {editMode && isSelected && (
        <div
          className="absolute bottom-0 right-0 w-3 h-3 bg-primary cursor-se-resize"
          onMouseDown={(e) => {
            e.stopPropagation()
            setIsResizing(true)
          }}
        />
      )}
    </Component>
  )
}
