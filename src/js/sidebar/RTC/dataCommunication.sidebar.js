// updates everyones videos
// play / pause --> 'play' / 'pause'
// seek --> { seek: time }
const send = message => connection.send(message)

// when user recieves a message
connection.onmessage = e => {
    console.log(e.data)
}