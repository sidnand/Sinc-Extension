// loads the settings
const loadSettings = async () => {
    let s = await getStorage('settings')

    if (s !== undefined) settings = s
}

// updates the settings
const updateSetting = async n => {
    settings = { ...settings, ...n }

    await setStorage('settings', settings)
}