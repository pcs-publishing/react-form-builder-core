import { ToolInstance } from '../types/index'
import getToolInstanceByName from './getToolInstanceByName'

export default function getToolInstanceSiblings(
  name: string,
  toolInstances: ToolInstance<any>[]
): ToolInstance<any>[] {
  const toolInstance = getToolInstanceByName(name, toolInstances)

  if (toolInstance.parent) {
    const parent = getToolInstanceByName(toolInstance.parent, toolInstances)
    return parent.children
  }

  return toolInstances
}
