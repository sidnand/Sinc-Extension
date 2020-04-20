const DOM = {
    button: {
        createRoom: document.querySelector('#btn-create-room'),
        joinRoom: document.querySelector('#btn-join-room'),
        leaveRoom: document.querySelector('#btn-leave-room'),
        mic: document.querySelector('#btn-mic')
    },
    input: {
        name: document.querySelector('#input-membername'),
        roomname: document.querySelector('#input-roomname')
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
    allViews: document.querySelectorAll('.view')
}

const micToggleCol = { on: 'blue', off: '#333333' }