<template>
  <div>
    <h1>WebRTC Video Call</h1>
    <video ref="localVideo" autoplay muted></video>
    <video ref="remoteVideo" autoplay></video>
    <button @click="startCall">Start Call</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { io } from 'socket.io-client'

const localVideo = ref(null)
const remoteVideo = ref(null)
const socket = io({
  path: 'api/socket.io'
})
let localStream
let peerConnection

const startCall = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  })
  localVideo.value.srcObject = localStream

  peerConnection = new RTCPeerConnection()

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('candidate', {
        target: 'remote-peer-id',
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

  socket.emit('offer', { target: 'remote-peer-id', offer: offer })
}

socket.on('offer', async (data) => {
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
  peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer))
})

socket.on('candidate', (data) => {
  peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))
})
</script>

<style>
video {
  width: 300px;
  height: 300px;
  margin: 10px;
}
</style>
