import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { ToolInstance } from '../types'

interface ToolInstanceDraggableWrapperProps {
  toolInstance: ToolInstance<any>
  children: React.ReactElement | React.ReactElement[]
  className?: string
  isDraggingClassName?: string
}

const ToolInstanceDraggableWrapper = (props: ToolInstanceDraggableWrapperProps) => {
  const { toolInstance } = props

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: toolInstance.name
  })

    const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`${props.className || ''} ${isDragging ? props.isDraggingClassName || '' : ''}`}
    >
      {props.children}
    </div>
  )
}

export default ToolInstanceDraggableWrapper