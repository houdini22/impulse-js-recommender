import _ from 'lodash'
import http from '../modules/http'
// ------------------------------------
// Constants
// ------------------------------------
export const QUEUE_FINISHED_LOADED = 'queue::queue_finished_loaded'
export const QUEUE_AWAITING_LOADED = 'queue::queue_awaiting_loaded'
export const QUEUE_RUNNING_LOADED = 'queue::queue_running_loaded'
export const QUEUE_SUMMARY_LOADED = 'queue::queue_sum_loaded'
// ------------------------------------
// Actions
// ------------------------------------
const fetchFinishedTasks = async (page) => {
  return new Promise((resolve) => {
    http.get('/queue/finished', {
      params: {
        page,
      }
    }).then((response) => {
      resolve(response.data)
    })
  })
}

const fetchAwaitingTasks = async (page) => {
  return new Promise((resolve) => {
    http.get('/queue/awaiting', {
      params: {
        page,
      }
    }).then((response) => {
      resolve(response.data)
    })
  })
}

const fetchRunningTasks = async (page) => {
  return new Promise((resolve) => {
    http.get('/queue/running', {
      params: {
        page,
      }
    }).then((response) => {
      resolve(response.data)
    })
  })
}

const fetchQueueTimeSummary = async () => {
  return new Promise((resolve) => {
    http.get('/queue/time_summary').then((response) => {
      resolve(response.data.data)
    })
  })
}

export const load = () => async (dispatch) => {
  const queueSum = await fetchQueueTimeSummary()
  const finishedTasks = await fetchFinishedTasks(0)
  const runningTasks = await fetchRunningTasks(0)
  const awaitingTasks = await fetchAwaitingTasks(0)
  if (!_.isUndefined(finishedTasks)) {
    dispatch({ type: QUEUE_FINISHED_LOADED, payload: finishedTasks })
  }
  if (!_.isUndefined(awaitingTasks)) {
    dispatch({ type: QUEUE_AWAITING_LOADED, payload: awaitingTasks })
  }
  if (!_.isUndefined(runningTasks)) {
    dispatch({ type: QUEUE_RUNNING_LOADED, payload: runningTasks })
  }
  if (!_.isUndefined(queueSum)) {
    dispatch({ type: QUEUE_SUMMARY_LOADED, payload: queueSum })
  }
}

export const loadFinishedTasks = (page) => async (dispatch) => {
  const finishedTasks = await fetchFinishedTasks(page)
  if (!_.isUndefined(finishedTasks)) {
    dispatch({ type: QUEUE_FINISHED_LOADED, payload: finishedTasks })
  }
}

export const loadRunningTasks = (page) => async (dispatch) => {
  const runningTasks = await fetchRunningTasks(page)
  if (!_.isUndefined(runningTasks)) {
    dispatch({ type: QUEUE_RUNNING_LOADED, payload: runningTasks })
  }
}

export const loadAwaitingTasks = (page) => async (dispatch) => {
  const awaitingTasks = await fetchAwaitingTasks(page)
  if (!_.isUndefined(awaitingTasks)) {
    dispatch({ type: QUEUE_AWAITING_LOADED, payload: awaitingTasks })
  }
}

export const actions = {
  load,
  loadFinishedTasks,
  loadRunningTasks,
  loadAwaitingTasks
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [QUEUE_AWAITING_LOADED]: (state, { payload }) => {
    return {
      ...state,
      queueAwaiting: payload,
    }
  },
  [QUEUE_FINISHED_LOADED]: (state, { payload }) => {
    return {
      ...state,
      queueFinished: {
        queueFinished: payload.data,
        paginationFinished: payload.pagination
      }
    }
  },
  [QUEUE_RUNNING_LOADED]: (state, { payload }) => {
    return {
      ...state,
      queueRunning: {
        queueRunning: payload.data,
        paginationRunning: payload.pagination
      }
    }
  },
  [QUEUE_AWAITING_LOADED]: (state, { payload }) => {
    return {
      ...state,
      queueAwaiting: {
        queueAwaiting: payload.data,
        paginationAwaiting: payload.pagination
      }
    }
  },
  [QUEUE_SUMMARY_LOADED]: (state, { payload }) => {
    return {
      ...state,
      queueTimeSummary: payload
    }
  }
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  queueFinished: {
    queueFinished: [],
    paginationFinished: {
      totalPages: 1
    }
  },
  queueAwaiting: {
    queueAwaiting: [],
    paginationAwaiting: {
      totalPages: 1
    }
  },
  queueRunning: {
    queueRunning: [],
    paginationRunning: {
      totalPages: 1
    }
  },
  queueTimeSummary: {}
}

export default function queueReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
