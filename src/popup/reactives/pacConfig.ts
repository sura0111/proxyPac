import { KEY } from '@/constants'
import { Pac } from '@/popup/definitions/pac'
import { reactive } from '@vue/composition-api'

export const pacConfig = reactive<{ isReady: boolean; pacs: Pac[]; pac: Pac }>({
  isReady: false,
  pacs: [],
  pac: { name: KEY.systemDefault },
})
