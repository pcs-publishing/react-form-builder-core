import React from 'react'
import ToolContextProvider, { ToolContextProviderProps } from './ToolContextProvider'
import FormContextProvider, { FormContextProviderProps } from './FormContextProvider'
import { FormStructure } from '../types'

type CoreContextProviderProps<T extends FormStructure> = ToolContextProviderProps<T>  & FormContextProviderProps

const CoreContextProvider = <T extends FormStructure>(props: CoreContextProviderProps<T>) => {
  return <ToolContextProvider {...props}>
    <FormContextProvider>
      {props.children}
    </FormContextProvider>
  </ToolContextProvider>
}

export default CoreContextProvider