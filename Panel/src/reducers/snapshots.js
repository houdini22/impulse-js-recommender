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
export const BUILDING_IN_PROGRESS = 'snapshots::building_in_progress'
export const APPEND_NEW_SNAPSHOT_VALUES = 'snapshots::append_new_snapshot_values'
export const CLEAR_NEW_SNAPSHOT = 'snapshots::clear_new_snapshot'
// ------------------------------------
// Actions
// ------------------------------------
export const getTables = (database_id) => (dispatch) => {
  http.get('/snapshots/get_tables', {
    params: {
      database_id
    }
  }).then((response) => {
    dispatch({ type: TABLES_FETCHED, payload: response.data.data })
  })
}

export const getRatingFields = (table_name, database_id) => (dispatch) => {
  http.get('/snapshots/get_rating_fields', {
    params: {
      table_name,
      database_id,
    }
  }).then((response) => {
    dispatch({ type: RATING_FIELDS_FETCHED, payload: response.data.data })
  })
}

export const createSnapshot = () => (dispatch, getState) => {
  const values = getState().snapshots.newSnapshot
  http.post('/snapshots/create_snapshot', values).then((response) => {
    dispatch(getIndexes())
    dispatch({ type: CLEAR_NEW_SNAPSHOT })
  })
}

export const setCreateModalStep = (value) => (dispatch) => {
  dispatch({ type: SET_CREATE_MODAL_STEP, payload: value })
}

export const getIndexes = () => (dispatch) => {
  http.get('/snapshots/get_indexes').then((response) => {
    dispatch({ type: INDEXES_LOADED, payload: response.data.data })
  })
}

export const setBuildingInProgress = (value) => (dispatch) => {
  dispatch({ type: BUILDING_IN_PROGRESS, payload: value })
}

export const buildIndex = (index_id) => (dispatch) => {
  dispatch(setBuildingInProgress(true))
  http.post('/snapshots/build_index', {
    index_id
  }).then(() => {
    dispatch(getIndexes())
    dispatch(setBuildingInProgress(false))
  })
}

export const appendNewSnapshotValues = (data) => (dispatch) => {
  dispatch({ type: APPEND_NEW_SNAPSHOT_VALUES, payload: data })
}

export const deleteIndex = (id) => (dispatch) => {
  http.delete(`/snapshots/delete/${id}`).then(() => {
    dispatch(getIndexes())
  })
}

export const actions = {
  getTables,
  getRatingFields,
  createSnapshot,
  setCreateModalStep,
  getIndexes,
  buildIndex,
  deleteIndex,
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
  },
  [BUILDING_IN_PROGRESS]: (state, { payload }) => {
    return {
      ...state,
      buildingInProgress: payload,
    }
  },
  [APPEND_NEW_SNAPSHOT_VALUES]: (state, { payload }) => {
    return {
      ...state,
      newSnapshot: { ...state.newSnapshot, ...payload }
    }
  },
  [CLEAR_NEW_SNAPSHOT]: (state) => {
    return {
      ...state,
      newSnapshot: {}
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
  indexes: [],
  buildingInProgress: false,
  newSnapshot: {}
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
