import { useContext } from 'react'
import { FormContext } from '../context/FormContextProvider'

const useFormControl = () => {
  const context = useContext(FormContext)

  if (!context) {
    throw new Error('useFormControl must be used within a FormContextProvider')
  }

  return context.control
}

export default useFormControl
