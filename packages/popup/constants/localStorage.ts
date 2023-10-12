export enum LocalStorageKey {
  theme = 'theme',
}

export interface LocalStorage extends Record<string, string> {
  [LocalStorageKey.theme]: 'light' | 'dark'
}
