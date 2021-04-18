import {
  isObject,
  toCamelCase,
  toSnakeCase,
  mapKeysToCamelCase,
  getTrustScoreColor,
  toStandardDateStr,
  toThousands,
} from '../src/common/utils'

describe('Util', () => {
  it('isObject', () => {
    expect(isObject({})).toBe(true)
  })

  it('toCamelCase', () => {
    expect(toCamelCase('foo_bar')).toBe('fooBar')
  })

  it('toSnakeCase', () => {
    expect(toSnakeCase('fooBar')).toBe('foo_bar')
  })

  it('mapKeysToCamelCase', () => {
    const object = {
      foo_bar: 1,
      array: [
        {
          foo_bar: 2,
        },
      ],
    }
    const result = mapKeysToCamelCase(object)
    expect(result.fooBar).toBe(1)
    expect(result.array[0].fooBar).toBe(2)
  })

  it('toThousands', () => {
    expect(toThousands(12345678)).toBe('12,345,678.00')
    expect(toThousands(123456.78)).toBe('123,456.78')
  })

  it('getTrustScoreColor', () => {
    expect(getTrustScoreColor(10)).toBe('green')
    expect(getTrustScoreColor(4)).toBe('orange')
    expect(getTrustScoreColor(2)).toBe('red')
  })

  it('toStandardDateStr', () => {
    expect(toStandardDateStr('2020-01-24T09:37:17.816Z')).toBe('2020-01-24')
  })
})
