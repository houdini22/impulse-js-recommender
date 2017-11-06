import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.0.101:3001/api/v1/',
  timeout: 999999999,
})

export default instance
