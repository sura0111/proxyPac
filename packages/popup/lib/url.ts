export const isUrl = (url?: string | undefined | null) => {
  if (!url) {
    return false
  }

  return /^https?:\/\//.test(url)
}
