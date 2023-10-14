import { BrowserStorageKey, SortType } from '@packages/popup/constants'
import { getNewPac } from '@packages/popup/helpers'
import { isUrl } from '@packages/popup/lib'
import { createReactiveBrowserStorage } from '@packages/popup/repositories'
import { type NewPac, type Pac } from '@packages/popup/types'
import { setProxy } from '@packages/popup/utils'
import axios from 'axios'
import { computed } from 'vue'
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
      return target.sort((a, b) => {
        const aS = a.selectedAt
        const bS = b.selectedAt

        if (!aS) {
          if (!bS) {
            return 0
          }

          return 1
        }

        if (!bS) {
          return -1
        }

        return bS - aS
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

    return isUrl(value) ? ((await axios.get(value, { timeout: 6000 })).data as string) : value
  }

  const addPac = async (pac: NewPac) => {
    if (hasPac(pac.name)) {
      return
    }
    pacs.value = [...pacs.value, pac]
  }

  const editPac = async (newPac: NewPac, oldData?: Pac) => {
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
    const newPac = getNewPac(value, true)
    const pacToSet = value.name ? newPac : value

    if (pacToSet) {
      pac.value = pacToSet
    }

    if (newPac) {
      await editPac(newPac)
    }

    if (!skipProxyUpdate) {
      await setProxy(pacToSet?.name && 'value' in pacToSet ? pacToSet?.value ?? undefined : undefined)
      chrome.tabs.reload()
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
