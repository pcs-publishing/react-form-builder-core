# React Form Creator Core

The core logic for creating FormEditor and FormRenderer UI components. This library contains no styling or pre-build tools, just the core logic for allowing the placement of tools on a form via drag and drop.

## Installation

### NPM

```bash
npm install @pcs/react-form-creator-core
```

### Yarn

```bash
yarn add @pcs/react-form-creator-core
```

## Usage

### Creating tools

Forms are made up of instances of tools and your FormEditor/FormRenderer components need to know how to render them.

Here is an example of a basic text field tool:

```typescript
import { Tool } from '@pcs/react-form-creator-core'
import TextField, { TextFieldProps } from './TextField'

const TextFieldTool: Tool<TextFieldProps> = {
  toolType: 'text_field', // a unique tool type value
  title: 'Text Field', // The human readable name of the tool
  icon: <i>TEXT</i>, // A React element that renders an icon for the tool
  options: { // The options object represents the default options for the tool, on tool render each option is passed as a prop to the tool component
    label: 'Default Label' 
  },
  component: TextField // The component to render for an instance of this tool
}
```

An example TextField component could then look like:

```typescript
import { useRegisterField } from '@pcs/react-form-creator-core'

export interface TextFieldProps {
  name: string // Name will always be passed to all tool components
  label: string // Passed from the options object on the tool instance
}

const TextField = (props: TextFieldProps) => {
  const fieldProps = useRegisterField(props.name) // The useRegisterField hook generates the props needed to register a field of the given name against the form

  return (
    <div>
      <label>{props.label}</label>
      <input type="text" {...fieldProps} />
    </div>
  )
}

export default TextField
```

### Setting up an Editor

Once you have some tools in place you can create an editor that uses them, first you need to wrap your editor component in the CoreContextProvider, which you can do like so:

```typescript
import { CoreContextProvider } from '@pcs/react-form-creator-core'
import { TextFieldTool, NumberFieldTool } from './tools'
import FormEditor from './FormEditor'
import PendingToolDialog from './PendingToolDialog'

const tools = [TextFieldTool, NumberFieldTool]

const initialValue = { 
  items: [{ 
    toolType: 'text_field', 
    name: 'first_field', 
    options: { label: 'First Field'}
  }, { 
    toolType: 'text_field', 
    name: 'second_field', 
    options: { label: 'Second Field'}
  }] 
}

const MyApp = () => {
  return (
    <CoreContextProvider 
      tools={tools}
      initialValue={initialValue}
      pendingToolDialog={PendingToolDialog}
    >
      <FormEditor />
    </CoreContextProvider>
  )
}

export default MyApp
```

The context provider holds:

* The tools which we set up in the previous section.
* The initial value which is the value for the form as a whole, at a minimum must contain an items array, which is a flat array of data representing the initial tool instances
* A "pendingToolDialog" component that has the following props

```typescript
interface PendingToolDialogProps {
  pendingTool: {
    tool: Tool<any>
    index?: number
    parent?: string
  } | null
  onClose: () => void
  onAdd: (
    tool: ToolInstance<any>,
    index?: number,
    parent?: string
  ) => true | string
} 
```

This component should display whenever there is a pending tool passed as a prop and call onAdd whenever the user has specified a name for that pending tool. If the onAdd function returns a string then that should be displayed as an error message in the dialog. This component has been left out of the core library as it leaves it up to the consumer how it is implemented / styled.

Your FormEditor component itself should look something like this:

```typescript
import { 
  Form, 
  EditorWrapper, 
  ToolInstanceDraggableWrapper, 
  ToolInstanceRenderer 
} from '@pcs/react-form-creator-core'
import Toolbox from './Toolbox'

interface FormEditorProps {
  onSubmit: (value: Record<string, unknown>) => void
  onSave: (formStructure: FormStructure) => void
}

const FormEditor = (props: FormEditorProps) => {
  const { toolInstances }

  return (
    <EditorWrapper>
      <div>
        <Form onSubmit={props.onSubmit}>
          {toolInstances.map((toolInstance) => (
            <ToolInstanceDraggableWrapper toolInstance={toolInstance} key={toolInstance.name}>
              <ToolInstanceRenderer
                editMode
                toolInstance={toolInstance}
              />
            </ToolInstanceDraggableWrapper>
          ))}
        </Form>
        <ToolBox />
      </div>
    </EditorWrapper>
  )
}

export default FormEditor
```

You can customise this how you see fit, but the core two things you need are the form area where the tool instances are rendered and a toolbox where tools can be added to the form.

The ToolBox component can then look something like this:

```typescript
import { useTools, ToolboxItemWrapper } from '@pcs/react-form-creator-core'

const Toolbox = () => {
  const { tools } = useTools()
  return <div>
    {tools.map((tool) => (
      <ToolboxItemWrapper key={tool.toolType} tool={tool}>
        <div
          {tool.icon}
          <h1>{tool.title}</h1>
        </div>
      </ToolboxItemWrapper>
    ))}
  </div>
}

export default Toolbox
```

Wrapping your tool item's in `ToolboxItemWrapper` will make each tool item draggable, then once dropped on to your form it will start the creation of a tool instance in the position it was dropped. If the tool requires a name then the previously mentioned configured `PendingToolDialog` will come into play, once the user has confirmed a valid name for the tool then the tool instance will be created and added to the form.

### Setting up a Renderer

A Form Renderer component is the component that is used after the form has been created and is ready for data to be entered into it, setting one up can be done like so:

```typescript
import { CoreContextProvider, Form, ToolInstanceRenderer, FormStructure, Tool, useTools } from '@pcs/react-form-creator-core'

interface FormRendererProps {
  tools: Tool<any>[]
  items: FormStructure['items']
  onSubmit: (data: Record<string, unknown>) => void
}

const FormRendererWrapped = (props: FormRendererProps) => {
  const { tools, items, className, onSubmit } = props
  return (
    <CoreContextProvider tools={tools} initialValue={{ items }}>
      <FormRenderer
        onSubmit={onSubmit}
      />
    </ContextProvider>
  )
}

const FormRenderer = (props: Pick<FormRendererProps, 'onSubmit'>) => {
  return (
    <Form onSubmit={props.onSubmit}>
      {toolInstances.map((toolInstance) => (
        <ToolInstanceRenderer
          key={toolInstance.name}
          toolInstance={toolInstance}
        />
      ))}
      <input type="submit">Submit</button>
    </Form>
  )
}

export default FormRendererWrapped

```