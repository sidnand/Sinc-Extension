const main = async () => {

    await initalSetup()

    DOM.button.createRoom.addEventListener('click', () => createOrJoinRoom('create room'))
    DOM.button.joinRoom.addEventListener('click', () => createOrJoinRoom('join room'))
    DOM.button.leaveRoom.addEventListener('click', leaveRoom)

    DOM.button.mic.addEventListener('click', toggleMic)

}

// sets up sidebar when it's loaded
let initalSetup = async () => {
    let user = await messageBackground('get user')

    // load the correct room
    if (user.roomname === null) {
        loadView('room logon')
    } else if (user.roomname !== null) {
        loadView('hangout area', user)
    }

    if (user.mic) {
        showMicOn()
        enterCall(user.roomname)
    } else if (!user.mic) {
        showMicOff()
    }
}

// creates or joins user to room
// @param serverMessage : message to send to server
const createOrJoinRoom = async serverMessage => {
    let text = {
        roomname: DOM.input.roomname.value,
        name: DOM.input.name.value
    }

    // check if room name is empty or not
    if (text.name.length <= 0) messageContentScript('message', { type: 'error', message: 'Please input your name' })
    else if (text.roomname.length <= 0) messageContentScript('message', { type: 'error', message: 'Please input a room name' })
    else {
        loadView('loading')
        // send to background and wait for a response
        let response = await messageBackground(serverMessage, { roomname: text.roomname, name: text.name })
        messageContentScript('message', { type: response.type, message: response.message }) // send response message

        // if success load new section
        if (response.type === 'success') {
            // update user data and get back user
            let user = await messageBackground('update user', { roomname: response.data, name: text.name })
            // update sidebar
            loadView('hangout area', user)
            DOM.input.roomname.value = ''
            DOM.input.name.value = ''
        } else if (response.type === 'error') loadView('room logon')
    }
}

// removes user from the room
const leaveRoom = async () => {
    let response = await messageBackground('leave room') // send request to leave room

    if (response !== null) {
        exitCall()
        messageContentScript('message', { type: response.type, message: response.message }) // send response message
        showMicOff()
        loadView('room logon')
    }
}

// toggles the mic
const toggleMic = async () => {
    let user = await messageBackground('get user')
    messageContentScript('message', { type: 'neutral', message: 'Please wait...' }) // send response message

    if (!user.mic) {
        await messageBackground('update user', { mic: true })
        showMicOn()
        enterCall(user)
    } else if (user.mic) {
        await messageBackground('update user', { mic: false })
        showMicOff()
        exitCall(user)
    }
}

window.onload = main