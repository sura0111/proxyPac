import IsChrome from './isChrome'

const setProxy = (pac?: string): Promise<void> => {
  const isChrome = IsChrome()
  return new Promise((resolve) => {
    try {
      if (!pac) {
        if (isChrome) {
          chrome.proxy.settings.clear({ scope: 'regular' }, resolve)
        } else {
          browser.proxy.settings
            .set({
              value: {
                proxyType: 'system',
              },
            })
            .then(resolve)
            .catch((error) => {
              console.log(error)
              resolve()
            })
        }
        return
      }

      const isUrl = /^https?:\/\/.+$/.test(pac)

      if (isChrome) {
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
        browser.proxy.settings
          .set({
            value: {
              proxyType: 'autoConfig',
              autoConfigUrl: pac,
            },
          })
          .then(resolve)
          .catch((error) => {
            console.log(error)
            resolve()
          })
      }
    } catch (error) {
      console.log(error)
      resolve()
    }
  })
}

export default setProxy
