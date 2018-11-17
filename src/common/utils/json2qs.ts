import * as qs from 'qs'

export function json2qs(obj: object) {
  return qs.stringify(obj, { allowDots: true })
}
