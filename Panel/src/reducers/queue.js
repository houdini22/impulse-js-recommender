import http from '../modules/http'
// ------------------------------------
// Constants
// ------------------------------------
export const QUEUE_LOADED = 'queue::queue_loaded'

// ------------------------------------
// Actions
// ------------------------------------

export const getQueue = () => (dispatch) => {
  http.get('/queue').then((response) => {
    dispatch({ type: QUEUE_LOADED, payload: response.data.data })
  })
}

export const actions = {
  getQueue,
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [QUEUE_LOADED]: (state, { payload }) => {
    return {
      ...state,
      queue: payload,
    }
  },
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  queue: [],
}

export default function queueReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
