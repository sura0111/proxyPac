import { isUrl } from '@packages/popup/lib'

export const setProxy = async (pac?: string): Promise<void> => {
  await new Promise<void>((resolve) => {
    try {
      if (!pac) {
        chrome.proxy.settings.clear({ scope: 'regular' }, resolve)
        return
      }

      chrome.proxy.settings.set(
        {
          value: {
            mode: 'pac_script',
            pacScript: {
              [isUrl(pac) ? 'url' : 'data']: pac,
              mandatory: true,
            },
          },
        },
        resolve,
      )
    } catch (error) {
      console.error(error)
      resolve()
    }
  })
}
