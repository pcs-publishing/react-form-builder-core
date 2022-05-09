import { capitalize, snakeCase } from 'lodash'

export default function generateLabelForFieldName(fieldName: string): string {
  return snakeCase(fieldName).split('_').map(capitalize).join(' ')
}
