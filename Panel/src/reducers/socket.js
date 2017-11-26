import { connect as connectSocket, getSocket } from '../modules/socket'

// ------------------------------------
// Constants
// ------------------------------------
export const CONNECTED = 'socket::connected'
export const DISCONNECTED = 'socket::disconnected'

const connected = () => (dispatch) => {
  dispatch({ type: CONNECTED })
}

const disconnected = () => (dispatch) => {
  dispatch({ type: DISCONNECTED })
}

let socket = null

// ------------------------------------
// Actions
// ------------------------------------
export const connect = (token) => async (dispatch, getState) => {
  connectSocket(token)
  socket = getSocket()

  socket.off('connect')
  socket.off('disconnect')

  socket.on('connect', () => {
    dispatch(connected())
  })
  socket.on('disconnect', () => {
    dispatch(disconnected())
  })
}

export const actions = {
  connect,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CONNECTED]: (state) => {
    return {
      ...state,
      connected: true
    }
  },
  [DISCONNECTED]: (state) => {
    return {
      ...state,
      connected: false
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  connected: false,
}

export default function socketReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
