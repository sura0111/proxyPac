import { createBounce, getCodeWithPreWrapper } from '@packages/popup/lib'
import { type Color, PacType, pacDefaultValues } from '@packages/popup/constants'
import { ref, watch, computed } from 'vue'
import { usePacService } from './pacService'

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
        } catch (error) {
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
