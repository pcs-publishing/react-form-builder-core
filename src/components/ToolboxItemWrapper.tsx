import React from 'react'
import { Tool } from '../types'
import Draggable from './Draggable'

interface ToolboxItemWrapperProps {
  tool: Tool<any>
  children: React.ReactElement
  className?: string
  isDraggingClassName?: string
}


const ToolboxItemWrapper = (props: ToolboxItemWrapperProps) => {
  const { tool } = props
  return (
    <Draggable
      id={tool.toolType}
      data={{ type: 'tool' }}
      className={props.className}
      isDraggingClassName={props.isDraggingClassName}
    >
      {props.children}
    </Draggable>
  )
}

export default ToolboxItemWrapper