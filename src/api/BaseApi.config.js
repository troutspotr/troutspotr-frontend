export const config = () => {
  if (__DEV__) {
    return { 'apiRoot': '', version: 'v4' }
  }

  if (__TEST__) {
    return { 'apiRoot': '/', version: 'v4' }
  }

  return { 'apiRoot': '/', version: 'v4' }
}
