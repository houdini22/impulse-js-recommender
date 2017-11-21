// ------------------------------------
// Constants
// ------------------------------------
export const CONNECTION_ERROR_MODAL_VISIBLE = 'common::connection_error_modal_visible'

// ------------------------------------
// Actions
// ------------------------------------
export const setConnectionErrorModalVisible = (value) => (dispatch) => {
  dispatch({ type: CONNECTION_ERROR_MODAL_VISIBLE, payload: value })
}

export const actions = {
  setConnectionErrorModalVisible,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CONNECTION_ERROR_MODAL_VISIBLE]: (state, { payload }) => {
    return {
      ...state,
      connectionErrorModalVisible: payload,
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  connectionErrorModalVisible: false,
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
