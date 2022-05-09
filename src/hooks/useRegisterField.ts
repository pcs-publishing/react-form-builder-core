import { useContext } from 'react'
import { RegisterOptions } from 'react-hook-form'
import FormContext from '../context/FormContext'

const useRegisterField = (name: string, options?: RegisterOptions) => {
  const context = useContext(FormContext)

  if (!context) {
    throw new Error(
      'useRegisterField must be used within a FormContextProvider'
    )
  }
  return context.register(name, options)
}

export default useRegisterField
