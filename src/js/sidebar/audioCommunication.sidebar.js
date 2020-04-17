let connection = new RTCMultiConnection()
let audioTag = document.createElement('audio')

connection.socketURL = url

connection.session = {
    audio: true,
    video: false
}

connection.mediaConstraints = {
    audio: true,
    video: false
}

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: false
}

connection.iceServers = [{
    'urls': [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
        'stun:stun.l.google.com:19302?transport=udp',
    ]
}]

// when stream has started
connection.onstream = async e => {
    audioTag.srcObject = e.stream
    audioTag.play()
}

// enter a call
const enterCall = async user => {
    connection.checkPresence(user.roomname, (isRoomExist, roomid) => {
        if (isRoomExist) {
            connection.join(roomid)
        } else {
            connection.open(roomid)
        }
    })

}

// exit the call
const exitCall = async user => {
    audioTag.pause()

    connection.getAllParticipants().forEach(pid => {
        connection.disconnectWith(pid)
    })

    connection.attachStreams.forEach(localStream => {
        localStream.stop()
    })
}