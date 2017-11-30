import axios from 'axios'
import { setConnectionErrorModalVisible } from 'reducers/common'
import { store } from '../main'

const instance = axios.create({
  baseURL: 'http://192.168.0.101:3001/api/v1/',
  timeout: 999999999,
})

instance.interceptors.response.use(undefined, (error) => {
  if (error.message === 'Network Error') {
    store.dispatch(setConnectionErrorModalVisible(true))
  }
  return Promise.reject(error)
})

const setAuthToken = (token) => {
  instance.defaults.headers.common['X-SESSION-TOKEN'] = token
}

export default instance
export { setAuthToken }
