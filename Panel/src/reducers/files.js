import _ from 'lodash'
import http from '../modules/http'
// ------------------------------------
// Constants
// ------------------------------------
export const FILES_LOADED = 'files::files_loaded'
export const SET_FILE = 'files::set_file'
export const SET_FILE_INFO = 'files::set_file_info'
// ------------------------------------
// HTTP
// ------------------------------------
export const httpGetFile = async (id) => {
  return new Promise((resolve) => {
    http.get(`/files/${id}`).then((response) => {
      resolve(response.data.data)
    })
  })
}

export const httpGetFileInfo = async (id, params) => {
  return new Promise((resolve) => {
    http.get(`/files/get_file_info/${id}`, {
      params
    }).then((response) => {
      resolve(response.data.data)
    })
  })
}

export const httpGetFilesPaginate = async (page = 0) => {
  return new Promise((resolve) => {
    http.get('/files/paginate', {
      params: {
        page
      }
    }).then((response) => {
      resolve(response.data)
    })
  })
}

export const httpDeleteFile = async (id) => {
  return new Promise((resolve) => {
    http.delete(`/files/${id}`).then(() => {
      resolve()
    })
  })
}

export const httpUploadFile = (file, fields, onUploadProgress, successCallback) => (dispatch) => {
  const data = new FormData()
  data.append('file', file)
  data.append('format', fields.format)

  const config = {
    onUploadProgress,
  }

  http.post('/files/upload', data, config).then(async (response) => {
    const uploadedFile = response.data.data
    dispatch(setFile(uploadedFile))

    const fileInfo = await httpGetFileInfo(uploadedFile.id)
    if (!_.isUndefined(fileInfo)) {
      dispatch(setFileInfo(fileInfo))
    }

    successCallback(uploadedFile)
  })
}

const httpPutFile = async (id, values) => {
  return new Promise((resolve) => {
    http.put(`/files/${id}`, values).then(() => {
      resolve()
    })
  })
}
// ------------------------------------
// Actions
// ------------------------------------

// page loaders
export const loadForEditFile = (id) => async (dispatch) => {
  dispatch(setFile({}))
  dispatch(setFileInfo({}))

  const file = await httpGetFile(id)
  if (!_.isUndefined(file)) {
    dispatch(setFile(file))
    const fileInfo = await httpGetFileInfo(file.id)
    if (!_.isUndefined(fileInfo)) {
      dispatch(setFileInfo(fileInfo))
    }
  }
}

export const loadForCreateIndex = (id) => async (dispatch) => {
  dispatch(setFile({}))
  dispatch(setFileInfo({}))

  const file = await httpGetFile(id)
  if (!_.isUndefined(file)) {
    dispatch(setFile(file))
    const fileInfo = await httpGetFileInfo(file.id, {
      snapshot: true
    })
    if (!_.isUndefined(fileInfo)) {
      dispatch(setFileInfo(fileInfo))
    }
  }
}

export const loadForFilesList = (page = 0) => async (dispatch) => {
  dispatch(setFiles({
    data: [],
    pagination: {
      totalPages: 1
    }
  }))
  httpGetFilesPaginate(page).then((files) => {
    dispatch(setFiles(files))
    dispatch(setFile({}))
    dispatch(setFileInfo({}))
  })
}

// regular actions
export const editFile = (id, values) => async (dispatch) => {
  httpPutFile(id, values).then(() => dispatch(loadForFilesList()))
}

export const removeFile = (id) => async (dispatch) => {
  httpDeleteFile(id).then(() => dispatch(loadForFilesList()))
}

// setters
export const setFile = (file) => async (dispatch) => {
  dispatch({ type: SET_FILE, payload: file })
}

export const setFileInfo = (info) => async (dispatch) => {
  dispatch({ type: SET_FILE_INFO, payload: info })
}

export const setFiles = (files) => async (dispatch) => {
  dispatch({ type: FILES_LOADED, payload: files })
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
