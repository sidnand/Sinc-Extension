// loads the settings
const loadSettings = async () => {
    let s = await getStorage('settings')

    if (s !== undefined) {
        settings = s

        audioTag.volume = settings.volume
        DOM.input.volume.value = settings.volume * 100
    } else if (s === undefined) {
        audioTag.volume = settings.volume
        DOM.input.volume.value = settings.volume * 100
    }
}

// updates the volume
// @param v : volume from 0 to 100
const updateVolume = v => {
    let vol = v / 100
    audioTag.volume = vol

    updateSetting({ volume: vol })
}

// updates the settings
const updateSetting = async n => {
    settings = { ...settings, ...n }

    await setStorage('settings', settings)
}