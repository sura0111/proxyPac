import { type NewPac, type Pac } from '@packages/popup/types'
import { PacType } from '@packages/popup/constants'
import { isUrl } from '@packages/popup/lib'

/** back compatibility */
export const getPacValue = (pac: Pac | null | undefined) => {
  if (!pac) {
    return undefined
  }
  if (pac.type) {
    return pac.value
  }

  return 'value' in pac ? pac.value : pac.url
}

export const getPacType = (pac: Pac | null | undefined) => {
  if (pac?.type !== undefined && pac.type !== null) {
    return pac.type
  }

  const pacValue = getPacValue(pac)

  if (pacValue) {
    return isUrl(pacValue) ? PacType.url : PacType.text
  }

  return PacType.url
}

export const getNewPac = (pac: Pac, withSelectedAt = false): NewPac | undefined => {
  const selectedAt = new Date().getTime()

  const pacType = getPacType(pac)

  if (pac.name === null) {
    return undefined
  }

  if ('url' in pac) {
    if (!pac.name) {
      return undefined
    }

    const baseNewPac = {
      name: pac.name,
      type: pacType,
      value: pac.url,
    }

    if (withSelectedAt) {
      return { ...baseNewPac, selectedAt }
    }

    return baseNewPac
  }

  return { ...pac, selectedAt }
}
