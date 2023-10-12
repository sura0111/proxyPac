import { localStorage } from '@packages/popup/lib'
import { LocalStorageKey } from '@packages/popup/constants'
import { getBrowserTheme } from '@packages/core/utils'
import { computed, ref, watch } from 'vue'
import { useTheme as useVuetifyTheme } from 'vuetify'

export const useThemeService = () => {
  const theme = useVuetifyTheme()
  const currentTheme = ref(localStorage.getItem(LocalStorageKey.theme))

  watch(currentTheme, (value) => {
    localStorage.setItem(LocalStorageKey.theme, value)
    theme.global.name.value = value ?? getBrowserTheme()
  })

  const loadTheme = () => {
    theme.global.name.value = currentTheme.value ?? getBrowserTheme()
  }

  const computedCurrentTheme = computed<'light' | 'dark'>(() => {
    return theme.name.value as 'light' | 'dark'
  })

  return {
    currentTheme,
    computedCurrentTheme,
    loadTheme,
  }
}
