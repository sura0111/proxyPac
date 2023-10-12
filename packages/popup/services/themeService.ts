import { localStorage } from '@packages/popup/lib'
import { LocalStorageKey, Theme } from '@packages/popup/constants'
import { getBrowserTheme } from '@packages/core/utils'
import { computed, ref, watch } from 'vue'
import { useTheme as useVuetifyTheme } from 'vuetify'

export const useThemeService = () => {
  const theme = useVuetifyTheme()
  const currentTheme = ref(localStorage.getItem(LocalStorageKey.theme) ?? Theme.system)

  watch(currentTheme, (value) => {
    localStorage.setItem(LocalStorageKey.theme, value)
    theme.global.name.value = value === Theme.system ? getBrowserTheme() : value
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
