import { ToolInstance } from '../../../types'
import { useDndMonitor, DragEndEvent } from '@dnd-kit/core'
import { useTools } from '../../../context/ToolContextProvider'
import getToolInstanceByName from '../../../utils/getToolInstanceByName'

interface Props {
  toolInstance: ToolInstance<any>
  droppableId: string
}

function useToolInstanceChildrenDndMonitor(props: Props) {
  const {
    tools,
    createToolInstance,
    toolInstances,
    removeToolInstance,
    updateToolInstance
  } = useTools()

  const handleToolDrop = (event: DragEndEvent) => {
    const toolType = event.active.id
    const tool = tools.find((tool) => tool.toolType === toolType)

    if (!tool) return

    createToolInstance({
      tool,
      parent: props.toolInstance.name
    })
  }

  const handleMoveIntoThisToolInstance = (event: DragEndEvent) => {
    const movedToolInstance = getToolInstanceByName(
      event.active.id,
      toolInstances
    )

    // If the tool instance is already a child of this tool instance, do nothing
    if (movedToolInstance.parent === props.toolInstance.name) return

    removeToolInstance(movedToolInstance)

    updateToolInstance({
      ...props.toolInstance,
      children: [
        ...props.toolInstance.children,
        { ...movedToolInstance, parent: props.toolInstance.name }
      ]
    })
  }

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const isOverThis = event.over?.id === props.droppableId
      const isDraggingSelf = event.active.id === props.toolInstance.name

      if (!isOverThis || isDraggingSelf) {
        return
      }

      const isTool = event.active.data.current?.type === 'tool'

      if (isTool) {
        return handleToolDrop(event)
      }

      return handleMoveIntoThisToolInstance(event)
    }
  })
}

export default useToolInstanceChildrenDndMonitor
