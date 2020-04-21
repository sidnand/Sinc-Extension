let handleBackgroundMessage = async (request, sender, respond) => {

    // if user disconnected from the server side
    if (request.message === 'disconnected') {
        let user = await messageBackground('get user')
        await exitCall(user)
        showMicOff()
        loadView('error')
        respond(null)
    }

}