const main = () => {

    // listen to messages from extension
    chrome.runtime.onMessage.addListener((request, sender, respond) => {
        if (request.to === 'background') {
            if (request.from === 'sidebar') { handleSidebarMessage(request, sender, respond); return true }
            if (request.from === 'contentscript') { handleContentScriptMessage(request, sender, respond); return true }
        }
    })

    // listen to messages from server
    socket.on('update video', videoID => handleServerMessage('update video', videoID))
    socket.on('start sync', videoID => handleServerMessage('start sync'))

    // syncing video itself
    socket.on('play', () => handleServerMessage('play'))
    socket.on('pause', () => handleServerMessage('pause'))
    socket.on('seek', time => handleServerMessage('seek', time))

    // notifications from the server
    socket.on('notification', notification => handleServerMessage('notification', notification));

    // chrome browser listeners
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => handleTabUpdate(tabId, changeInfo, tab))
    chrome.tabs.onRemoved.addListener((tabId, changeInfo, tab) => handleTabRemove(tabId, changeInfo, tab))

}

window.onload = main