import { computed } from 'vue'
import axios from 'axios'
import { createReactiveBrowserStorage } from '@packages/popup/lib'
import { BrowserStorageKey } from '@packages/popup/constants'
import { setProxy } from '@packages/popup/utils'
import browser from 'webextension-polyfill'
import { Pac } from '@packages/popup/types'

export const usePacService = async () => {
  const defaultPac: Pac = { name: null }
  const pacs = await createReactiveBrowserStorage(BrowserStorageKey.pacs, {
    defaultValue: [] as Pac[],
  })

  const pac = await createReactiveBrowserStorage(BrowserStorageKey.pac, { defaultValue: <Pac>{ name: null } })

  const sortedPacs = computed(() => {
    const sortedPacs = [...pacs.value].sort((a, b) => {
      if (!a.name) {
        return 1
      }
      if (!b.name) {
        return -1
      }
      return a.name > b.name ? 1 : -1
    })

    return sortedPacs
  })

  const hasPac = (name?: string | undefined | null): boolean => !!pacs.value.find((pac) => pac.name === name)

  const getPacIndex = (name: Pac['name']): number | null => {
    const index = pacs.value.findIndex((pac) => pac.name === name)
    return index === -1 ? null : index
  }

  const getPacValue = async (value?: string | undefined) => {
    if (!value) {
      return ''
    }

    const isUrl = /^https?:\/\/.+$/.test(value)
    const isChromeUrl = /^chrome-extension:\/\/.+$/.test(value)

    return isUrl || isChromeUrl ? ((await axios.get(value, { timeout: 6000 })).data as string) : value
  }

  const addPac = async (pac: Pac) => {
    if (hasPac(pac.name)) {
      return
    }
    pacs.value = [...pacs.value, pac]
  }

  const editPac = async (newPac: Pac, oldData?: Pac) => {
    if (oldData?.name && newPac.name !== oldData.name) {
      const deleteIndex = getPacIndex(oldData.name)

      if (deleteIndex !== null) {
        const temp = pacs.value.slice()

        temp.splice(deleteIndex, 1)
        if (!temp.find((pac) => pac.name === newPac.name)) {
          temp.push(newPac)
        }

        pacs.value = temp
      }
      return
    }

    const index = getPacIndex(newPac.name)
    if (index === null) {
      return
    }
    const newPacs = pacs.value.slice()
    newPacs.splice(index, 1, newPac)
    pacs.value = newPacs
  }

  const deletePac = (name: string) => {
    const index = getPacIndex(name)
    if (index === null) {
      return
    }
    const newPacs = pacs.value.slice()
    newPacs.splice(index, 1)
    pacs.value = newPacs
  }

  const usePac = async (value: Pac, skipProxyUpdate = false) => {
    if (pac.value.name !== value.name) {
      pac.value = value
    }
    if (!skipProxyUpdate) {
      await setProxy(value.name ? value.value ?? value.url ?? undefined : undefined)
      browser.tabs.reload()
    }
  }

  return {
    defaultPac,
    sortedPacs,
    pac,
    pacs,
    hasPac,
    getPacIndex,
    getPacValue,
    usePac,
    addPac,
    editPac,
    deletePac,
  }
}
