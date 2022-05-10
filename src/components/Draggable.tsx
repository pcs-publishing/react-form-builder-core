import React from 'react'
import { DragOverlay, useDraggable } from '@dnd-kit/core'

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
    <>
      {isDragging ? <DragOverlay>
        <div className={`${props.className} ${props.isDraggingClassName}`}>{props.children}</div>
      </DragOverlay> : null}
    <div
      className={props.className}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      >
      {props.children}
    </div>
    </>
  )
}

export default Draggable
