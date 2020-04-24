// loads the settings
const loadSettings = async () => {
    let s = await getStorage('settings')

    if (s !== undefined) settings = s

    audioTag.volume = settings.volume
    DOM.input.volume.value = settings.volume * 100

    updateVolumeText()
}

// updates the volume
// @param v : volume from 0 to 100
const updateVolume = v => {
    let vol = v / 100
    audioTag.volume = vol

    updateVolumeText()

    updateSetting({ volume: vol })
}

// changes the emoji on the volume text
const updateVolumeText = () => {
    if (DOM.input.volume.value == 0) DOM.text.callVolume.innerHTML = `Call Volume ${String.fromCodePoint(emojies.speaker.mute)}`
    if (DOM.input.volume.value < 50 && DOM.input.volume.value != ) DOM.text.callVolume.innerHTML = `Call Volume ${String.fromCodePoint(emojies.speaker.mid)}`
    if (DOM.input.volume.value >= 50) DOM.text.callVolume.innerHTML = `Call Volume ${String.fromCodePoint(emojies.speaker.load)}`
}

// updates the settings
const updateSetting = async n => {
    settings = { ...settings, ...n }

    await setStorage('settings', settings)
}