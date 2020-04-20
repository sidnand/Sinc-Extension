const handleServerMessage = (message, data = null) => {

    if (message === 'start sync') messageContentScript('start sync', true)
    if (message === 'update video') messageContentScript('update video', data)

    if (message === 'play') messageContentScript('play')
    if (message === 'pause') messageContentScript('pause')
    if (message === 'seek') messageContentScript('seek', data)

    // notifications sent by other users
    if (message === 'notification') messageContentScript('message', { type: 'neutral', message: data })

}