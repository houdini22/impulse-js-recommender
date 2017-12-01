import _ from 'lodash'
import http from '../modules/http'
// ------------------------------------
// Constants
// ------------------------------------
export const FILES_LOADED = 'files::files_loaded'
export const SET_UPLOADED_FILE = 'files::set_uploaded_file'
export const SET_UPLOADED_FILE_INFO = 'files::set_uploaded_file_info'
export const SET_FILE = 'files::set_file'
export const SET_FILE_INFO = 'files::set_file_info'
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

export const deleteFile = (id) => (dispatch) => {
  http.delete(`/files/${id}`).then(() => {
    dispatch(getFiles())
  })
}

export const uploadFile = (file, fields, onUploadProgress, successCallback) => (dispatch) => {
  const data = new FormData()
  data.append('file', file)
  data.append('format', fields.format)
  const config = {
    onUploadProgress,
  }
  http.post('/files/upload', data, config).then(async (response) => {
    const uploadedFile = response.data.data;
    dispatch(setFile(uploadedFile))
    const fileInfo = await fetchFileInfo(uploadedFile.id)
    if (!_.isUndefined(fileInfo)) {
      dispatch(setFileInfo(fileInfo))
    }
    successCallback(uploadedFile)
  })
}

export const setUploadedFileInfo = (data) => (dispatch) => {
  dispatch({ type: SET_UPLOADED_FILE_INFO, payload: data })
}

const fetchFile = async (id) => {
  return new Promise((resolve) => {
    http.get(`/files/${id}`).then((response) => {
      resolve(response.data.data)
    })
  })
}

export const fetchFileInfo = async (id) => {
  return new Promise((resolve) => {
    http.get('/files/get_file_info', {
        params: {
          id
        }
      }
    ).then((response) => {
      resolve(response.data.data)
    })
  })
}

export const setFile = (file) => async (dispatch) => {
  dispatch({ type: SET_FILE, payload: file })
}

export const setFileInfo = (info) => async (dispatch) => {
  dispatch({ type: SET_FILE_INFO, payload: info })
}

export const loadEditFile = (id) => async (dispatch) => {
  const file = await fetchFile(id)
  if (!_.isUndefined(file)) {
    dispatch(setFile(file))
    const fileInfo = await fetchFileInfo(file.id)
    if (!_.isUndefined(fileInfo)) {
      dispatch(setFileInfo(fileInfo))
    }
  }
}

const putFile = async (id, values) => {
  return new Promise((resolve) => {
    http.put(`/files/${id}`, values).then((response) => {
      resolve()
    })
  })
}

export const editFile = (id, values) => async (dispatch) => {
  await putFile(id, values)
  dispatch(getFiles())
  dispatch(setFile({}))
  dispatch(setFileInfo({}))
}

export const actions = {
  getFiles,
  editFile,
  deleteFile,
  loadEditFile,
  uploadFile,
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
  },
  [SET_FILE]: (state, { payload }) => {
    return {
      ...state,
      file: payload
    }
  },
  [SET_FILE_INFO]: (state, { payload }) => {
    return {
      ...state,
      fileInfo: payload
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
  },
  file: {},
  fileInfo: {}
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
