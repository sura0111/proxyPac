import { type DisplayType, type SortType } from './displayOptions'
import { type Theme } from './theme'

export enum LocalStorageKey {
  theme = 'theme',
  displayType = 'displayType',
  sortType = 'sortType',
}

export interface LocalStorage extends Record<string, string> {
  [LocalStorageKey.theme]: Theme
  [LocalStorageKey.displayType]: DisplayType
  [LocalStorageKey.sortType]: SortType
}
