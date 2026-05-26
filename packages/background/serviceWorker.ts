import { dictionary } from '@packages/popup/constants'

console.log(dictionary.appName)

// Listen for runtime PAC script errors: syntax errors, fetch failures (URL PACs),
// or invalid return values. Persist the latest error to chrome.storage so the
// popup can surface it next time it opens.
chrome.proxy.onProxyError.addListener((details) => {
  const errorRecord = {
    error: details.error,
    details: details.details,
    fatal: details.fatal,
    timestamp: Date.now(),
  }

  console.error('[proxy-pac-switcher] PAC error:', errorRecord)
  void chrome.storage.local.set({ lastProxyError: errorRecord })
})
