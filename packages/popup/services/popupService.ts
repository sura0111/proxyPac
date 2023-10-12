import { tabsPages, tabs } from '@packages/popup/config'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PageName, Tab } from '@packages/popup/constants'

export const usePopupService = () => {
  const route = useRoute()
  const router = useRouter()

  const openGithub = () => {
    window.open('https://github.com/sura0111/proxyPac', '_blank')
  }

  const tab = computed({
    get() {
      const pageName = route.name?.toString() as PageName

      if (tabsPages[Tab.switcher].includes(pageName)) {
        return Tab.switcher
      }

      if (tabsPages[Tab.settings].includes(pageName)) {
        return Tab.settings
      }

      return null
    },
    set(value) {
      if (value !== null) {
        const pageName = tabsPages[tabs[value]][0]
        router.push({ name: pageName })
      }
    },
  })

  return {
    tabsPages,
    tabs,
    tab,
    openGithub,
  }
}
