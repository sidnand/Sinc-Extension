let handleContentScriptMessage = (request, sender, respond) => {

    if (request.message === 'set tab id') user.tabID = sender.tab.id

    if (request.message === 'user is setup') {
        if (user.roomname !== null) socket.emit('update setup count', user.roomname)
        else if (user.roomname == null) messageContentScript('start sync', false)
    }

    if (user.roomname !== null) {
        if (request.message === 'play') socket.emit('play', user.roomname)
        if (request.message === 'pause') socket.emit('pause', user.roomname)
        if (request.message === 'seek') socket.emit('seek', user.roomname, request.data)
    }

}