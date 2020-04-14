// sends a message to background
// @param message str : message to send
// @param data any : data to send, if any
const messageBackground = async (message, data = null) => {
    let promise = new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({
            from: 'sidebar',
            to: 'background',
            message: message,
            data: data
        }, res => resolve(res))
    })

    return await promise
}

// sends a message to content script
// @param message str : message to send
// @param data any : data to send, if any
const messageContentScript = (message, data = null) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { from: 'sidebar', to: 'contentscript', message: message, data: data })
    })
}

// gets a key from local storage
// @param key : local storage key
const getStorage = async key => {
    let promise = new Promise((resolve, reject) => chrome.storage.sync.get(['key'], result => resolve(result.key)))

    return await promise
}

// set a key to local storage
// @param data : { key, value }
const setStorage = async data => await new Promise((resolve, reject) => chrome.storage.sync.set(data, result => resolve(result.key)))
