import { PageName } from '@packages/popup/constants'
import { useRouter } from 'vue-router'
import { type Pac } from '@packages/popup/types'

export const useRouterService = () => {
  const router = useRouter()

  const goToSettingsTop = async () => {
    return await router.push({ name: PageName.settings })
  }

  const goToAddPage = () => {
    router.push({ name: PageName.addPac })
  }

  const goToEditPage = (pac: Pac) => {
    router.push({ name: PageName.editPac, query: { pac: JSON.stringify(pac) } })
  }

  return {
    goToSettingsTop,
    goToAddPage,
    goToEditPage,
  }
}
