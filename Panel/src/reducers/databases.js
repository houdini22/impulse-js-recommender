import http from '../modules/http'
// ------------------------------------
// Constants
// ------------------------------------
export const DATABASES_LOADED = 'databases::databases_loaded'
export const SET_CREATE_MODAL_IS_VISIBLE = 'databases::set_create_modal_is_visible'
export const SET_CONNECTION_STATUS = 'databases::set_connection_status'
// ------------------------------------
// Actions
// ------------------------------------
export const setConnectionStatus = (value) => (dispatch) => {
  dispatch({ type: SET_CONNECTION_STATUS, payload: value })
}

export const setCreateModalIsVisible = (value) => (dispatch) => {
  dispatch({ type: SET_CREATE_MODAL_IS_VISIBLE, payload: value })
}

export const getDatabases = () => (dispatch) => {
  http.get('/databases').then((response) => {
    dispatch({ type: DATABASES_LOADED, payload: response.data.data })
  })
}

export const createDatabase = (values) => (dispatch, getState) => {
  http.post('/databases', values).then((response) => {
    dispatch(setCreateModalIsVisible(false))
    dispatch(getDatabases())
  })
}

export const deleteDatabase = (id) => (dispatch) => {
  http.delete(`/databases/${id}`).then(() => {
    dispatch(getDatabases())
  })
}

export const testCurrentConnection = (params) => (dispatch) => {
  http.post('/databases/test', params).then((response) => {
    dispatch(setConnectionStatus({
      status: 1,
      message: ''
    }))
  }).catch((err) => {
    console.log(err.response)
    dispatch(setConnectionStatus({
      status: -1,
      message: err.response.data.message
    }))
  })
}

export const actions = {
  getDatabases,
  setCreateModalIsVisible,
  createDatabase,
  deleteDatabase,
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DATABASES_LOADED]: (state, { payload }) => {
    return {
      ...state,
      databases: payload,
    }
  },
  [SET_CREATE_MODAL_IS_VISIBLE]: (state, { payload }) => {
    return {
      ...state,
      createModalIsVisible: payload,
    }
  },
  [SET_CONNECTION_STATUS]: (state, { payload }) => {
    return {
      ...state,
      connectionStatus: payload,
    }
  },
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  databases: [],
  createModalIsVisible: false,
  connectionStatus: {
    status: 0,
    message: ''
  },
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
