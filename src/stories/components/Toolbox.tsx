import React from 'react'
import { useTools } from '../../context/ToolContextProvider'
import ToolboxItemWrapper from '../../components/ToolboxItemWrapper'

const Toolbox = () => {
  const { tools } = useTools()
  return <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {tools.map((t) => (
      <ToolboxItemWrapper key={t.toolType} tool={t}>
        <div style={{ padding: 30, border: '1px solid black', margin: 4}}>
          <h1>{t.title}</h1>
        </div>
      </ToolboxItemWrapper>
    ))}
  </div>
}

export default Toolbox