import { LocalStorageKey } from '@packages/popup/constants'
import { createReactiveLocalStorage } from '@packages/popup/repositories'

export const useDisplayOptionsService = () => {
  const displayType = createReactiveLocalStorage(LocalStorageKey.displayType)
  const sortType = createReactiveLocalStorage(LocalStorageKey.sortType)

  return {
    displayType,
    sortType,
  }
}
