export function json2router(target, opts?) {
  opts = opts || {}

  const delimiter = opts.delimiter || '.'
  const maxDepth = opts.maxDepth
  const output = {}

  function step(object, prev?, currentDepth?) {
    currentDepth = currentDepth || 1
    Object.keys(object).forEach(key => {
      const value = object[key]
      const isArray = opts.safe && Array.isArray(value)
      const type = Object.prototype.toString.call(value)
      const isObject = type === '[object Object]' || type === '[object Array]'

      const newKey = prev ? prev + delimiter + key : key

      if (
        !isArray &&
        isObject &&
        Object.keys(value).length &&
        (!opts.maxDepth || currentDepth < maxDepth)
      ) {
        return step(value, newKey, currentDepth + 1)
      }

      output[newKey] = value
    })
  }

  step(target)

  return output
}
