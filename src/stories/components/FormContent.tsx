import React from 'react'
import { ToolInstanceDraggableWrapper } from '../../components'
import ToolInstanceRenderer from '../../components/ToolInstanceRenderer'
import { useTools } from '../../context/ToolContextProvider'

const FormContent = () => {
  const { toolInstances } = useTools()

  return (
    <>
      {toolInstances.map((i) => (
        <ToolInstanceDraggableWrapper toolInstance={i} key={i.name}>
          <ToolInstanceRenderer
            editMode
            toolInstance={i}
          />
        </ToolInstanceDraggableWrapper>
      ))}
      <button type="submit">Submit</button>
    </>
  )
}

export default FormContent
