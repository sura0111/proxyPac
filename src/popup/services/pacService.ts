import { computed, toRefs } from '@vue/composition-api'
import axios from 'axios'
import { Pac } from '../definitions/pac'
import { usePacRepository } from '../repositories/pacRepository'

export const usePacService = () => {
  const { config } = usePacRepository()

  const { isReady, pac, pacs } = toRefs(config)

  const sortedPacs = computed((): Pac[] => {
    return config.pacs.sort((a, b) => (a.name > b.name ? 1 : -1))
  })

  const hasPac = (name: string): boolean => !!config.pacs.find((pac) => pac.name === name)

  const getPacIndex = (name: string): number | null => {
    const index = config.pacs.findIndex((pac) => pac.name === name)
    return index === -1 ? null : index
  }

  const getPacValue = async (url: string) => {
    const isUrl = /^https?:\/\/.+$/.test(url)
    return isUrl ? ((await axios.get(url)).data as string) : url
  }

  const addPac = async ({ name, url }: { name: string; url: string }) => {
    if (hasPac(name)) {
      return
    }
    config.pacs = [...config.pacs, { name, url }]
  }

  const editPac = async ({ name, url }: { name: string; url: string }, oldData?: { name?: string | null }) => {
    if (oldData?.name && name !== oldData.name) {
      const deleteIndex = getPacIndex(oldData.name)

      if (deleteIndex !== null) {
        const pacs = config.pacs.slice()
        pacs.splice(deleteIndex, 1)
        if (!pacs.find((pac) => pac.name === name)) {
          pacs.push({ name, url })
        }
        config.pacs = pacs
      }
      return
    }

    const index = getPacIndex(name)
    if (index === null) {
      return
    }
    const newPacs = config.pacs.slice()
    newPacs.splice(index, 1, { name, url })
    config.pacs = newPacs
  }

  const deletePac = (name: string) => {
    const index = getPacIndex(name)
    if (index === null) {
      return
    }
    const newPacs = config.pacs.slice()
    newPacs.splice(index, 1)
    config.pacs = newPacs
  }

  return {
    sortedPacs,
    isReady,
    pac,
    pacs,
    hasPac,
    getPacIndex,
    getPacValue,
    addPac,
    editPac,
    deletePac,
  }
}
