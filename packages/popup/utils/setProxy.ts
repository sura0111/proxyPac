import { detectChrome } from '@packages/core/utils'
import browser from 'webextension-polyfill'

export const setProxy = async (pac?: string): Promise<void> => {
  const isChrome = detectChrome()

  await new Promise((resolve) => {
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
