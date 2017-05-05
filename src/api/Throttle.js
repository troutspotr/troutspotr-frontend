var isNode = typeof global !== 'undefined' &&
    ({}).toString.call(global) === '[object global]'

const throttleReduce = async (ops) => {
  if (isNode) {
    let allPromises = ops.map(x => { return Promise.resolve(x()) })
    let result = await Promise.all(allPromises)
    return result
  }

  let resolvedResults = []
  for (let i = 0; i < ops.length; i++) {
    let op = ops[i]
    let result = await waitForNext(op.bind(null, i))
    resolvedResults.push(result)
  }
  return resolvedResults
}

function waitForNext (op) {
  return new Promise((resolve, reject) => {
    requestAnimationFrame(() => {
      try {
        let result = op()
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = {
  throttleReduce
}
