<template>
  <div>
    <h1>WebRTC Video Call</h1>
    <video ref="localVideo" autoplay muted></video>
    <video ref="remoteVideo" autoplay></video>
    <button @click="startCall">Start Call</button>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { io } from 'socket.io-client'

const localVideo = ref(null)
const remoteVideo = ref(null)

const socket = io('http://localhost:3001/')
let localStream
let peerConnection
let room = 'some-room-id' // Уникальный идентификатор комнаты

const startCall = async () => {
  socket.emit('join', room)

  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  })
  localVideo.value.srcObject = localStream

  peerConnection = new RTCPeerConnection()

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('candidate', {
        target: remoteUserId,
        candidate: event.candidate
      })
    }
  }

  peerConnection.ontrack = (event) => {
    remoteVideo.value.srcObject = event.streams[0]
  }

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream)
  })

  const offer = await peerConnection.createOffer()
  await peerConnection.setLocalDescription(offer)

  socket.emit('offer', { target: remoteUserId, offer: offer })
}

let remoteUserId

onMounted(() => {
  socket.on('connect', () => {
    console.log('Connected to WebSocket server')
  })

  socket.on('other-users', (userId) => {
    console.log(userId)
    remoteUserId = userId
  })

  socket.on('offer', async (data) => {
    console.log('Offer received:', data)
    if (!peerConnection) {
      peerConnection = new RTCPeerConnection()

      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
      })

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('candidate', {
            target: data.from,
            candidate: event.candidate
          })
        }
      }

      peerConnection.ontrack = (event) => {
        remoteVideo.value.srcObject = event.streams[0]
      }
    }

    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(data.offer)
    )
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)

    socket.emit('answer', { target: data.from, answer: answer })
  })

  socket.on('answer', (data) => {
    console.log('Answer received:', data)
    peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer))
  })

  socket.on('candidate', (data) => {
    console.log('Candidate received:', data)
    peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))
  })
})
</script>

<style>
video {
  width: 300px;
  height: 300px;
  margin: 10px;
}
</style>