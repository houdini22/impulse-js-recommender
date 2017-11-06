import http from '../modules/http'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_TABLES = 'snapshots::get_tables'
export const TABLES_FETCHED = 'snapshots::tables_fetched'
export const RATING_FIELDS_FETCHED = 'snapshots::ratings_fields_fetched'
export const SET_CREATE_MODAL_IS_VISIBLE = 'snapshots::set_create_modal_is_visible'
export const SET_CREATE_MODAL_STEP = 'snapshots::set_create_modal_step'
export const INDEXES_LOADED = 'snapshots::indexes_loaded'
export const BUILD_INDEX = 'snapshots::build_index'
// ------------------------------------
// Actions
// ------------------------------------
export const getTables = () => (dispatch) => {
  http.get('/snapshots/get_tables').then((response) => {
    dispatch({ type: TABLES_FETCHED, payload: response.data.data })
  })
}

export const getRatingFields = (table_name) => (dispatch) => {
  http.get('/snapshots/get_rating_fields', {
    params: {
      table_name
    }
  }).then((response) => {
    dispatch({ type: RATING_FIELDS_FETCHED, payload: response.data.data })
  })
}

export const createSnapshot = (values) => (dispatch) => {
  http.post('/snapshots/create_snapshot', values).then((response) => {
    dispatch(setCreateModalIsVisible(false))
    dispatch(getIndexes())
  })
}

export const setCreateModalIsVisible = (value) => (dispatch) => {
  dispatch({ type: SET_CREATE_MODAL_IS_VISIBLE, payload: value })
  if (value) {
    dispatch({ type: SET_CREATE_MODAL_STEP, payload: 1 })
  }
}

export const setCreateModalStep = (value) => (dispatch) => {
  dispatch({ type: SET_CREATE_MODAL_STEP, payload: value })
}

export const getIndexes = () => (dispatch) => {
  http.get('/snapshots/get_indexes').then((response) => {
    dispatch({ type: INDEXES_LOADED, payload: response.data.data })
  })
}

export const buildIndex = (index_id) => (dispatch) => {
  http.post('/snapshots/build_index', {
    index_id
  }).then((response) => {
    dispatch(getIndexes())
  })
}

export const actions = {
  getTables,
  getRatingFields,
  createSnapshot,
  setCreateModalIsVisible,
  setCreateModalStep,
  getIndexes,
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TABLES_FETCHED]: (state, { payload }) => {
    return {
      ...state,
      tables: payload,
    }
  },
  [RATING_FIELDS_FETCHED]: (state, { payload }) => {
    return {
      ...state,
      rating_fields: payload,
    }
  },
  [SET_CREATE_MODAL_IS_VISIBLE]: (state, { payload }) => {
    return {
      ...state,
      createModalIsVisible: payload,
    }
  },
  [SET_CREATE_MODAL_STEP]: (state, { payload }) => {
    return {
      ...state,
      createModalStep: payload,
    }
  },
  [INDEXES_LOADED]: (state, { payload }) => {
    return {
      ...state,
      indexes: payload,
    }
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  createModalIsVisible: false,
  createModalStep: 0,
  tables: [],
  rating_fields: [],
  snapshots: [],
  indexes: []
}

export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
