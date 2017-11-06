// ------------------------------------
// Constants
// ------------------------------------
export const LOGGED_IN = 'user::logged_in'
export const LOGGED_OFF = 'user::logged_off'

// ------------------------------------
// Actions
// ------------------------------------
export const loggedIn = (data) => (dispatch) => {
  dispatch({ type: LOGGED_IN, payload: data })
}

export const loggedOff = () => (dispatch) => {
  dispatch({ type: LOGGED_OFF })
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
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoggedIn: false,
  user: null
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
