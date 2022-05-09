import React from 'react'
import formatToolInstancesToItems from './formatToolInstancesToItems'
import { ToolInstance } from '../types/index'

describe('formatToolInstancesToItems', () => {
  it('should return an empty array if no tool instances are passed', () => {
    expect(formatToolInstancesToItems([])).toEqual([])
  })

  it('Should format tool instances to items', () => {
    const instances: ToolInstance<any>[] = [
      {
        toolType: 'text',
        title: 'Text',
        icon: <div>Text</div>,
        component: () => <div>Text</div>,
        name: 'headline',
        options: {
          label: 'Headline',
          required: true
        },
        children: []
      },
      {
        toolType: 'text',
        title: 'Text',
        icon: <div>Text</div>,
        component: () => <div>Text</div>,
        name: 'body',
        options: {
          label: 'Body',
          required: true,
          multiline: true
        },
        children: []
      }
    ]

    const result = formatToolInstancesToItems(instances)
    expect(result).toEqual([
      {
        toolType: 'text',
        name: 'headline',
        options: {
          label: 'Headline',
          required: true
        },
        parent: undefined,
        position: 0
      },
      {
        toolType: 'text',
        name: 'body',
        options: {
          label: 'Body',
          required: true,
          multiline: true
        },
        parent: undefined,
        position: 1
      }
    ])
  })

  it('Should format tool instances with children into a flat array', () => {
    const instances: ToolInstance<any>[] = [
      {
        toolType: 'text',
        title: 'Text',
        icon: <div>Text</div>,
        component: () => <div>Text</div>,
        name: 'headline',
        options: {
          label: 'Headline',
          required: true
        },
        children: [
          {
            toolType: 'text',
            title: 'Text',
            icon: <div>Text</div>,
            component: () => <div>Text</div>,
            name: 'body',
            parent: 'headline',
            options: {
              label: 'Body',
              required: true,
              multiline: true
            },
            children: [
              {
                toolType: 'text',
                title: 'Text',
                icon: <div>Text</div>,
                component: () => <div>Text</div>,
                name: 'inner',
                parent: 'body',
                options: {
                  label: 'Inner',
                  required: true,
                  multiline: true
                },
                children: []
              }
            ]
          }
        ]
      }
    ]

    const result = formatToolInstancesToItems(instances)
    expect(result).toEqual([
      {
        toolType: 'text',
        name: 'headline',
        options: {
          label: 'Headline',
          required: true
        },
        parent: undefined,
        position: 0
      },
      {
        toolType: 'text',
        name: 'body',
        options: {
          label: 'Body',
          required: true,
          multiline: true
        },
        parent: 'headline',
        position: 0
      },
      {
        toolType: 'text',
        name: 'inner',
        options: {
          label: 'Inner',
          required: true,
          multiline: true
        },
        parent: 'body',
        position: 0
      }
    ])
  })
})
