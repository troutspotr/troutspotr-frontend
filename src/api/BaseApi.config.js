export const config = () => {
  if (__DEV__) {
    return {
      apiRoot: ''
    }
  }

  if (__TEST__) {
    return {
      apiRoot: '/'
    }
  }

  return {
    apiRoot: '/'
  }
}
