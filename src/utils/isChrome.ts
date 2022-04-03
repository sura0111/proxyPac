import { detect } from 'detect-browser'

const detectChrome = () => {
  const currentBrowser = detect()
  return currentBrowser?.name === 'chrome'
}

export default detectChrome
