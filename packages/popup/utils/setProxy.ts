import { isUrl } from '@packages/popup/lib'

export type SetProxyResult = { ok: true } | { ok: false, error: string }

export const setProxy = async (pac?: string): Promise<SetProxyResult> => {
  return new Promise<SetProxyResult>((resolve) => {
    const finish = () => {
      const lastError = chrome.runtime.lastError
      if (lastError) {
        resolve({ ok: false, error: lastError.message ?? 'Unknown chrome.proxy error' })
        return
      }
      resolve({ ok: true })
    }

    try {
      if (!pac) {
        chrome.proxy.settings.clear({ scope: 'regular' }, finish)
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
        finish,
      )
    } catch (error) {
      resolve({ ok: false, error: error instanceof Error ? error.message : String(error) })
    }
  })
}
