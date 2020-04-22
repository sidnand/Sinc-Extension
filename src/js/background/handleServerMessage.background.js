const handleServerMessage = (message, data = null) => {

    if (message === 'start sync') messageContentScript('background', 'start sync', true)
    if (message === 'update video') messageContentScript('background', 'update video', data)

    // notifications sent by other users
    if (message === 'notification') messageContentScript('background', 'message', { type: 'neutral', message: data })

}