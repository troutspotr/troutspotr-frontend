const isNode = typeof global !== 'undefined' && {}.toString.call(global) === '[object global]'

export const throttleReduce = async ops => {
  if (isNode) {
    const allPromises = ops.map(x => Promise.resolve(x()))
    const result = await Promise.all(allPromises)
    return result
  }

  const resolvedResults = []
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i]
    const result = await waitForNext(op.bind(null, i))
    resolvedResults.push(result)
  }
  return resolvedResults
}

function waitForNext(op) {
  return new Promise((resolve, reject) => {
    requestAnimationFrame(() => {
      try {
        const result = op()
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  })
}
