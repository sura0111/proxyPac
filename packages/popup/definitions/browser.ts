import { BrowserStorageKey } from '@packages/popup/constants'
import { Pac } from '@packages/popup/types'

export interface BrowserStorage {
  [BrowserStorageKey.pac]: Pac
  [BrowserStorageKey.pacs]: Pac[]
}
