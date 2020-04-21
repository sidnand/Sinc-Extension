const main = async () => {
    
    // check if user is in room and inital ui for that room
    await initalSetup()

    // listen for messages from the extension
    chrome.runtime.onMessage.addListener((request, sender, respond) => {
        if (request.to === 'sidebar') {
            if (request.from === 'background') { handleBackgroundMessage(request, sender, respond); return true }
        }
    })

    // dom event listeners
    DOM.button.createRoom.addEventListener('click', () => createOrJoinRoom('create room'))
    DOM.button.joinRoom.addEventListener('click', () => createOrJoinRoom('join room'))
    DOM.button.leaveRoom.addEventListener('click', leaveRoom)
    DOM.button.generateRoomname.addEventListener('click', generateRoomname)

    DOM.button.mic.addEventListener('click', toggleMic)

}

// sets up sidebar when it's loaded
let initalSetup = async () => {
    let user = await messageBackground('get user')

    // check if user was on a call
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
// @param serverMessage string : message to send to server; whether to creare room or join room
const createOrJoinRoom = async serverMessage => {
    let text = {
        roomname: DOM.input.roomname.value,
        name: DOM.input.name.value
    }

    // check if username is empty or not
    if (text.name.length <= 0) messageContentScript('message', { type: 'error', message: 'Please input your name' })
    // check if roomname is empty or not
    else if (text.roomname.length <= 0) messageContentScript('message', { type: 'error', message: 'Please input a room name' })
    else {
        DOM.input.roomname.value = ''
        DOM.input.name.value = ''
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

const generateRoomname = async () => {
    let roomname = await messageBackground('generate roomname') // send request to background

    DOM.input.roomname.value = roomname
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