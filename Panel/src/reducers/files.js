import http from '../modules/http'
// ------------------------------------
// Constants
// ------------------------------------
export const FILES_LOADED = 'files::files_loaded'
export const SET_UPLOADED_FILE = 'files::set_uploaded_file'
export const SET_UPLOADED_FILE_INFO = 'files::set_uploaded_file_info'
// ------------------------------------
// Actions
// ------------------------------------
export const getFiles = (page = 0) => (dispatch) => {
  http.get('/files', {
    params: {
      page
    }
  }).then((response) => {
    dispatch({ type: FILES_LOADED, payload: response.data })
  })
}

export const createFile = (values) => (dispatch, getState) => {
  http.post('/files', values).then((response) => {
    dispatch(getFiles())
  })
}

export const updateFile = (values) => (dispatch) => {
  http.put('/files', values).then((response) => {
    dispatch(getFiles())
  })
}

export const deleteFile = (id) => (dispatch) => {
  http.delete(`/files/${id}`).then(() => {
    dispatch(getFiles())
  })
}

export const setUploadedFile = (data) => (dispatch) => {
  dispatch({ type: SET_UPLOADED_FILE, payload: data })
}

export const uploadFile = (file, fields, onUploadProgress, successCallback) => (dispatch) => {
  const data = new FormData()
  data.append('file', file)
  data.append('format', fields.format)
  const config = {
    onUploadProgress,
  }
  http.post('/files/upload', data, config).then((response) => {
    dispatch(setUploadedFile(response.data.data))
    successCallback(response.data.data)
  })
}

export const setUploadedFileInfo = (data) => (dispatch) => {
  dispatch({ type: SET_UPLOADED_FILE_INFO, payload: data })
}

export const getFileInfo = (token) => (dispatch) => {
  http.get('/files/get_file_info', {
      params: {
        token
      }
    }
  ).then((response) => {
    dispatch(setUploadedFileInfo(response.data.data))
  })
}

export const actions = {
  getFiles,
  createFile,
  updateFile,
  deleteFile,
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FILES_LOADED]: (state, { payload }) => {
    return {
      ...state,
      files: payload.data,
      pagination: payload.pagination
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
  files: [],
  uploadedFile: null,
  pagination: {
    totalPages: 1
  }
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
