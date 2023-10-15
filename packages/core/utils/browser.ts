import { Theme } from '@packages/popup/constants/theme'

export const getBrowserTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.dark : Theme.light
}
