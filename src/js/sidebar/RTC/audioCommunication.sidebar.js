connection.mediaConstraints = {
    audio: true,
    video: false
}

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: false
}

// when stream has started
connection.onstream = async e => {
    if (e.userid !== connection.userid) {
        audioTag.srcObject = e.stream
        audioTag.play()
    }
}

// enter a call
const enterCall = async () => {
    let promise = new Promise((resolve, reject) => {
        connection.addStream({
            audio: true,
            streamCallback: async stream => {
                let user = await messageBackground('get user')
                resolve(stream)
            }
        })
    })

    return await promise
}

// exit the call
const exitCall = async () => {
    connection.streamEvents.selectAll({
        local: true
    }).forEach(function (streamEvent) {
        streamEvent.stream.getAudioTracks()[0].stop()
    })

    let user = await messageBackground('get user')
}