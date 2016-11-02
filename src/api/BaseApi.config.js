// if you want to run your server locally, change the __DEV__ line.
export const config = () => {
  if (__DEV__) {
    // change this line to the appropriate place if you want to serve from rails.
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
