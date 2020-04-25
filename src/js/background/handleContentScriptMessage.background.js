let handleContentScriptMessage = (request, sender, respond) => {

    // sets the tab id
    if (request.message === 'set tab id') user.tabID = sender.tab.id
    // increament user watching int on server
    if (request.message === 'toggle user watching') {
        // if user is in a room, send to server plus tell content script to initalize the script
        if (user.roomname !== null) {
            socket.emit('toggle user watching', user.roomname, request.data)
            messageContentScript('background', 'initalize sync')
        }
    }
    // when this user's video is loaded
    if (request.message === 'user is setup') {
        if (user.roomname !== null) socket.emit('update setup count', user.roomname)
    }

    if (user.roomname !== null) {
        if (request.message === 'play') socket.emit('play', user.roomname)
        if (request.message === 'pause') socket.emit('pause', user.roomname)
        if (request.message === 'seek') socket.emit('seek', user.roomname, request.data)
    }

}