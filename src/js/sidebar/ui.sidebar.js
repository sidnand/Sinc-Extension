const hideAllViews = () => {
    for (let i = 0; i < DOM.allViews.length; i++) {
        DOM.allViews[i].style.display = 'none'
    }
}

// loads a view
// @param type : type of view
// @data : data that needs to be passed
const loadView = (type, data) => {
    hideAllViews()

    switch (type) {

        case 'loading':
            DOM.view.loading.style.display = 'block'
            break;

        case 'error':
            DOM.view.error.style.display = 'block'
            break;

        case 'room logon':
            DOM.view.roomLogon.style.display = 'block'
            break;

        case 'hangout area':
            DOM.text.roomname.innerHTML = `<h1>${data.roomname}</h1>`
            DOM.view.hangoutArea.style.display = 'block'
            break;

    }
}

const loadRoomLogon = () => {
    hideAllViews()
    DOM.view.roomLogon.style.display = 'block'
}

const loadHangoutArea = user => {
    hideAllViews()
    DOM.text.roomname.innerHTML = `<h1>${user.roomname}</h1>`
    DOM.view.hangoutArea.style.display = 'block'
}

// shows mic as on or off
const showMicOn = () => DOM.button.mic.style.color = 'blue'
const showMicOff = () => DOM.button.mic.style.color = '#333333'