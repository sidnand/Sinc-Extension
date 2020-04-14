let handleSidebarMessage = (request, sender, respond) => {

    if (request.message === 'get user') respond(user)

    if (request.message === 'notification') {
        socket.emit('notification', { roomname: user.roomname, notification: request.data })
        respond(true)
    }

    if (request.message === 'update user') {
        let data = request.data

        user = { ...user, ...data }
        respond(user)
    }

    if (request.message === 'create room' || request.message === 'join room') { processCreateOrJoinRoom(request.message, request.data, respond); return true }

    if (request.message === 'leave room') processLeaveRoom(respond); return true

}

const processCreateOrJoinRoom = async (message, data, respond) => {

    let isInVideo = await isUserInVideo()

    // check if user is in a video
    if (isInVideo) {
        if (message === 'create room') respond({ type: 'error', message: `Please exit video before creating a room` })
        if (message === 'join room') respond({ type: 'error', message: `Please exit video before joining a room` })
    } else if (!isInVideo) {
        if (message === 'create room') socket.emit('create room', data, response => respond(response))
        if (message === 'join room') socket.emit('join room', data, response => respond(response))
    }

    return true

}

const processLeaveRoom = async respond => {
    if (user.roomname !== null) {
        respond({ type: 'neutral', message: `Successfully left ${user.roomname}` })
        socket.emit('leave room', user.roomname)

        user = { // data about the user
            roomname: null,
            name: null,
            mic: false,
            tabID: null
        }
    }

    respond(null)
}