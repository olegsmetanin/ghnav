import * as qs from 'qs'

export function qs2json(queryString: string) {
  const index = queryString.indexOf('?')
  let trimmed = queryString
  if (index >= 0) {
    trimmed = queryString.substr(index + 1)
  }
  return qs.parse(trimmed)
}
