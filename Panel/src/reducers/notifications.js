import http from '../modules/http'
// ------------------------------------
// Constants
// ------------------------------------
export const NOTIFICATIONS_LOADED = 'notifications::notifications_loaded'

// ------------------------------------
// Actions
// ------------------------------------

export const setNotifications = (notifications) => (dispatch) => {
  dispatch({ type: NOTIFICATIONS_LOADED, payload: notifications })
}

export const actions = {
  setNotifications,
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [NOTIFICATIONS_LOADED]: (state, { payload }) => {
    return {
      ...payload
    }
  },
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  notifications: {},
  read: false,
}

export default function notificationsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
