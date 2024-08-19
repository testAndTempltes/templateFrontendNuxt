<template>
  <div>
    <video ref="localVideo" autoplay muted></video>
    <video ref="remoteVideo" autoplay></video>
    <input v-model="roomId" placeholder="Room ID" />
    <button @click="joinRoom">Join Room</button>
    <button @click="createRoom">Create Room</button>
    <button @click="endCall">End Call</button>
  </div>
</template>

<script lang="js">
export default {
  data() {
    return {
      localStream: null,
      remoteStream: null,
      peerConnection: null,
      roomId: '',
      signalingSocket: null
    }
  },
  methods: {
    async joinRoom() {
      this.signalingSocket = new WebSocket('ws://localhost:8080') // Укажите ваш WebSocket сервер
      this.signalingSocket.onmessage = this.handleSignalMessage

      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      this.$refs.localVideo.srcObject = this.localStream

      this.createPeerConnection()
    },

    async createRoom() {
      this.signalingSocket = new WebSocket('ws://localhost:8080') // Укажите ваш WebSocket сервер
      this.signalingSocket.onmessage = this.handleSignalMessage

      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      this.$refs.localVideo.srcObject = this.localStream

      this.createPeerConnection()
      this.peerConnection.createOffer().then(offer => {
        return this.peerConnection.setLocalDescription(offer)
      }).then(() => {
        this.signalingSocket.send(JSON.stringify({
          type: 'offer',
          sdp: this.peerConnection.localDescription,
          roomId: this.roomId
        }))
      })
    },

    handleSignalMessage(message) {
      const data = JSON.parse(message.data)
      if (data.roomId !== this.roomId) return

      if (data.type === 'offer') {
        this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp))
        this.peerConnection.createAnswer().then(answer => {
          return this.peerConnection.setLocalDescription(answer)
        }).then(() => {
          this.signalingSocket.send(JSON.stringify({
            type: 'answer',
            sdp: this.peerConnection.localDescription,
            roomId: this.roomId
          }))
        })
      } else if (data.type === 'answer') {
        this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp))
      } else if (data.candidate) {
        this.peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))
      }
    },

    createPeerConnection() {
      this.peerConnection = new RTCPeerConnection()

      this.localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, this.localStream)
      })

      this.peerConnection.onicecandidate = event => {
        if (event.candidate) {
          this.signalingSocket.send(JSON.stringify({
            candidate: event.candidate,
            roomId: this.roomId
          }))
        }
      }

      this.peerConnection.ontrack = event => {
        this.remoteStream = event.streams[0]
        this.$refs.remoteVideo.srcObject = this.remoteStream
      }
    },

    endCall() {
      this.peerConnection.close()
      this.signalingSocket.close()
      this.localStream.getTracks().forEach(track => track.stop())
    }
  }
}
</script>

<style scoped lang="scss"></style>
