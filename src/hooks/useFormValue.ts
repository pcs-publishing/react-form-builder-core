import { useContext } from 'react'
import FormContext from '../context/FormContext'
import { useWatch } from 'react-hook-form'

const useFormValue = (name: string) => {
  const context = useContext(FormContext)

  if (!context) {
    throw new Error(
      'useRegisterField must be used within a FormContextProvider'
    )
  }
  const { control } = context
  return useWatch({ name, control })
}

export default useFormValue
