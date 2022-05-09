import { useCallback } from 'react'
import { useTools } from '../../../context/ToolContextProvider'
import getToolInstanceSiblings from '../../../utils/getToolInstanceSiblings'
import { Active, Over, DragEndEvent } from '@dnd-kit/core'

function useDragHandler() {
  const { tools, toolInstances, createToolInstance, moveToolInstance } =
    useTools()

  const handleToolDrop = (event: { active: Active; over: Over }) => {
    const { active, over } = event
    const overToolInstance = toolInstances.find((ti) => ti.name === over.id)

    if (overToolInstance && overToolInstance.disableDefaultDroppable) {
      return
    }

    const newIndex = toolInstances.findIndex(
      (instance) => instance.name === over.id
    )
    const tool = tools.find((t) => t.toolType === active.id)
    if (tool) {
      createToolInstance({ tool, index: newIndex })
    }
  }

  const handleToolInstanceMove = (event: { active: Active; over: Over }) => {
    const { active, over } = event
    const toolInstanceSiblings = getToolInstanceSiblings(over.id, toolInstances)
    const newIndex = toolInstanceSiblings.findIndex(
      (instance) => instance.name === over.id
    )

    moveToolInstance(active.id, newIndex)
  }

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || !active || active.id === over?.id) return

      const itemType = active.data.current?.type as 'tool' | undefined

      if (itemType === 'tool') {
        return handleToolDrop({ active, over })
      }

      return handleToolInstanceMove({ active, over })
    },
    [toolInstances]
  )

  return handleDragEnd
}

export default useDragHandler
