import * as qs from 'qs'

export function qs2json(queryString: string) {
  let rest = queryString
  const index = queryString.indexOf('?')
  if (index === -1 && queryString.substr(0, 1) === '/') {
    return {}
  } else if (index >= 0) {
    rest = queryString.substr(index + 1)
  }

  return qs.parse(rest, { allowDots: true })
}
