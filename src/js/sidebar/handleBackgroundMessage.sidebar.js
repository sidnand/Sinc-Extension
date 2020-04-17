let handleBackgroundMessage = async (request, sender, respond) => {

    if (request.message === 'disconnected') {
        showMicOff()
        loadView('error')
        respond(null)
    }

}