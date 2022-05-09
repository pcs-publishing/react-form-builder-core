import React from 'react'
import { useTools } from '../context/ToolContext'
import { ToolInstance } from '../types/index'

interface ToolInstanceRendererProps {
  toolInstance: ToolInstance<any>
  name?: string
  editMode?: boolean
  index?: number
}

const ToolInstanceRenderer = (props: ToolInstanceRendererProps) => {
  const { toolInstance } = props
  const { tools } = useTools()

  const matchingTool = tools.find((t) => t.toolType === toolInstance.toolType)

  if (!matchingTool) return null

  const Component =
    (props.editMode ? matchingTool.editComponent : null) ||
    matchingTool.component

  return (
    <Component
      name={props.name || toolInstance.name}
      toolInstance={toolInstance}
      {...toolInstance.options}
    />
  )
}

export default ToolInstanceRenderer
