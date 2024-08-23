<template>
  <div>
    <h1>WebRTC Video Call</h1>
    <video ref="localVideo" autoplay muted></video>
    <video ref="remoteVideo" autoplay></video>
    <button @click="startCall">Start Call</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { io, Socket } from 'socket.io-client'

const localVideo = ref<HTMLVideoElement | null>(null)
const remoteVideo = ref<HTMLVideoElement | null>(null)

const socket: Socket = io('http://localhost:3001/')
let localStream: MediaStream | null = null
let peerConnection: RTCPeerConnection | null = null
let remoteUserId: string | null = null
const room = 'some-room-id' // Unique room identifier

const startCall = async () => {
  socket.emit('join', room)

  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  })

  if (localVideo.value && localStream) {
    localVideo.value.srcObject = localStream
  }

  peerConnection = new RTCPeerConnection()

  peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
    if (event.candidate && remoteUserId) {
      socket.emit('candidate', {
        target: remoteUserId,
        candidate: event.candidate
      })
    }
  }

  peerConnection.ontrack = (event: RTCTrackEvent) => {
    if (remoteVideo.value) {
      remoteVideo.value.srcObject = event.streams[0]
    }
  }

  if (localStream) {
    localStream.getTracks().forEach((track) => {
      peerConnection?.addTrack(track, localStream!)
    })
  }

  const offer = await peerConnection.createOffer()
  await peerConnection.setLocalDescription(offer)

  if (remoteUserId) {
    socket.emit('offer', { target: remoteUserId, offer: offer })
  }
}

onMounted(() => {
  socket.on('connect', () => {
    console.log('Connected to WebSocket server')
  })

  socket.on('other-users', (userId: string) => {
    console.log(userId)
    remoteUserId = userId
  })

  socket.on('offer', async (data: { from: string; offer: never }) => {
    console.log('Offer received:', data)

    if (!peerConnection) {
      peerConnection = new RTCPeerConnection()

      if (localStream) {
        localStream.getTracks().forEach((track) => {
          peerConnection?.addTrack(track, localStream!)
        })
      }

      peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
          socket.emit('candidate', {
            target: data.from,
            candidate: event.candidate
          })
        }
      }

      peerConnection.ontrack = (event: RTCTrackEvent) => {
        if (remoteVideo.value) {
          remoteVideo.value.srcObject = event.streams[0]
        }
      }
    }

    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(data.offer)
    )
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)

    socket.emit('answer', { target: data.from, answer: answer })
  })

  socket.on('answer', (data: { answer: never }) => {
    console.log('Answer received:', data)
    peerConnection?.setRemoteDescription(new RTCSessionDescription(data.answer))
  })

  socket.on('candidate', (data: { candidate: never }) => {
    console.log('Candidate received:', data)
    peerConnection?.addIceCandidate(new RTCIceCandidate(data.candidate))
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
