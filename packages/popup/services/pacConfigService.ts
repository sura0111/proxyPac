import { createBounce, getCodeWithPreWrapper } from '@packages/popup/lib'
import { type Color, PacType, pacDefaultValues } from '@packages/popup/constants'
import { ref, watch, computed } from 'vue'
import { setProxy } from '@packages/popup/utils'
import { clearLastProxyError, formatProxyError, getLastProxyError } from './proxyErrorService'
import { usePacService } from './pacService'

// Apply the PAC to Chrome, force it to actually execute once, and read back
// any error the service worker recorded. Returns ok:false with a user-friendly
// message if the PAC is broken (syntax error OR runtime error like
// "PAC script returned undefined"). Caller is responsible for save vs revert.
const PAC_EVAL_WAIT_MS = 250

export type ValidatePacResult = { ok: true } | { ok: false, error: string }

export const validateAndApplyPac = async (pacValue: string): Promise<ValidatePacResult> => {
  // 1. Clear any prior error so we only read fresh ones.
  await clearLastProxyError()

  // 2. Apply. setProxy already checks chrome.runtime.lastError → catches syntax issues.
  const applyResult = await setProxy(pacValue)
  if (!applyResult.ok) {
    return { ok: false, error: applyResult.error }
  }

  // 3. Force the PAC to actually execute by making one request through it.
  //    generate_204 is Google's no-content endpoint — small, fast, no proxy reliance.
  //    Even if the fetch itself fails, Chrome will have evaluated the PAC.
  try {
    await fetch('https://www.gstatic.com/generate_204', { cache: 'no-store', mode: 'no-cors' })
  } catch {
    // Network errors are expected (especially if the PAC routes us to a dead proxy).
    // We only care whether the PAC's FindProxyForURL itself errored.
  }

  // 4. Give the SW a moment to receive onProxyError and write to storage.
  await new Promise((resolve) => setTimeout(resolve, PAC_EVAL_WAIT_MS))

  // 5. Read what the SW captured.
  const captured = await getLastProxyError()
  if (captured) {
    return { ok: false, error: formatProxyError(captured) }
  }

  return { ok: true }
}

export const usePacConfigService = async () => {
  const bounce = createBounce()
  const pacService = await usePacService()
  const pacType = ref<PacType>(PacType.url)
  const name = ref<string>('')
  const color = ref<Color | null>(null)
  const isRetrievingPacView = ref(false)
  const isFailedFetchingPacView = ref(false)
  const pacRawValues = ref({ ...pacDefaultValues })
  const pacViewValue = ref('')

  const updatePacRawValue = (value?: string | undefined) => {
    pacRawValues.value[pacType.value] = value?.trim() ?? ''
  }

  const updatePacViewValue = (value?: string | undefined) => {
    pacRawValues.value[pacType.value] = value?.trim() ?? ''
  }

  const pacRawValue = computed(() => {
    return pacRawValues.value[pacType.value]
  })

  const pacRawHtmlValue = computed(() => {
    if (pacType.value === 0) {
      return pacRawValue.value
    }
    return getCodeWithPreWrapper(pacRawValue.value)
  })

  const pacViewHtmlValue = computed(() => {
    return getCodeWithPreWrapper(pacViewValue.value)
  })

  watch(pacRawValue, () => {
    if (pacType.value === PacType.url && /^https?:\/\//.test(pacRawValue.value)) {
      isRetrievingPacView.value = true
      isFailedFetchingPacView.value = false
      bounce(async () => {
        try {
          const promisedPacValue = await pacService.getPacValue(pacRawValue.value)
          pacViewValue.value = promisedPacValue.trim()
        } catch {
          isFailedFetchingPacView.value = true
        }
        isRetrievingPacView.value = false
      }, 2000)
    }
  })

  watch(pacType, (value) => {
    if (value === 1 && pacViewValue.value) {
      updatePacRawValue(pacViewValue.value)
    }
  })

  return {
    name,
    pacType,
    pacValue: pacRawValue,
    color,
    pacRawHtmlValue,
    pacViewHtmlValue,
    isRetrievingPacView,
    isFailedFetchingPacView,
    hasPac: pacService.hasPac,
    updatePacRawValue,
    updatePacViewValue,
  }
}
