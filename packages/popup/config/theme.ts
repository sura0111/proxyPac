import { Theme, dictionary } from '@packages/popup/constants'

export const themeConfigs = {
  [Theme.system]: {
    text: dictionary.system,
    value: Theme.system,
  },
  [Theme.light]: {
    text: dictionary.light,
    value: Theme.light,
  },
  [Theme.dark]: {
    text: dictionary.dark,
    value: Theme.dark,
  },
}
