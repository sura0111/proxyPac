import { describe, expect, it } from 'vitest'
import { isUrl } from '@packages/popup/lib'

describe('isUrl', () => {
  it.each([
    ['https://example.com', true],
    ['http://example.com', true],
    ['https://example.com/path?q=1', true],
    ['ftp://example.com', false],
    ['file:///etc/hosts', false],
    ['example.com', false],
    ['function FindProxyForURL() { return "DIRECT" }', false],
    ['', false],
    [undefined, false],
    [null, false],
  ])('isUrl(%j) -> %s', (input, expected) => {
    expect(isUrl(input)).toBe(expected)
  })
})
