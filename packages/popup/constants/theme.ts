export enum Theme {
  system = 'system',
  light = 'light',
  dark = 'dark',
}

export const themeConfigs = {
  [Theme.system]: {
    text: 'System',
    value: Theme.system,
  },
  [Theme.light]: {
    text: 'Light',
    value: Theme.light,
  },
  [Theme.dark]: {
    text: 'Dark',
    value: Theme.dark,
  },
}
