import { useContext } from 'react'
import { FormContext } from '../context/FormContextProvider'

const useFieldErrors = (name: string) => {
  const context = useContext(FormContext)

  if (!context) {
    throw new Error('useFieldErrors must be used within a FormContextProvider')
  }
  return context.formState.errors[name]
}

export default useFieldErrors
