import { reactive } from 'vue'
import { BrowserStorage } from '@packages/popup/definitions'

export const browserStorageReactive = reactive<Partial<BrowserStorage>>({
  pac: { name: null },
  pacs: [],
})
