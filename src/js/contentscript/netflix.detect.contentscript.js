const netflixVideoURL = 'netflix.com/watch/'
const config = { attributes: false, childList: true, subtree: true } // for mutantobserver

let videoPlayer, sessionId, player, videoTag
let fromServer = false
let targetNode; // node that will get observed

const main = () => {
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
    if (window.location.href.includes(netflixVideoURL)) {
        console.log('Waiting for video tag...')

        document.getElementById('appMountPoint').style.opacity = 0

        // waits till video tag exists
        let wait = setInterval(function() {
            if (document.getElementsByTagName('video')[0] != undefined) {
                console.log('Video tag loaded')
                videoTag = document.getElementsByTagName('video')[0]
                clearInterval(wait)

                // get cadium player
                videoPlayer = netflix.appContext.state.playerApp.getAPI().videoPlayer
                sessionId = videoPlayer.getAllPlayerSessionIds()[0]
                player = videoPlayer.getVideoPlayerBySessionId(sessionId)

                console.log('Got cadium player')
                console.log('User is setup, sending message...')

                player.pause()
                player.seek(0)

                window.postMessage({ from: 'detectscript', to: 'background', message: 'user is setup' }) // send message that inital sync is done

            }
        }, 100)
    }
    // exit sync
    // else if (!window.location.href.includes(netflixVideoURL)) exitVideoSync()
}

let startSync = isInRoom => {
    if (!isInRoom) {
        document.getElementById('appMountPoint').style.opacity = 1
    } else if (isInRoom) {
        console.log('All users are setup, starting video...')

        document.getElementById('appMountPoint').style.opacity = 1

        player.play()

        // video listeners
        videoTag.addEventListener('play', () => { if (!fromServer) window.postMessage({ from: 'detectscript', to: 'background', message: 'play' }) })
        videoTag.addEventListener('pause', () => { if (!fromServer) window.postMessage({ from: 'detectscript', to: 'background', message: 'pause' }) })
        videoTag.addEventListener('seeking', () => { if (!fromServer) window.postMessage({ from: 'detectscript', to: 'background', message: 'seek', data: player.getCurrentTime() }) })
    }
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
let updateVideo = id => window.location.href = `https://netflix.com/watch/${id}`

main()