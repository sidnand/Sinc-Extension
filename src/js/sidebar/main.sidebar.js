const main = async () => {

    await initalSetup()

    chrome.runtime.onMessage.addListener((request, sender, respond) => {
        if (request.to === 'sidebar') {
            if (request.from === 'background') { handleBackgroundMessage(request, sender, respond); return true }
        }
    })

    DOM.button.createRoom.addEventListener('click', () => createOrJoinRoom('create room'))
    DOM.button.joinRoom.addEventListener('click', () => createOrJoinRoom('join room'))
    DOM.button.leaveRoom.addEventListener('click', leaveRoom)

    DOM.button.mic.addEventListener('click', toggleMic)

}

// sets up sidebar when it's loaded
let initalSetup = async () => {
    let user = await messageBackground('get user')

    if (user.mic) {
        await enterCall(user)
        showMicOn()
    } else if (!user.mic) {
        await exitCall(user)
        showMicOff()
    }

    // load the correct room
    if (user.roomname === null) {
        loadView('room logon')
    } else if (user.roomname !== null) {
        loadView('hangout area', user)
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
    let user = await messageBackground('get user')
    let response = await messageBackground('leave room') // send request to leave room

    if (response !== null) {
        messageContentScript('message', { type: response.type, message: response.message }) // send response message
        await exitCall(user)
        showMicOff()
        loadView('room logon')
    }
}

// toggles the mic
const toggleMic = async () => {
    let user = await messageBackground('get user')

    if (!user.mic) {
        await enterCall(user)
        await messageBackground('update user', { mic: true })
        showMicOn()
    } else if (user.mic) {
        await exitCall(user)
        await messageBackground('update user', { mic: false })
        showMicOff()
    }
}

window.onload = main