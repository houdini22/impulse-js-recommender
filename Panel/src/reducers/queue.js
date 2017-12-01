import _ from 'lodash'
import http from '../modules/http'
// ------------------------------------
// Constants
// ------------------------------------
export const QUEUE_FINISHED_LOADED = 'queue::queue_finished_loaded'
export const QUEUE_AWAITING_LOADED = 'queue::queue_awaiting_loaded'
export const QUEUE_RUNNING_LOADED = 'queue::queue_running_loaded'
export const QUEUE_SUMMARY_LOADED = 'queue::queue_sum_loaded'
export const QUEUE_SET_PART_IS_LOADING = 'queue::queue_set_part_is_loading'
// ------------------------------------
// Actions
// ------------------------------------
const setQueuePartIsLoading = (name, value) => async (dispatch) => {
  dispatch({
    type: QUEUE_SET_PART_IS_LOADING,
    payload: {
      name,
      value
    }
  })
}
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
  dispatch(setQueuePartIsLoading('time_summary', true))
  dispatch(setQueuePartIsLoading('finished_tasks', true))
  dispatch(setQueuePartIsLoading('running_tasks', true))
  dispatch(setQueuePartIsLoading('awaiting_tasks', true))

  const queueSum = await fetchQueueTimeSummary()
  if (!_.isUndefined(queueSum)) {
    dispatch({ type: QUEUE_SUMMARY_LOADED, payload: queueSum })
    dispatch(setQueuePartIsLoading('time_summary', false))
  }

  const finishedTasks = await fetchFinishedTasks(0)
  if (!_.isUndefined(finishedTasks)) {
    dispatch({ type: QUEUE_FINISHED_LOADED, payload: finishedTasks })
    dispatch(setQueuePartIsLoading('finished_tasks', false))
  }

  const runningTasks = await fetchRunningTasks(0)
  if (!_.isUndefined(runningTasks)) {
    dispatch({ type: QUEUE_RUNNING_LOADED, payload: runningTasks })
    dispatch(setQueuePartIsLoading('running_tasks', false))
  }

  const awaitingTasks = await fetchAwaitingTasks(0)
  if (!_.isUndefined(awaitingTasks)) {
    dispatch({ type: QUEUE_AWAITING_LOADED, payload: awaitingTasks })
    dispatch(setQueuePartIsLoading('awaiting_tasks', false))
  }
}

export const loadFinishedTasks = (page) => async (dispatch) => {
  dispatch(setQueuePartIsLoading('finished_tasks', true))
  const finishedTasks = await fetchFinishedTasks(page)
  if (!_.isUndefined(finishedTasks)) {
    dispatch({ type: QUEUE_FINISHED_LOADED, payload: finishedTasks })
    dispatch(setQueuePartIsLoading('finished_tasks', false))
  }
}

export const loadRunningTasks = (page) => async (dispatch) => {
  dispatch(setQueuePartIsLoading('running_tasks', true))
  const runningTasks = await fetchRunningTasks(page)
  if (!_.isUndefined(runningTasks)) {
    dispatch({ type: QUEUE_RUNNING_LOADED, payload: runningTasks })
    dispatch(setQueuePartIsLoading('running_tasks', false))
  }
}

export const loadAwaitingTasks = (page) => async (dispatch) => {
  dispatch(setQueuePartIsLoading('awaiting_tasks', true))
  const awaitingTasks = await fetchAwaitingTasks(page)
  if (!_.isUndefined(awaitingTasks)) {
    dispatch({ type: QUEUE_AWAITING_LOADED, payload: awaitingTasks })
    dispatch(setQueuePartIsLoading('awaiting_tasks', false))
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
  },
  [QUEUE_SET_PART_IS_LOADING]: (state, { payload: { name, value } }) => {
    const loadingParts = state.loadingParts
    loadingParts[name] = value
    return {
      ...state,
      loadingParts
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
  queueTimeSummary: {},
  loadingParts: {},
}

export default function queueReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
