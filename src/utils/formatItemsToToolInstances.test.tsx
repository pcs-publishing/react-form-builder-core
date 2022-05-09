import React from 'react'
import formatItemsToToolInstances from './formatItemsToToolInstances'
import { Tool } from '../types/index'

const TestTool: Tool<any> = {
  title: 'Test Tool',
  toolType: 'test_tool',
  icon: <p>Icon</p>,
  requireName: false,
  options: {
    label: ''
  },
  component: () => <p>Test Tool</p>
}

const tools: Tool<any>[] = [TestTool]

describe('formatItemsToToolInstances', () => {
  it('Should format the items to tool instances', () => {
    const items = [
      {
        toolType: 'test_tool',
        name: 'top',
        options: {
          label: 'Top'
        },
        position: 0
      },
      {
        toolType: 'test_tool',
        name: 'inner',
        options: {
          label: 'Inner'
        },
        parent: 'top',
        position: 1
      }
    ]

    const result = formatItemsToToolInstances(items, tools)

    expect(result).toEqual([
      {
        ...TestTool,
        name: 'top',
        options: {
          label: 'Top'
        },
        parent: undefined,
        children: [
          {
            ...TestTool,
            name: 'inner',
            parent: 'top',
            options: {
              label: 'Inner'
            },
            children: []
          }
        ]
      }
    ])
  })

  it('Should format the items into order based on the items position value', () => {
    const items = [
      {
        toolType: 'test_tool',
        name: 'second',
        options: {
          label: 'Second'
        },
        position: 1
      },
      {
        toolType: 'test_tool',
        name: 'first',
        options: {
          label: 'First'
        },
        position: 0
      }
    ]

    const result = formatItemsToToolInstances(items, tools)

    expect(result).toEqual([
      {
        ...TestTool,
        name: 'first',
        options: {
          label: 'First'
        },
        parent: undefined,
        children: []
      },
      {
        ...TestTool,
        name: 'second',
        options: {
          label: 'Second'
        },
        parent: undefined,
        children: []
      }
    ])
  })
})
