const setProxy = (pac?: string): Promise<void> => {
  return new Promise((resolve) => {
    if (!pac) {
      if (typeof chrome !== 'undefined') {
        chrome.proxy.settings.clear({ scope: 'regular' }, resolve)
      } else {
        browser.proxy.settings.clear({ scope: 'regular' }).then(resolve)
      }
      return
    }

    const isUrl = /^https?:\/\/.+$/.test(pac)

    if (typeof chrome !== 'undefined') {
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
    } else if (isUrl) {
      browser.proxy.settings.set({
        value: {
          proxyType: 'autoConfig',
          autoConfigUrl: pac,
        },
      })
    }
  })
}

export default setProxy
