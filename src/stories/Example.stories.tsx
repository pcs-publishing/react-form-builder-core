import React from 'react'
import { Story, Meta } from '@storybook/react'
import EditorWrapper from '../components/EditorWrapper'
import { Tool, ToolInstance } from '../types'
import FormContextProvider from '../context/FormContextProvider'
import ToolContextProvider, { ToolContentImport } from '../context/ToolContextProvider'
import Form from '../components/Form'
import FormContent from './components/FormContent'
import ExampleTool from './components/ExampleTool'
import Toolbox from './components/Toolbox';

export default {
  title: 'Example Usage',
  component: EditorWrapper,
  argTypes: { onSubmit: { action: 'onSubmit' } },
} as Meta<typeof EditorWrapper>

const blockTool: Tool<{ name: string, color: string, toolInstance: ToolInstance<any> }> = {
  toolType: 'block',
  title: 'Block',
  requireName: false,
  icon: <p>Block</p>,
  component: ExampleTool,
  options: {
    color: 'green'
  }
}


const Template: Story<ToolContentImport<any>> = (args) => {
  const { onSubmit, ...contextArgs } = args as unknown as ({ onSubmit: () => void } & ToolContentImport<any>)
  return (
    <ToolContextProvider {...contextArgs}>
      <EditorWrapper>
        <FormContextProvider>
            <Form onSubmit={onSubmit}>
              <FormContent />
            </Form>
        </FormContextProvider>
        <Toolbox />
      </EditorWrapper>
    </ToolContextProvider>
  )
}

export const CrudeExample = Template.bind({})
CrudeExample.args = {
  tools: [blockTool],
  initialValue: {
    items: [
      {
        toolType: 'block',
        name: 'block_1',
        options: {
          color: 'red'
        }
      },
      {
        toolType: 'block',
        name: 'block_2',
        options: {
          color: 'blue'
        }
      },
        {
        toolType: 'block',
        name: 'block_3',
        options: {
          color: 'green'
        }
      },
          {
        toolType: 'block',
        name: 'block_4',
        options: {
          color: 'yellow'
        }
      },
     
    ]
  }
}
