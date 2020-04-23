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
            DOM.text.roomname.innerHTML = `<h2>${data.roomname}</h2>`
            DOM.view.hangoutArea.style.display = 'block'
            break;

    }
}

// shows mic as on or off
const showMicOn = () => DOM.button.mic.style.color = micToggleCol.on
const showMicOff = () => DOM.button.mic.style.color = micToggleCol.off

// toggles the settings menu
const toggleSettings = () => {
    if (window.getComputedStyle(DOM.settingsMenu, null).getPropertyValue("pointer-events") === 'none') {
        DOM.settingsMenu.style.pointerEvents = 'all'
        DOM.settingsMenu.style.opacity = 1
        DOM.button.settings.style.transform = 'rotateZ(90deg)'
    } else if (window.getComputedStyle(DOM.settingsMenu, null).getPropertyValue("pointer-events") === 'all') {
        DOM.settingsMenu.style.pointerEvents = 'none'
        DOM.settingsMenu.style.opacity = 0
        DOM.button.settings.style.transform = 'rotateZ(0deg)'
    }
}