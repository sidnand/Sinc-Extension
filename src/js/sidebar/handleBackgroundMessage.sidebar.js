let handleBackgroundMessage = async (request, sender, respond) => {

    // if user disconnected from the server side
    if (request.message === 'disconnected') {
        await exitCall(user)
        showMicOff()
        loadView('error')
        respond(null)
    }

}