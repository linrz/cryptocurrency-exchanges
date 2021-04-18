import { API_BASE_URL } from './constants'
import { toSnakeCase, mapKeysToCamelCase } from './utils'

function request(path, config) {
  return fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'json',
      'Access-Control-Allow-Origin': '*',
    },
    mode: 'cors',
    ...config,
  })
    .then((response) => {
      return Promise.all([response, response.json()])
    })
    .then(
      ([response, data]) => {
        if (response.status !== 200) {
          return Promise.reject(
            new Error({ code: response.status, error: data.error })
          )
        }

        const headers = {}
        for (const [key, value] of response.headers) {
          headers[key] = value
        }
        return mapKeysToCamelCase({ data, headers })
      },
      (error) => {
        throw error
      }
    )
}

export function get(path, data = {}) {
  const paramsStr = Object.keys(data).reduce(
    (str, key) =>
      `${str ? `${str}&` : ''}${toSnakeCase(key)}=${encodeURIComponent(
        data[key]
      )}`,
    ''
  )
  return request(`${path}${paramsStr ? `?${paramsStr}` : ''}`, {
    method: 'GET',
  })
}
