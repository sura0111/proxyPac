// Bridge between the service worker's chrome.proxy.onProxyError listener
// (writes lastProxyError to chrome.storage.local) and the popup form that
// validates PACs before saving. No reactive state — caller polls at save time.

export interface ProxyErrorRecord {
  error: string
  details: string
  fatal: boolean
  timestamp: number
}

const STORAGE_KEY = 'lastProxyError'

export const getLastProxyError = async (): Promise<ProxyErrorRecord | null> => {
  const result = await chrome.storage.local.get(STORAGE_KEY)
  return (result[STORAGE_KEY] as ProxyErrorRecord | undefined) ?? null
}

export const clearLastProxyError = async (): Promise<void> => {
  await chrome.storage.local.remove(STORAGE_KEY)
}

// ───────────────────────────────────────────────────────────────────────────────
// formatProxyError — YOUR CONTRIBUTION (carried over from previous iteration)
//
// Turn a raw chrome.proxy.onProxyError record into a user-friendly message
// for display in the pacConfig form when validation fails.
//
// Common codes you'll see:
//   net::ERR_PAC_SCRIPT_FAILED          → script threw or returned wrong type
//   net::ERR_PAC_NOT_AVAILABLE          → Chrome couldn't fetch the PAC URL
//   net::ERR_PAC_STATUS_NOT_OK          → PAC URL returned an HTTP error
//   net::ERR_MANDATORY_PROXY_CONFIG…    → mandatory PAC failed (no DIRECT fallback)
//
// TODO: pick a format. Keep it under ~120 chars so it fits the VAlert nicely.
// ───────────────────────────────────────────────────────────────────────────────

export const formatProxyError = (err: ProxyErrorRecord): string => {
  return `${err.error}: ${err.details}`
}
