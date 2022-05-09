import React from 'react'
import {
  useSensors,
  useSensor,
  PointerSensor,
  DragEndEvent,
  DndContext,
  DragStartEvent
} from '@dnd-kit/core'
import useDragHandler from './hooks/useDragHandler'

interface EditorWrapperProps {
  onDragStart?: (event: DragStartEvent) => void
  onDragEnd?: (event: DragEndEvent) => void
  children: React.ReactElement | React.ReactElement[]
}

const EditorWrapper = (props: EditorWrapperProps) => {
  const onDragEnd = useDragHandler()

   const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
   )
  
  const handleDragStart = (event: DragStartEvent) => {
    if (props.onDragStart) props.onDragStart(event)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    if (props.onDragEnd) props.onDragEnd(event)
    onDragEnd(event)
  }
  
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      {props.children}
    </DndContext>
  )
  
}

export default EditorWrapper