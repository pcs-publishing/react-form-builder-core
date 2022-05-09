import React from 'react'
import { useDraggable } from '@dnd-kit/core'

interface DraggableProps {
  id: string
  children: React.ReactElement
  data?: Record<string, unknown>
  className?: string
  isDraggingClassName ?: string
}

const Draggable = (props: DraggableProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: props.id,
    data: props.data
  })

  return (
    <div
      className={`${props.className || ''} ${
        isDragging ? props.isDraggingClassName || '' : ''
      }`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  )
}

export default Draggable
