import { type LocalStorage, type LocalStorageKey } from '@packages/popup/constants'
import { localStorageReactive } from '@packages/popup/reactives'
import { computed, type Ref } from 'vue'
import { localStorage } from '@packages/popup/lib'

export const createReactiveLocalStorage = <T extends LocalStorageKey>(
  key: T,
  options?: {
    immediate?: boolean
    onChange?: (value: LocalStorage[T]) => void
  },
) => {
  const storage: Ref<LocalStorage[T]> = computed({
    get: () => {
      return localStorageReactive[key]
    },
    set: async (value) => {
      localStorageReactive[key] = value
      localStorage.setItem(key, value)
      options?.onChange?.(value)
    },
  })

  if (options?.immediate) {
    options.onChange?.(storage.value)
  }

  return storage
}
