import { type BrowserStorageKey } from '@packages/popup/constants'
import { type Pac } from '@packages/popup/types'

export interface BrowserStorage {
  [BrowserStorageKey.pac]?: Pac | undefined
  [BrowserStorageKey.pacs]?: Pac[] | undefined
}
