import { FormStructure, ToolInstance } from '../types'
import { flatten } from 'lodash'

function formatToolInstancesToItems(
  toolInstances: ToolInstance<any>[]
): FormStructure['items'] {
  const structured: FormStructure['items'][] = toolInstances.map(
    (toolInstance, index) => {
      const item: FormStructure['items'][number] = {
        toolType: toolInstance.toolType,
        options: toolInstance.options,
        name: toolInstance.name,
        position: index,
        parent: toolInstance.parent
      }

      return [item, ...formatToolInstancesToItems(toolInstance.children || [])]
    }
  )

  return flatten(structured)
}

export default formatToolInstancesToItems
