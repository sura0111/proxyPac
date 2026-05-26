import { describe, expect, it } from 'vitest'
import { PacType } from '@packages/popup/constants'
import { type Pac } from '@packages/popup/types'
import { getPacType, getPacValue } from '@packages/popup/helpers'
// getNewPac is imported in your contribution tests below; uncomment when ready:
// import { getNewPac } from '@packages/popup/helpers'

const URL_VALUE = 'https://example.com/proxy.pac'
const TEXT_VALUE = 'function FindProxyForURL(){return "DIRECT"}'

describe('getPacValue (back-compat normalizer)', () => {
  it('returns undefined for null', () => {
    expect(getPacValue(null)).toBeUndefined()
  })

  it('returns undefined for undefined', () => {
    expect(getPacValue(undefined)).toBeUndefined()
  })

  it('returns .value when pac has a truthy type (new shape)', () => {
    const pac = { name: 'a', type: PacType.text, value: TEXT_VALUE } as Pac
    expect(getPacValue(pac)).toBe(TEXT_VALUE)
  })

  it('returns .value from new-shape pac when type is PacType.url (=0, falsy)', () => {
    // Subtle: `if (pac.type)` is falsy for PacType.url=0 → falls into back-compat branch.
    // Back-compat branch checks `'value' in pac` first, so new-shape still resolves correctly.
    const pac = { name: 'a', type: PacType.url, value: URL_VALUE } as Pac
    expect(getPacValue(pac)).toBe(URL_VALUE)
  })

  it('returns .url from old-shape pac (no type, only url field)', () => {
    const pac = { name: 'old', url: URL_VALUE } as Pac
    expect(getPacValue(pac)).toBe(URL_VALUE)
  })
})

describe('getPacType', () => {
  it('returns the explicit type when set (PacType.text)', () => {
    const pac = { name: 'a', type: PacType.text, value: TEXT_VALUE } as Pac
    expect(getPacType(pac)).toBe(PacType.text)
  })

  it('returns the explicit type when set (PacType.url = 0)', () => {
    // Important: this checks `type !== undefined && type !== null`, so 0 is preserved.
    const pac = { name: 'a', type: PacType.url, value: URL_VALUE } as Pac
    expect(getPacType(pac)).toBe(PacType.url)
  })

  it('infers PacType.url from URL value when type is absent (old shape)', () => {
    const pac = { name: 'old', url: URL_VALUE } as Pac
    expect(getPacType(pac)).toBe(PacType.url)
  })

  it('infers PacType.text from inline script when type is absent (old shape)', () => {
    const pac = { name: 'old', url: TEXT_VALUE } as Pac
    expect(getPacType(pac)).toBe(PacType.text)
  })

  it('defaults to PacType.url when pac has no value and no type', () => {
    const pac = { name: 'empty' } as Pac
    expect(getPacType(pac)).toBe(PacType.url)
  })

  it('defaults to PacType.url for null pac', () => {
    expect(getPacType(null)).toBe(PacType.url)
  })
})

// ───────────────────────────────────────────────────────────────────────────────
// getNewPac — YOUR CONTRIBUTION
//
// This is the most interesting function in the proxy-related code: it converts
// a Pac (which may be old-shape with `url`, new-shape with `value+type`, or a
// default placeholder with `name: null`) into a storable NewPac.
//
// Signature:  getNewPac(pac: Pac, withSelectedAt = false): NewPac | undefined
//
// Branches to think about (read the impl in pac.ts):
//   1. pac.name === null                    → returns undefined
//   2. pac has 'url' key (old shape):
//        a. pac.name is empty string        → returns undefined
//        b. pac.name set + withSelectedAt=false → { name, type, value: url }
//        c. pac.name set + withSelectedAt=true  → { name, type, value: url, selectedAt }
//   3. pac is already new shape (else branch) → { ...pac, selectedAt }  // NOTE: selectedAt is always added here regardless of the flag — is that intentional?
//
// Edge cases worth pinning:
//   - withSelectedAt flag behavior — is the asymmetry between branches 2c and 3 a bug?
//   - selectedAt should be a number (timestamp). Use vi.setSystemTime() to make it deterministic.
//   - What if pac.name is undefined vs null vs ''? They're handled differently.
//
// TODO: write 4-6 tests below covering the branches above.
// Tips:
//   - import { vi, beforeEach, afterEach } from 'vitest' if you use fake timers
//   - vi.useFakeTimers() + vi.setSystemTime(new Date('2025-01-01')) → deterministic selectedAt
//   - Look at pac.ts impl: `new Date().getTime()` → mock that with setSystemTime
// ───────────────────────────────────────────────────────────────────────────────

describe('getNewPac', () => {
  it.todo('returns undefined when pac.name is null')
  it.todo('returns undefined when pac is old-shape with empty name')
  it.todo('converts old-shape pac to new shape (without selectedAt)')
  it.todo('adds selectedAt when withSelectedAt=true on old-shape pac')
  it.todo('always adds selectedAt for already-new-shape pac (note the asymmetry vs old-shape)')
})
