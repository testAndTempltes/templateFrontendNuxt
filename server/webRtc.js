import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

let users = {}

io.on('connection', (socket) => {
  console.log('New user connected:', socket.id)

  // Пользователь присоединяется к комнате
  socket.on('join', (room) => {
    socket.join(room)
    users[socket.id] = room
    console.log(`${socket.id} joined room ${room}`)

    const otherUsers = Object.keys(users).filter(
      (id) => id !== socket.id && users[id] === room
    )

    if (otherUsers.length > 0) {
      // Уведомить остальных пользователей, что новый участник подключился
      io.to(socket.id).emit('other-users', otherUsers[0])
    }
  })

  // Отправка оффера
  socket.on('offer', (data) => {
    io.to(data.target).emit('offer', {
      from: socket.id,
      offer: data.offer
    })
  })

  // Отправка ответа
  socket.on('answer', (data) => {
    io.to(data.target).emit('answer', {
      from: socket.id,
      answer: data.answer
    })
  })

  // Отправка ICE-кандидата
  socket.on('candidate', (data) => {
    io.to(data.target).emit('candidate', {
      from: socket.id,
      candidate: data.candidate
    })
  })

  // Отключение пользователя
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
    delete users[socket.id]
  })
})

server.listen(3001, () => {
  console.log('Server is running on port 3001')
})
