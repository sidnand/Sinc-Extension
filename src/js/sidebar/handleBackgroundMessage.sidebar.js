let handleBackgroundMessage = async (request, sender, respond) => {

    if (request.message === 'disconnected') {
        await exitCall(user)
        showMicOff()
        loadView('error')
        respond(null)
    }

}