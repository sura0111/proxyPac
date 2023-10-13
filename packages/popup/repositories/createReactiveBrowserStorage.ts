import browser from 'webextension-polyfill'
import { browserStorageReactive } from '@packages/popup/reactives'
import { type BrowserStorageKey } from '@packages/popup/constants'
import { computed } from 'vue'
import { type BrowserStorage } from '../definitions/browser'

export const createReactiveBrowserStorage = async <
  T extends BrowserStorageKey,
  D extends BrowserStorage[T] | undefined = BrowserStorage[T] | undefined,
>(
  key: T,
  options?: {
    defaultValue?: D
    onChange?: (value: D) => void
  },
) => {
  const storage = computed<D>({
    get: () => {
      return (browserStorageReactive[key] ?? options?.defaultValue) as D
    },
    set: async (value) => {
      browserStorageReactive[key] = value
      await browser.storage.sync.set({ [key]: value })
    },
  })

  const initialValue = (((await browser.storage.sync.get(key)) as { [key in T]: D })[key] ?? options?.defaultValue) as D
  browserStorageReactive[key] = initialValue
  options?.onChange?.(initialValue)

  browser.storage.sync.onChanged.addListener((changes) => {
    if (changes[key] !== undefined) {
      const value = (changes[key].newValue ?? options?.defaultValue) as D
      browserStorageReactive[key] = value
      options?.onChange?.(value)
    }
  })

  return storage
}
