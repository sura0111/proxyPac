import { KEY } from '@/constants'
import { pacConfig } from '@/popup/reactives/pacConfig'
import setProxy from '@/utils/setProxy'
import { reactive } from '@vue/composition-api'
import { Pac } from '../definitions/pac'
import { detect } from 'detect-browser'

const currentBrowser = detect()
console.log(currentBrowser?.name)
const isChrome = currentBrowser?.name === 'chrome'
const storage = isChrome ? chrome.storage : browser.storage
const tabs = isChrome ? chrome.tabs : browser.tabs

export const usePacRepository = () => {
  const config = reactive({
    get isReady() {
      return pacConfig.isReady
    },
    set isReady(value) {
      pacConfig.isReady = value
    },
    get pacs() {
      return pacConfig.pacs
    },
    set pacs(value) {
      pacConfig.pacs = value
      storage.sync.set({ [KEY.pacs]: value })
    },

    get pac() {
      return pacConfig.pac
    },

    set pac(value) {
      pacConfig.pac = value
      storage.sync.set({ [KEY.pac]: value })
      setProxy(value.url).then(() => tabs.reload())
    },
  })

  const initialize = async () => {
    if (isChrome) {
      chrome.storage.sync.get((items) => {
        const pacs: Pac[] = items[KEY.pacs] ?? []
        const pac: Pac = items[KEY.pac] ?? { name: KEY.systemDefault }
        pacConfig.pacs = pacs
        pacConfig.pac = pac
        pacConfig.isReady = true
      })
    } else {
      console.log(browser)
      try {
        const items = await browser.storage.sync.get()
        const pacs: Pac[] = items[KEY.pacs] ?? []
        const pac: Pac = items[KEY.pac] ?? { name: KEY.systemDefault }
        pacConfig.pacs = pacs
        pacConfig.pac = pac
      } catch (error) {
        console.log(error)
        pacConfig.pacs = []
        pacConfig.pac = { name: KEY.systemDefault }
      }
      pacConfig.isReady = true
    }

    console.log(pacConfig)

    storage.onChanged.addListener((changes) => {
      if (changes[KEY.pacs] !== undefined) {
        pacConfig.pacs = changes[KEY.pacs].newValue ?? []
      }
      if (changes[KEY.pac] !== undefined) {
        pacConfig.pac = changes[KEY.pac].newValue ?? { name: KEY.systemDefault }
      }
    })
  }

  return {
    config,
    initialize,
  }
}
