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
