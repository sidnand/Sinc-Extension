// hides all views
const hideAllViews = () => {
    for (let i = 0; i < DOM.allViews.length; i++) {
        DOM.allViews[i].style.display = 'none'
    }
}

// loads a view
// @param type : type of view
// @data : data that needs to be passed to the view; if any
const loadView = (type, data) => {
    hideAllViews() // hide all view first

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

// shows mic as on or off
const showMicOn = () => DOM.button.mic.style.color = micToggleCol.on
const showMicOff = () => DOM.button.mic.style.color = micToggleCol.off