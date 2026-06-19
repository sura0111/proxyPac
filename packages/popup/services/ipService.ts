import { ref } from 'vue'

// api.ipify.org returns the apparent external IP — what websites see as your origin.
// When a PAC routes you through a proxy, this returns the proxy's egress IP.
// When PAC returns DIRECT (or no proxy is set), this returns your real IP.
const IP_SERVICE_URL = 'https://api.ipify.org?format=json'
const FETCH_TIMEOUT_MS = 5000

export const useIpService = () => {
  const ip = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const refresh = async () => {
    isLoading.value = true
    error.value = null

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    try {
      const response = await fetch(IP_SERVICE_URL, {
        cache: 'no-store',
        signal: controller.signal,
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = (await response.json()) as { ip: string }
      ip.value = data.ip
    } catch (e) {
      ip.value = null
      error.value = e instanceof Error ? e.message : 'Network error'
    } finally {
      clearTimeout(timeoutId)
      isLoading.value = false
    }
  }

  // Auto-fetch on init (popup open).
  void refresh()

  return { ip, isLoading, error, refresh }
}
