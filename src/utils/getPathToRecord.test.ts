import getIndexPathToRecord from './getPathToRecord'

interface TestDataType {
  id: number
  children: TestDataType[]
}

const testData: TestDataType[] = [
  {
    id: 1,
    children: [
      {
        id: 2,
        children: [
          {
            id: 3,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 4,
    children: []
  },
  {
    id: 5,
    children: [
      {
        id: 6,
        children: []
      }
    ]
  }
]

describe('getPathToRecord', () => {
  it('Should find the path to a top-level record', () => {
    const result = getIndexPathToRecord({
      records: testData,
      idField: 'id',
      childField: 'children',
      targetId: 1
    })

    expect(result).toEqual(['0'])
  })

  it('Should find the index path to a second-level record', () => {
    const result = getIndexPathToRecord({
      records: testData,
      idField: 'id',
      childField: 'children',
      targetId: 6
    })

    expect(result).toEqual(['2', 'children', '0'])
  })
})
