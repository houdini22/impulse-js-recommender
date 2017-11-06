import io from 'socket.io-client'
import config from '../config'

const socket = io(config.socket.address, {
  autoConnect: false
})

export default socket
