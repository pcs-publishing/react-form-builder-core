type SubType<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never
  }[keyof Base]
>

interface GetPathToRecordParams<T> {
  idField: keyof T
  targetId: string | number
  childField: keyof SubType<T, T[]>
  records: T[]
}

export default function getPathToRecord<T>(
  params: GetPathToRecordParams<T>
): string[] | null {
  return getPathToRecordRecursive(params, [])
}

function getPathToRecordRecursive<T>(
  params: GetPathToRecordParams<T>,
  path: string[]
): string[] | null {
  const { idField, targetId, childField, records } = params
  const indexOfTarget = records.findIndex(
    (r) => (r[idField] as unknown as string | number) === targetId
  )

  if (indexOfTarget >= 0) {
    return [...path, indexOfTarget.toString()]
  }

  for (let i = 0; i < records.length; i++) {
    const record = records[i]
    const children = record[childField] as unknown as T[]

    const result = getPathToRecordRecursive({ ...params, records: children }, [
      ...path,
      i.toString(),
      childField as string
    ])

    if (result) {
      return result
    }
  }

  return null
}
