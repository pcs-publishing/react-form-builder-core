import React from 'react'
import { SortableContext } from '@dnd-kit/sortable'
import useFormSubmit from '../hooks/useFormSubmit'
import { useTools } from '../context/ToolContextProvider'

interface FormProps {
  className?: string
  children: React.ReactNode | React.ReactNode[]
  onSubmit: (data: Record<string, unknown>) => void
}

const Form = (props: FormProps) => {
  const handleSubmit = useFormSubmit(props.onSubmit)
  const { toolInstances } = useTools()

  return <form onSubmit={handleSubmit} className={props.className || ''}>
    <SortableContext items={toolInstances.map(instance => instance.name)}>
      {props.children}
    </SortableContext>
  </form>
}

export default Form 