import { Server } from 'socket.io'

export default function (nuxtApp) {
  const io = new Server(nuxtApp.server)

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id)

    socket.on('offer', (data) => {
      socket.to(data.target).emit('offer', data)
    })

    socket.on('answer', (data) => {
      socket.to(data.target).emit('answer', data)
    })

    socket.on('candidate', (data) => {
      socket.to(data.target).emit('candidate', data)
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
    })
  })
}
