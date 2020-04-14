const extensionOrigin = 'chrome-extension://' + chrome.runtime.id, // extension url
    sidebarURL = 'src/index.html' // path to sidebar html

const detectScripts = {
    netflix: 'src/js/contentscript/netflix.detect.contentscript.js'
}

const main = () => {
    
    // listen for messages
    window.addEventListener("message", request => {
        // ensure message is from this site
        if (request.source != window)
            return

        // check if from detect script
        if (request.data.from === 'detectscript') chrome.runtime.sendMessage({ from: 'contentscript', to: request.data.to, message: request.data.message, data: request.data.data }) // send message

    })

    // get messages from extension
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.to === 'contentscript') {

            if (request.message === 'message') message(request.data.type, request.data.message)

            if (request.from === 'sidebar') {
                // close the sidebar
                // if (request.message === 'close sidebar') location.href = "javascript:hideSidebar(); void 0";
            }

            if (request.from === 'background') {
                // if (request.message === 'roomname') location.href = `javascript:initalize('${request.data}'); void 0`;
                if (request.message === 'start sync') location.href = `javascript:startSync(${request.data}); void 0`

                if (request.message === 'update video') location.href = `javascript:updateVideo(${request.data}); void 0`;

                if (request.message === 'play') location.href = "javascript:play(); void 0";
                if (request.message === 'pause') location.href = "javascript:pause(); void 0";
                if (request.message === 'seek') location.href = `javascript:seek(${request.data}); void 0`;
            }

        }
    })

    // Inject scripts
    // ensure this script is from our extension
    if (!location.ancestorOrigins.contains(extensionOrigin)) {
        // check detection script
        let host = window.location.hostname
        let name = host.substring(
            host.indexOf(".") + 1,
            host.lastIndexOf(".")
        )

        if (!isInjected(detectScripts[name]), 'script') injectScript(detectScripts[name])
        if (!isInjected(sidebarURL, 'iframe')) injectSidebar()
    }

}

// injects the sidebar
const injectSidebar = () => {
    let iframe = document.createElement('iframe')
    iframe.id = 'sidebar'

    iframe.style.zIndex = "9000000000000000000";
    iframe.frameBorder = "none";
    iframe.setAttribute('allow', 'microphone, camera')
    iframe.src = chrome.extension.getURL(sidebarURL)

    document.body.appendChild(iframe)
}

// checks if a tag with url is injected
// @param url string : url of script
// @param tag string : tag to check url of
// @returns boolean, whether or not tag is injected
const isInjected = (url, tag) => {
    let tags = document.getElementsByTagName(tag)
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].src === chrome.extension.getURL(url)) return true
    }

    return false
}

// injects a js script
// @param url string : url of script
const injectScript = url => {
    var th = document.getElementsByTagName('body')[0]
    var s = document.createElement('script')
    s.setAttribute('type', 'text/javascript')
    s.setAttribute('src', chrome.extension.getURL(url))
    th.appendChild(s)
}

// shows a message
// @param message string : message
const message = (type, message) => {
    let config = {
        text: message,
        duration: 3000,
        gravity: 'top',
        classes: "toast"
    }

    if (type === 'success') {
        let toast = Toastify({
            ...config,
            backgroundColor: "green"
        })

        toast.showToast()
    }

    if (type === 'error') {
        let toast = Toastify({
            ...config,
            backgroundColor: "red"
        })

        toast.showToast()
    }

    if (type === 'neutral') {
        let toast = Toastify(config)

        toast.showToast()
    }
}

window.onload = main