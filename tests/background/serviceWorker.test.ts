import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireProxyError, mockState } from '../setup'

// Force a fresh module evaluation per test so the SW re-registers its listener
// against the freshly-reset chrome mock. vi.resetModules() is the canonical
// pattern for "side-effectful module under test."
beforeEach(() => {
  vi.resetModules()
})

const importServiceWorker = () => import('../../packages/background/serviceWorker')

describe('service worker onProxyError listener', () => {
  it('registers an onProxyError listener at module load', async () => {
    await importServiceWorker()
    expect(chrome.proxy.onProxyError.addListener).toHaveBeenCalled()
    expect(mockState.proxyErrorListeners.length).toBeGreaterThan(0)
  })

  it('persists fired errors to chrome.storage.local under "lastProxyError"', async () => {
    await importServiceWorker()

    fireProxyError({
      error: 'net::ERR_PAC_SCRIPT_FAILED',
      details: 'PAC script returned undefined',
      fatal: false,
    })

    // chrome.storage.local.set is async (returns a Promise in MV3) — give it a tick.
    await new Promise((r) => setTimeout(r, 0))

    expect(mockState.storage.lastProxyError).toMatchObject({
      error: 'net::ERR_PAC_SCRIPT_FAILED',
      details: 'PAC script returned undefined',
      fatal: false,
      timestamp: expect.any(Number),
    })
  })
})
