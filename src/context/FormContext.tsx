import React, { createContext } from 'react'
import {
  UseFormRegister,
  FieldValues,
  useForm,
  FormState,
  UseFormWatch,
  UseFormHandleSubmit,
  Control
} from 'react-hook-form'

interface FormContextExport {
  register: UseFormRegister<FieldValues>
  formState: FormState<FieldValues>
  handleSubmit: UseFormHandleSubmit<FieldValues>
  watch: UseFormWatch<FieldValues>
  control: Control<FieldValues>
}

const FormContext = createContext<FormContextExport | null>(null)

export const FormContextProvider = (props: { children: React.ReactChild }) => {
  const { register, handleSubmit, watch, formState, control } = useForm()

  return (
    <FormContext.Provider
      value={{ register, handleSubmit, watch, formState, control }}
    >
      {props.children}
    </FormContext.Provider>
  )
}

export default FormContext
