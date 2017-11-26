import io from 'socket.io-client'

let socket = null

const connect = (token) => {
  socket = io('http://localhost:5000/', {
    query: {
      token,
    }
  })
  socket.connect()
}

const getSocket = () => {
  return socket
}

export {
  connect,
  getSocket,
}
