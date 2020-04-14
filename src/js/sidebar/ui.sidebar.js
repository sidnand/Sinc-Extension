const hideAllViews = () => {
    for (let i = 0; i < DOM.allViews.length; i++) {
        DOM.allViews[i].style.display = 'none'
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