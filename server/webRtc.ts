import { defineEventHandler } from 'h3'
import { Server } from 'socket.io'

export default defineEventHandler(async (event) => {
  const io = new Server(event)

  io.on('connection', (socket): void => {
    socket.on('call', (signal): void => {
      socket.broadcast.emit('answer', signal)
    })
  })
})
