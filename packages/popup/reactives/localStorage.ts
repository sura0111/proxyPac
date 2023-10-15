import { reactive } from 'vue'
import { LocalStorageKey, type LocalStorage, SortType, Theme, DisplayType } from '@packages/popup/constants'
import { localStorage } from '@packages/popup/lib'

export const localStorageReactive = reactive<LocalStorage>({
  displayType: localStorage.getItem(LocalStorageKey.displayType, DisplayType.icon),
  sortType: localStorage.getItem(LocalStorageKey.sortType, SortType.default),
  theme: localStorage.getItem(LocalStorageKey.theme, Theme.system),
})
