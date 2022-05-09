import { FormStructure, Tool, ToolInstance } from '../types'
import { orderBy } from 'lodash'

function formatItemsToToolInstances(
  items: FormStructure['items'],
  tools: Tool<any>[]
): ToolInstance<any>[] {
  const topLevelItems = items.filter((item) => !item.parent)
  return formatItemsToToolInstancesResursive(items, topLevelItems, tools)
}

function formatItemsToToolInstancesResursive(
  allItems: FormStructure['items'],
  itemsToFormat: FormStructure['items'],
  tools: Tool<any>[]
): ToolInstance<any>[] {
  const orderedItemsToFormat = orderBy(itemsToFormat, ['position'])
  return orderedItemsToFormat.map((item) => {
    const tool = tools.find((t) => t.toolType === item.toolType)
    if (!tool) {
      throw new Error(`Could not find tool for type ${item.toolType}`)
    }
    return {
      ...tool,
      name: item.name,
      children: formatItemsToToolInstancesResursive(
        allItems,
        allItems.filter((iteratee) => iteratee.parent === item.name),
        tools
      ),
      parent: item.parent,
      options: {
        ...tool.options,
        ...item.options
      }
    }
  })
}

export default formatItemsToToolInstances
