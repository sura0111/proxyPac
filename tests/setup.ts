import { vi, beforeEach } from 'vitest'

// ─── Stateful Chrome mock ────────────────────────────────────────────────────
// Tests can verify "did the PAC actually get loaded" by reading proxyState
// after setProxy resolves — same as production code would via chrome.proxy.settings.get().
// Reset via vi.clearAllMocks() + resetChromeMock() in beforeEach (see below).

type ProxyDetails = chrome.types.ChromeSettingSetDetails<unknown> | undefined
type RuntimeError = { message?: string } | undefined

interface MockState {
  proxy: ProxyDetails
  runtimeLastError: RuntimeError
  storage: Record<string, unknown>
  proxyErrorListeners: Array<(details: chrome.proxy.ErrorDetails) => void>
}

const state: MockState = {
  proxy: undefined,
  runtimeLastError: undefined,
  storage: {},
  proxyErrorListeners: [],
}

export const mockState = state

export const resetChromeMock = () => {
  state.proxy = undefined
  state.runtimeLastError = undefined
  state.storage = {}
  state.proxyErrorListeners = []
}

// Helper for tests that want to simulate chrome.runtime.lastError on the next call.
export const setNextChromeError = (message: string) => {
  state.runtimeLastError = { message }
}

// Helper for tests that want to fire a proxy error event from the SW listener.
export const fireProxyError = (details: chrome.proxy.ErrorDetails) => {
  state.proxyErrorListeners.forEach((listener) => listener(details))
}

globalThis.chrome = {
  runtime: {
    get lastError() {
      return state.runtimeLastError
    },
  },
  proxy: {
    settings: {
      set: vi.fn((details: chrome.types.ChromeSettingSetDetails<unknown>, cb?: () => void) => {
        state.proxy = details
        // Chrome convention: callback fires AFTER lastError is set (if any).
        cb?.()
        // lastError is auto-cleared after callback fires (mimics Chrome behavior).
        state.runtimeLastError = undefined
      }),
      clear: vi.fn((_details: chrome.types.ChromeSettingClearDetails, cb?: () => void) => {
        state.proxy = undefined
        cb?.()
        state.runtimeLastError = undefined
      }),
      get: vi.fn((_details: chrome.types.ChromeSettingGetDetails, cb?: (details: { value: unknown }) => void) => {
        cb?.({ value: state.proxy?.value })
      }),
    },
    onProxyError: {
      addListener: vi.fn((listener: (details: chrome.proxy.ErrorDetails) => void) => {
        state.proxyErrorListeners.push(listener)
      }),
    },
  },
  storage: {
    local: {
      set: vi.fn(async (items: Record<string, unknown>) => {
        Object.assign(state.storage, items)
      }),
      get: vi.fn(async (key: string) => ({ [key]: state.storage[key] })),
    },
  },
  i18n: {
    getMessage: vi.fn((key: string) => `__${key}__`),
  },
} as unknown as typeof chrome

beforeEach(() => {
  vi.clearAllMocks()
  resetChromeMock()
})
