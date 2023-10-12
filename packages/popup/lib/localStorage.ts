import { type LocalStorageKey, type LocalStorage } from '@packages/popup/constants/localStorage'

export const localStorage = {
  getItem: <T extends LocalStorageKey = LocalStorageKey, D extends LocalStorage[T] | null = LocalStorage[T] | null>(
    key: T,
    defaultValue: D = null as D,
  ) => {
    return (window.localStorage.getItem(key) ?? defaultValue) as D
  },
  setItem: <T extends LocalStorageKey = LocalStorageKey>(key: T, value: LocalStorage[T] | null) => {
    if (value === null) {
      window.localStorage.removeItem(key)
    } else {
      window.localStorage.setItem(key, value)
    }
  },
  removeItem: (key: LocalStorageKey) => {
    window.localStorage.removeItem(key)
  },
}
