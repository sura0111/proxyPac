import { getBrowserTheme } from '@packages/core/utils'
import { LocalStorageKey, Theme } from '@packages/popup/constants'
import { createReactiveLocalStorage } from '@packages/popup/repositories'
import { computed } from 'vue'
import { useTheme as useVuetifyTheme } from 'vuetify'

export const useThemeService = () => {
  const theme = useVuetifyTheme()

  const currentTheme = createReactiveLocalStorage(LocalStorageKey.theme, {
    onChange: (value) => {
      theme.global.name.value = value === Theme.system ? getBrowserTheme() : value
    },
  })

  const loadTheme = () => {
    theme.global.name.value = currentTheme.value === Theme.system ? getBrowserTheme() : currentTheme.value
  }

  const computedCurrentTheme = computed<Theme.light | Theme.dark>(() => {
    return theme.name.value as Theme.light | Theme.dark
  })

  return {
    currentTheme,
    computedCurrentTheme,
    loadTheme,
  }
}
