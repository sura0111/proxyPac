import { describe, expect, it, vi } from 'vitest'
import { mockState, setNextChromeError } from '../../setup'
import { setProxy } from '@packages/popup/utils'

const PAC_URL = 'https://example.com/proxy.pac'
const PAC_TEXT = 'function FindProxyForURL(url, host) { return "DIRECT"; }'

// Helper: read current "loaded" PAC state from the mock chrome.proxy.
const getLoadedPac = (): unknown => mockState.proxy?.value

describe('setProxy — happy path (PAC is loaded)', () => {
  it('actually clears chrome.proxy state when no pac is passed', async () => {
    mockState.proxy = { value: { mode: 'pac_script' } } as never // simulate previous state
    const result = await setProxy()
    expect(result).toEqual({ ok: true })
    expect(getLoadedPac()).toBeUndefined() // verified end state, not just the call
  })

  it('loads a URL-based PAC and reports ok', async () => {
    const result = await setProxy(PAC_URL)
    expect(result).toEqual({ ok: true })
    expect(getLoadedPac()).toEqual({
      mode: 'pac_script',
      pacScript: { url: PAC_URL, mandatory: true },
    })
  })

  it('loads an inline-script PAC and reports ok', async () => {
    const result = await setProxy(PAC_TEXT)
    expect(result).toEqual({ ok: true })
    expect(getLoadedPac()).toEqual({
      mode: 'pac_script',
      pacScript: { data: PAC_TEXT, mandatory: true },
    })
  })
})

describe('setProxy — failure detection', () => {
  it('returns ok:false with the chrome error message when chrome.runtime.lastError is set', async () => {
    setNextChromeError('Permission denied')
    const result = await setProxy(PAC_URL)
    expect(result).toEqual({ ok: false, error: 'Permission denied' })
  })

  it('returns ok:false when chrome.proxy throws synchronously', async () => {
    vi.mocked(chrome.proxy.settings.set).mockImplementationOnce(() => {
      throw new Error('Chrome API unavailable')
    })

    const result = await setProxy(PAC_URL)
    expect(result).toEqual({ ok: false, error: 'Chrome API unavailable' })
  })

  it('does NOT leave a stale loaded PAC after a failed set', async () => {
    // First, load a known-good PAC.
    await setProxy(PAC_URL)
    expect(getLoadedPac()).toBeDefined()

    // Now simulate failure on the next set. Chrome's behavior here: set still
    // happens (writes to state), then reports lastError. This test pins that
    // observed Chrome behavior — it is NOT atomic. Callers cannot rely on
    // "ok:false means nothing changed."
    setNextChromeError('Quota exceeded')
    const result = await setProxy(PAC_TEXT)
    expect(result.ok).toBe(false)
    // Document the non-atomic behavior — state DID change despite the error.
    expect(getLoadedPac()).toEqual({
      mode: 'pac_script',
      pacScript: { data: PAC_TEXT, mandatory: true },
    })
  })
})
