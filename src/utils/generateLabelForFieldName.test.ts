import generateLabelForFieldName from './generateLabelForFieldName'

describe('generateLabelForFieldName', () => {
  it('Should generate a label for a field name', () => {
    const result = generateLabelForFieldName('test field')
    expect(result).toEqual('Test Field')
  })
  it('Should generate a label for a field name with underscores', () => {
    const result = generateLabelForFieldName('no_more_underscores')
    expect(result).toEqual('No More Underscores')
  })
  it('Should generate a label for a field name with hyphens', () => {
    const result = generateLabelForFieldName('say-goodbye-hyphenated-words')
    expect(result).toEqual('Say Goodbye Hyphenated Words')
  })
  it('Should generate a label for a field name with hyphens and underscores', () => {
    const result = generateLabelForFieldName('testing-field_names')
    expect(result).toEqual('Testing Field Names')
  })
  it('Should generate a label for a field name with hyphens and underscores and capital letters', () => {
    const result = generateLabelForFieldName('my-FIELD_input')
    expect(result).toEqual('My Field Input')
  })
})
