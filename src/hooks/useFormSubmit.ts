import { useContext } from 'react'
import FormContext from '../context/FormContextProvider'

const useFormSubmit = (handler: (data: Record<string, unknown>) => void) => {
  const context = useContext(FormContext)

  if (!context) {
    throw new Error('useFormSubmit must be used within a FormContextProvider')
  }

  return context.handleSubmit(handler)
}

export default useFormSubmit
