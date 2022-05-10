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
    <DragOverlay>
        {isDragging ? <div className={`${props.className} ${props.isDraggingClassName}`}>{props.children}</div> : null}
    </DragOverlay>
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
