let audioConnection = new RTCMultiConnection()
let audioTag = document.createElement('audio')

audioConnection.socketURL = url

audioConnection.session = {
    audio: true,
    video: false
}

audioConnection.mediaConstraints = {
    audio: true,
    video: false
}

audioConnection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: false
}

audioConnection.iceServers = [{
    'urls': [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
        'stun:stun.l.google.com:19302?transport=udp',
    ]
}]

audioConnection.onstream = function (event) {
    if (event.userid !== audioConnection.userid) {
        audioTag.srcObject = event.stream
        audioTag.play()
    }
}

let enterCall = user => {
    let roomname = user.roomname

    audioConnection.checkPresence(roomname, async function (roomExists, roomname) {
        if (roomExists) {
            audioConnection.join(roomname)
            messageContentScript('message', { type: 'success', message: "You've entered the call" })
            await messageBackground('notification', `${user.name} has entered the call`)
        } else {
            audioConnection.open(roomname)
            messageContentScript('message', { type: 'success', message: "You've entered the call" })
            await messageBackground('notification', `${user.name} has entered the call`)
        }
    })
}

let exitCall = async user => {
    audioTag.pause()

    audioConnection.getAllParticipants().forEach(function (pid) {
        audioConnection.disconnectWith(pid)
    })

    audioConnection.attachStreams.forEach(function (localStream) {
        localStream.stop()
    })

    audioConnection.closeSocket()

    messageContentScript('message', { type: 'neutral', message: "You've left the call" })
    await messageBackground('notification', `${user.name} has left the call`)
}
