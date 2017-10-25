export const config = () => {
  if (__DEV__) {
    return {'apiRoot': '', version: 'v3' }
  }

  if (__TEST__) {
    return {'apiRoot': '/', version: 'v3' }
  }

  return {'apiRoot': '/', version: 'v3' }
}
