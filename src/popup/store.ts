import Vue, { PluginObject } from 'vue'
import { KEY } from '@/constants'
import axios from 'axios'
import setProxy from '@/utils/setProxy'

type Pac = { name: string; url?: string }
type Pacs = Pac[]

const privateState = Vue.observable<{ pacs: Pacs; pac: Pac }>({
  pacs: [],
  pac: { name: KEY.systemDefault },
})

/**
 *****************
 * State         *
 *****************
 */
const state = Vue.observable<{ isReady: boolean; pacs: Pacs; pac: Pac }>({
  isReady: false,

  get pacs() {
    return privateState.pacs
  },

  set pacs(value) {
    privateState.pacs = value
    chrome.storage.sync.set({ [KEY.pacs]: value })
  },

  get pac() {
    return privateState.pac
  },

  set pac(value) {
    privateState.pac = value
    chrome.storage.sync.set({ [KEY.pac]: value })
    setProxy(value.url).then(() => chrome.tabs.reload())
  },
})

/**
 *****************
 * Getter        *
 *****************
 */
const getter = Vue.observable<{
  sortedPacs: Pacs
  hasPac: (name: string) => boolean
  getPacIndex: (name: string) => number | null
}>({
  get sortedPacs(): Pacs {
    return state.pacs.sort((a, b) => (a.name > b.name ? 1 : -1))
  },

  get hasPac() {
    return (name: string): boolean => !!state.pacs.find((pac) => pac.name === name)
  },

  get getPacIndex() {
    return (name: string): number | null => {
      const index = state.pacs.findIndex((pac) => pac.name === name)
      return index === -1 ? null : index
    }
  },
})

/**
 *****************
 * Store        *
 *****************
 */
const store = {
  state,
  getter,
  getPacValue: async (url: string) => {
    const isUrl = /^https?:\/\/.+$/.test(url)
    return isUrl ? ((await axios.get(url)).data as string) : url
  },
  addPac: async ({ name, url }: { name: string; url: string }) => {
    if (store.getter.hasPac(name)) {
      return
    }
    state.pacs = [...state.pacs, { name, url }]
  },
  editPac: async ({ name, url }: { name: string; url: string }, oldData?: { name?: string | null }) => {
    if (oldData?.name && name !== oldData.name) {
      const deleteIndex = getter.getPacIndex(oldData.name)

      if (deleteIndex !== null) {
        const pacs = state.pacs.slice()
        pacs.splice(deleteIndex, 1)
        if (!pacs.find((pac) => pac.name === name)) {
          pacs.push({ name, url })
        }
        state.pacs = pacs
      }
      return
    }

    const index = getter.getPacIndex(name)
    if (index === null) {
      return
    }
    const newPacs = state.pacs.slice()
    newPacs.splice(index, 1, { name, url })
    state.pacs = newPacs
  },
  deletePac(name: string) {
    const index = getter.getPacIndex(name)
    if (index === null) {
      return
    }
    const newPacs = state.pacs.slice()
    newPacs.splice(index, 1)
    state.pacs = newPacs
  },
}

/**
 *****************
 * Plugin        *
 *****************
 */
export const storePlugin: PluginObject<Vue> = {
  install(Vue) {
    Vue.$s = store
    Vue.prototype.$s = store
  },
}

/**
 *****************
 * Chrome        *
 *****************
 */
chrome.storage.sync.get((items) => {
  const pacs: Pacs = items[KEY.pacs] ?? []
  const pac: Pac = items[KEY.pac] ?? { name: KEY.systemDefault }
  privateState.pacs = pacs
  privateState.pac = pac
  state.isReady = true
})

chrome.storage.onChanged.addListener((changes) => {
  if (changes[KEY.pacs] !== undefined) {
    privateState.pacs = changes[KEY.pacs].newValue ?? []
  }
  if (changes[KEY.pac] !== undefined) {
    privateState.pac = changes[KEY.pac].newValue ?? { name: KEY.systemDefault }
  }
})

export default store
