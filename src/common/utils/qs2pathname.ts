export function qs2pathname(queryString: string) {
  const res = queryString === '' ? '/' : queryString
  const index = res.indexOf('?')
  return index >= 0 ? res.substr(0, index) : res
}
