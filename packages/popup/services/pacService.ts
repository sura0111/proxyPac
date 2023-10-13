import { computed } from 'vue'
import axios from 'axios'
import { createReactiveBrowserStorage } from '@packages/popup/repositories'
import { BrowserStorageKey, SortType } from '@packages/popup/constants'
import { setProxy } from '@packages/popup/utils'
import browser from 'webextension-polyfill'
import { type Pac } from '@packages/popup/types'
import { useDisplayOptionsService } from './displayOptionsService'

export const usePacService = async () => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const defaultPac: Pac = { name: null } as Pac
  const { displayType, sortType } = useDisplayOptionsService()
  const pacs = await createReactiveBrowserStorage(BrowserStorageKey.pacs, {
    defaultValue: [] as Pac[],
  })

  const pac = await createReactiveBrowserStorage(BrowserStorageKey.pac, { defaultValue: defaultPac })

  const sortedPacs = computed(() => {
    const sortBy = sortType.value
    const target = [...pacs.value]

    if (sortBy === SortType.alphabetic) {
      target.sort((a, b) => {
        if (!a.name) {
          return 1
        }
        if (!b.name) {
          return -1
        }
        return a.name > b.name ? 1 : -1
      })
    }

    if (sortBy === SortType.recent) {
      console.log(target.map((p) => p.selectedAt))
      target.sort((a, b) => {
        if (!a.selectedAt) {
          return -1
        }
        if (!b.selectedAt) {
          return 1
        }
        return b.selectedAt - a.selectedAt
      })
    }

    return target
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
      pac.value = value.name ? { ...value, selectedAt: new Date().getTime() } : value
      await editPac(pac.value)
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
    displayType,
    sortType,
    hasPac,
    getPacIndex,
    getPacValue,
    usePac,
    addPac,
    editPac,
    deletePac,
  }
}
