import { CDN_BASE_URL } from './constants'

export function isObject(data) {
  return Object.prototype.toString.call(data) === '[object Object]'
}

export function toCamelCase(str) {
  /* eslint-disable no-useless-escape */
  return str.replace(/\_(\w)/g, (_, letter) => letter.toUpperCase())
}

export function toSnakeCase(str) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

export function mapKeysToCamelCase(data) {
  const result = {}
  if (typeof data !== 'object' || data === null) return data

  if (Array.isArray(data)) {
    return data.map(mapKeysToCamelCase)
  } else {
    Object.keys(data).forEach((key) => {
      const value = data[key]
      result[toCamelCase(key)] =
        typeof data === 'object' ? mapKeysToCamelCase(value) : value
    })
  }

  return result
}

export function toThousands(num) {
  return num
    .toFixed(2)
    .toString()
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}

export function getImageCDNUrl(path) {
  return `${CDN_BASE_URL}/${path}`
}

export function getTrustScoreColor(score) {
  let color = 'green'
  if (score < 6 && score >= 4) {
    color = 'orange'
  }
  if (score < 4) {
    color = 'red'
  }
  return color
}

export function toStandardDateStr(time) {
  const date = new Date(time)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${date.getFullYear()}-${month > 9 ? month : `0${month}`}-${
    day > 9 ? day : `0${day}`
  }`
}

export function buildSorterBySpecKey(key) {
  return (prev, next) => prev[key] - next[key]
}
