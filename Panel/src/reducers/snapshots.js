import http from '../modules/http'
import { httpGetFileInfo } from './files'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_TABLES = 'snapshots::get_tables'
export const TABLES_FETCHED = 'snapshots::tables_fetched'
export const RATING_FIELDS_FETCHED = 'snapshots::ratings_fields_fetched'
export const SET_CREATE_MODAL_IS_VISIBLE = 'snapshots::set_create_modal_is_visible'
export const SET_CREATE_MODAL_STEP = 'snapshots::set_create_modal_step'
export const SNAPSHOTS_LOADED = 'snapshots::indexes_loaded'
export const BUILD_INDEX = 'snapshots::build_index'
export const BUILDING_IN_PROGRESS = 'snapshots::building_in_progress'
export const APPEND_NEW_SNAPSHOT_VALUES = 'snapshots::append_new_snapshot_values'
export const CLEAR_NEW_SNAPSHOT = 'snapshots::clear_new_snapshot'
export const SET_UPLOADED_FILE = 'snapshots::set_uploaded_file'
export const SET_UPLOADED_FILE_INFO = 'snapshots::set_uploaded_file_info'

// ------------------------------------
// Actions
// ------------------------------------
export const getTables = (databaseId) => (dispatch) => {
  http.get('/snapshots/get_tables', {
    params: {
      databaseId
    }
  }).then((response) => {
    dispatch({ type: TABLES_FETCHED, payload: response.data })
  })
}

export const getRatingFields = (table_name, databaseId) => (dispatch) => {
  http.get('/snapshots/get_rating_fields', {
    params: {
      table_name,
      databaseId,
    }
  }).then((response) => {
    dispatch({ type: RATING_FIELDS_FETCHED, payload: response.data.data })
  })
}

export const createSnapshot = () => (dispatch, getState) => {
  const values = getState().snapshots.newSnapshot
  http.post('/snapshots', values).then((response) => {
    dispatch(getSnapshots())
    dispatch({ type: CLEAR_NEW_SNAPSHOT })
  })
}

export const setCreateModalStep = (value) => (dispatch) => {
  dispatch({ type: SET_CREATE_MODAL_STEP, payload: value })
}

export const getSnapshots = (page = 0) => (dispatch) => {
  dispatch({ type: SNAPSHOTS_LOADED, payload: { data: [], pagination: { totalPages: 1 } } })
  http.get('/snapshots', {
    params: {
      page
    }
  }).then((response) => {
    dispatch({ type: SNAPSHOTS_LOADED, payload: response.data })
  })
}

export const setBuildingInProgress = (value) => (dispatch) => {
  dispatch({ type: BUILDING_IN_PROGRESS, payload: value })
}

export const buildIndex = (indexId) => (dispatch) => {
  dispatch(setBuildingInProgress(true))
  http.post('/snapshots/build_index', {
    id: indexId
  }).then(() => {
    dispatch(getSnapshots())
    dispatch(setBuildingInProgress(false))
  })
}

export const appendNewSnapshotValues = (data) => (dispatch) => {
  dispatch({ type: APPEND_NEW_SNAPSHOT_VALUES, payload: data })
}

export const deleteIndex = (id) => (dispatch) => {
  http.delete(`/snapshots/${id}`).then(() => {
    dispatch(getSnapshots())
  })
}

export const setUploadedFile = (data) => (dispatch) => {
  dispatch({ type: SET_UPLOADED_FILE, payload: data })
}

export const httpUploadFile = (file, fields, onUploadProgress, successCallback) => (dispatch) => {
  const data = new FormData()
  data.append('file', file)
  data.append('format', fields.format)
  const config = {
    onUploadProgress,
  }
  http.post('/snapshots/upload', data, config).then((response) => {
    dispatch(setUploadedFile(response.data.data))
    successCallback(response.data.data)
  })
}

export const setUploadedFileInfo = (data) => (dispatch) => {
  dispatch({ type: SET_UPLOADED_FILE_INFO, payload: data })
}

export const getFileInfo = (id, params) => async (dispatch) => {
  const fileInfo = await httpGetFileInfo(id, params)
  dispatch(setUploadedFileInfo(fileInfo))
}

export const actions = {
  getTables,
  getRatingFields,
  createSnapshot,
  setCreateModalStep,
  getSnapshots,
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
  [SNAPSHOTS_LOADED]: (state, { payload }) => {
    return {
      ...state,
      indexes: payload.data,
      pagination: payload.pagination
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
  },
  [SET_UPLOADED_FILE]: (state, { payload }) => {
    return {
      ...state,
      uploadedFile: payload
    }
  },
  [SET_UPLOADED_FILE_INFO]: (state, { payload }) => {
    return {
      ...state,
      uploadedFileInfo: payload
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
  newSnapshot: {},
  uploadedFile: null,
  uploadedFileInfo: null,
  pagination: {
    totalPages: 1
  }
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
