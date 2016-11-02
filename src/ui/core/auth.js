// import { push } from 'react-router-redux'

class AuthService {

  setStore (s) {
    store = s
  }

  requireAuth (nextState, replace) {
    if (!loggedIn()) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }

  deleteToken () {
    delete localStorage.token
    // store.dispatch(push('/login'))
  }

  getToken () {
    return fetchToken()
  }

}
var auth = new AuthService()

var fetchToken = function () {
  if (store && store.getState().auth && store.getState().auth.access_token) {
    return store.getState().auth
  } else {
    return false
  }
}

var loggedIn = function () {
  var state = store.getState()
  return (state && state.auth && state.auth.access_token)
}

var store = null

export default function authService () {
  return auth
}
