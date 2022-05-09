import { ToolInstance } from '../types'
import getPathToRecord from './getPathToRecord'
import { get } from 'lodash'

export default function getToolInstanceByName(
  name: string,
  toolInstances: ToolInstance<any>[]
): ToolInstance<any> {
  const path = getPathToRecord({
    records: toolInstances,
    targetId: name,
    idField: 'name',
    childField: 'children'
  })

  if (!path) {
    throw new Error('Can not find path to tool instance with name: ' + name)
  }

  return get(toolInstances, path) as ToolInstance<any>
}
