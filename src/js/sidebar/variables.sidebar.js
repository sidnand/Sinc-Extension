const DOM = {
    button: {
        createRoom: document.querySelector('#btn-create-room'),
        joinRoom: document.querySelector('#btn-join-room'),
        leaveRoom: document.querySelector('#btn-leave-room'),
        generateRoomname: document.querySelector('#btn-generate-roomname'),
        mic: document.querySelector('#btn-mic'),
        settings: document.querySelector('#btn-setting')
    },
    input: {
        name: document.querySelector('#input-membername'),
        roomname: document.querySelector('#input-roomname'),

        volume: document.querySelector('#input-volume')
    },
    text: {
        roomname: document.querySelector('#roomname')
    },
    view: {
        loading: document.querySelector('#view-loading'),
        error: document.querySelector('#view-error'),
        roomLogon: document.querySelector('#view-logon'),
        hangoutArea: document.querySelector('#view-hangout')
    },
    allViews: document.querySelectorAll('.view'),
    settingsMenu: document.querySelector('#settings-menu')
}

let audioTag = document.createElement('audio')
const micToggleCol = { on: 'blue', off: '#333333' }
let settings = {
    volume: 1
}