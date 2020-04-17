let handleBackgroundMessage = async (request, sender, respond) => {

    if (request.message === 'disconnected') {
        exitCall()
        showMicOff()
        loadView('error')

        respond(null)
    }

}