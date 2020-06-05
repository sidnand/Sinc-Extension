const handleServerMessage = async (message, data = null) => {

    if (message === 'new member') await messageSidebar('new member', data)
    if (message === 'remove member') await messageSidebar('remove member', data)

    if (message === 'start sync') messageContentScript('background', 'start sync', true)
    if (message === 'update video') messageContentScript('background', 'update video', data)

    // notifications sent by other users
    if (message === 'notification') messageContentScript('background', 'message', { type: 'neutral', message: data })

}