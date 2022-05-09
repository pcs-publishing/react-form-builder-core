export interface FormStructure {
  items: (Pick<
    ToolInstance<any>,
    'name' | 'options' | 'toolType' | 'parent'
  > & { position: number })[]
}

type OptionFields<T> = {
  [Key in keyof T]?: React.FC<{
    value: T[Key]
    label: string
    onChange: (value: T[Key]) => void
  }>
}

export interface Tool<OptionsGeneric extends FieldProps> {
  title: string
  toolType: string
  requireName?: boolean
  disableDefaultDroppable?: boolean
  icon: React.ReactElement
  options: Omit<OptionsGeneric, keyof FieldProps>
  optionFields?: OptionFields<Omit<OptionsGeneric, keyof FieldProps>>
  component: React.FC<OptionsGeneric>
  editComponent?: React.FC<OptionsGeneric>
}

export type ToolInstance<T extends FieldProps> = Tool<T> & {
  name: string
  parent?: string
  children: ToolInstance<T>[]
}

export interface FieldProps {
  name: string
  toolInstance: ToolInstance<any>
}
