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
        roomLogon: document.querySelector('#view-logon'),
        hangoutArea: document.querySelector('#view-hangout')
    },
    allViews: document.querySelectorAll('.view')
}