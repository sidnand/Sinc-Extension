// loads the settings
const loadSettings = async () => {
    let s = await getStorage('settings')

    if (s !== undefined) settings = s

    let volumeFrom0To100 = settings.volume * 100
    
    DOM.input.volume.value = volumeFrom0To100

    updateVolume(volumeFrom0To100, false)
}

// updates the volume
// @param v : volume from 0 to 100
const updateVolume = (v, save = true) => {
    let vol = v / 100
    let tags = document.getElementsByTagName('audio')
    for (let i = 0; i < tags.length; i++) tags[i].volume = vol

    updateVolumeText()

    if (save) updateSetting({ volume: vol })
}

// changes the emoji on the volume text
const updateVolumeText = () => {
    if (DOM.input.volume.value < 1) DOM.text.callVolume.innerHTML = `Call Volume ${String.fromCodePoint(emojies.speaker.mute)}`
    if (DOM.input.volume.value <= 50 && DOM.input.volume.value >= 1) DOM.text.callVolume.innerHTML = `Call Volume ${String.fromCodePoint(emojies.speaker.mid)}`
    if (DOM.input.volume.value > 50) DOM.text.callVolume.innerHTML = `Call Volume ${String.fromCodePoint(emojies.speaker.load)}`
}

// updates the settings
const updateSetting = async n => {
    settings = { ...settings, ...n }

    await setStorage('settings', settings)
}