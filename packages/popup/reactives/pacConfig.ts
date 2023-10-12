import { type Pac } from '@packages/popup/definitions'
import { reactive } from 'vue'

export const pacConfig = reactive<{ isReady: boolean; pacs: Pac[]; pac: Pac }>({
  isReady: false,
  pacs: [],
  pac: { name: null },
})
