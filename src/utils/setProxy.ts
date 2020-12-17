const setProxy = (pac?: string): Promise<void> => {
  return new Promise((resolve) => {
    if (!pac) {
      chrome.proxy.settings.clear({ scope: 'regular' }, resolve)
      return
    }
    const isUrl = /^https?:\/\/.+$/.test(pac)
    chrome.proxy.settings.set(
      {
        value: {
          mode: 'pac_script',
          pacScript: {
            [isUrl ? 'url' : 'data']: pac,
            mandatory: true,
          },
        },
      },
      resolve,
    )
  })
}

export default setProxy
