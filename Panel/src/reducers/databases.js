import http from '../modules/http'
// ------------------------------------
// Constants
// ------------------------------------
export const DATABASES_LOADED = 'databases::databases_loaded'
export const SET_CREATE_MODAL_IS_VISIBLE = 'databases::set_create_modal_is_visible'
// ------------------------------------
// Actions
// ------------------------------------
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

export const actions = {
  getDatabases,
  setCreateModalIsVisible,
  createDatabase
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
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  databases: [],
  createModalIsVisible: false,
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
