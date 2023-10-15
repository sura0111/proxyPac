import { detect } from 'detect-browser'

export const detectChrome = () => {
  const currentBrowser = detect()
  return currentBrowser?.name === 'chrome'
}
