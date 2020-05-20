const netflixVideoURL = 'netflix.com/watch/'
const config = { attributes: false, childList: true, subtree: true } // for mutantobserver

const videoContainerSelector = '.NFPlayer' // container for fullscreen videos

let videoPlayer, sessionId, player, videoTag
let fromServer = false
let targetNode; // node that will get observed

let fullscreen = false

const main = () => {
    document.addEventListener("fullscreenchange", changeNotificationOverlay)

    window.postMessage({ from: 'detectscript', to: 'background', message: 'set tab id' })

    locationChange()

    // create new event handler when url is changed
    window.addEventListener('popstate', () => {
        window.dispatchEvent(new Event('locationchange'))
    })

    // on url change, check the url
    window.addEventListener('locationchange', checkURL)

    // check url when injected
    checkURL()
}

const checkURL = async () => {
    // if on video
    if (window.location.href.includes(netflixVideoURL)) window.postMessage({ from: 'detectscript', to: 'background', message: 'toggle user watching', data: true })

    // exit sync
    else if (!window.location.href.includes(netflixVideoURL)) window.postMessage({ from: 'detectscript', to: 'background', message: 'toggle user watching', data: false })
}

let initalizeSync = isInRoom => {
    if (isInRoom) {
        document.getElementById('appMountPoint').style.opacity = 0.1
        showLoader()
        window.postMessage({ from: 'detectscript', to: 'contentscript', message: 'notification', data: 'Waiting for video' })
        console.log('Waiting for video tag')

        // waits till video tag exists
        let wait = setInterval(function () {
            if (document.getElementsByTagName('video')[0] != undefined) {
                videoTag = document.getElementsByTagName('video')[0]
                clearInterval(wait)

                // get cadium player
                videoPlayer = netflix.appContext.state.playerApp.getAPI().videoPlayer
                sessionId = videoPlayer.getAllPlayerSessionIds()[0]
                player = videoPlayer.getVideoPlayerBySessionId(sessionId)

                player.pause()

                window.postMessage({ from: 'detectscript', to: 'contentscript', message: 'notification', data: 'Video has loaded, waiting for others' })
                console.log('Video tag loaded')
                window.postMessage({ from: 'detectscript', to: 'background', message: 'user is setup' }) // send message that inital sync is done

            }
        }, 100)
    }
}

let startSync = () => {
    window.postMessage({ from: 'detectscript', to: 'contentscript', message: 'notification', data: 'Everyone is setup, starting video' })
    console.log('All users have joined. starting video')
    player.seek(0)

    // video listeners
    videoTag.addEventListener('play', () => { if (!fromServer) window.postMessage({ from: 'detectscript', to: 'sidebar', message: 'play' }) })
    videoTag.addEventListener('pause', () => { if (!fromServer) window.postMessage({ from: 'detectscript', to: 'sidebar', message: 'pause' }) })
    videoTag.addEventListener('seeking', () => { if (!fromServer) window.postMessage({ from: 'detectscript', to: 'sidebar', message: 'seek', data: player.getCurrentTime() }) })

    removeLoader()
    document.getElementById('appMountPoint').style.opacity = 1
}

const play = () => {
    if (player !== undefined) {
        fromServer = true
        player.play()

        let wait = setInterval(function() {
            if (player.isPlaying()) {
                fromServer = false
                clearInterval(wait)
            }
        }, 10)
    }
}

const pause = () => {
    if (player !== undefined) {
        fromServer = true
        player.pause()

        let wait = setInterval(function() {
            if (player.isPaused()) {
                fromServer = false
                clearInterval(wait)
            }
        }, 10)
    }
}

const seek = time => { if (player !== undefined) player.seek(time) }

// changes the parent container for toastify
const changeNotificationOverlay = () => {
    if (fullscreen) {
        window.postMessage({ from: 'detectscript', to: 'contentscript', message: 'change toastify selector', data: 'body' })
        fullscreen = false
    } else if (!fullscreen) {
        window.postMessage({ from: 'detectscript', to: 'contentscript', message: 'change toastify selector', data: videoContainerSelector })
        fullscreen = true
    }
}

// setup event handler for location change detection
const locationChange = () => {
    history.pushState = (f => function pushState() {
        var ret = f.apply(this, arguments)
        window.dispatchEvent(new Event('pushstate'))
        window.dispatchEvent(new Event('locationchange'))
        return ret
    })(history.pushState)

    history.replaceState = (f => function replaceState() {
        var ret = f.apply(this, arguments)
        window.dispatchEvent(new Event('replacestate'))
        window.dispatchEvent(new Event('locationchange'))
        return ret
    })(history.replaceState)
}

// updates the current video
// @param id : video id
const updateVideo = id => window.location.href = `https://netflix.com/watch/${id}`

main()