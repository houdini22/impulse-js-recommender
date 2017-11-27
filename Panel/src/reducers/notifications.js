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

export const markAsRead = () => (dispatch) => {
  http.post('/notifications/mark_as_read').then((response) => {
    dispatch(setNotifications(response.data.data))
  })
}

export const actions = {
  setNotifications,
  markAsRead,
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
