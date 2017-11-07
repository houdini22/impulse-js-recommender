import http from '../modules/http'
// ------------------------------------
// Constants
// ------------------------------------
export const LOGGED_IN = 'auth::logged_in'
export const LOGGED_OFF = 'auth::logged_off'
export const SET_LOGIN_ERROR = 'auth::set_login_error'

// ------------------------------------
// Actions
// ------------------------------------
export const loggedIn = (data) => (dispatch) => {
  dispatch({ type: LOGGED_IN, payload: data })
}

export const loggedOff = () => (dispatch) => {
  dispatch({ type: LOGGED_OFF })
}

export const setLoginError = (value) => (dispatch) => {
  dispatch({ type: SET_LOGIN_ERROR, payload: value })
}

export const login = (username, password) => (dispatch) => {
  dispatch(setLoginError(false))

  http.post('/auth/login', {
    username,
    password
  }).then((response) => {
    dispatch(loggedIn(response.data.data))
  }).catch(() => {
    dispatch(setLoginError(true))
  })
}

export const actions = {
  loggedIn,
  loggedOff
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGGED_IN]: (state, { payload }) => {
    return {
      ...state,
      isLoggedIn: true,
      user: payload,
    }
  },
  [LOGGED_OFF]: (state) => {
    return {
      ...state,
      isLoggedIn: false,
      user: null
    }
  },
  [SET_LOGIN_ERROR]: (state, { payload }) => {
    return {
      ...state,
      loginError: payload
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoggedIn: false,
  user: null,
  loginError: false,
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
