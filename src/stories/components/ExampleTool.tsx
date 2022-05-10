import React from 'react'
import { useRegisterField } from '../../hooks'

interface ExampleToolProps {
  name: string
  color: string
}

const ExampleTool = (props: ExampleToolProps) => {
  const inputProps = useRegisterField(props.name)
  return <div style={{ backgroundColor: props.color, padding: '20px', width: '50%', display: 'flex', flexDirection: 'column' }}>
    <label>{props.name}</label>
    <input type="text" {...inputProps} />
  </div>
}

export default ExampleTool