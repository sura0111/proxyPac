<template>
  <vApp class="pacSwitcher">
    <vMain>
      <vAppBar density="compact" elevation="0" border>
        <vTabs v-model="tab" color="primary">
          <vTab v-for="(tabEnum, id) in tabs" :key="id" class="pacSwitcher__tab">{{ tabNames[tabEnum] }}</vTab>
        </vTabs>
        <VSpacer></VSpacer>
        <div>
          <vMenu location="bottom">
            <template #activator="{ props }">
              <vBtn v-bind="props" variant="text" elevation="0">
                <vIcon icon="mdi-brightness-4"></vIcon>
                <span class="mx-1">{{ themeConfigs[currentTheme].text }}</span>
                <VIcon icon="mdi-chevron-down"></VIcon>
              </vBtn>
            </template>
            <vList density="compact">
              <vListItem
                v-for="{ text, value } in themeConfigs"
                :key="value"
                :class="{ 'themeSelector__item--selected': currentTheme === value }"
                @click="currentTheme = value"
              >
                {{ text }}
              </vListItem>
            </vList>
          </vMenu>
          <vBtn icon variant="text" size="32" class="ml-1 mr-2" @click="openGithub">
            <vIcon icon="mdi-github"></vIcon>
          </vBtn>
        </div>
      </vAppBar>
      <Suspense>
        <RouterView></RouterView>
        <template #fallback>
          <div class="pacSwitcher__fallback">
            <vProgressCircular indeterminate></vProgressCircular>
          </div>
        </template>
      </Suspense>
    </vMain>
  </vApp>
</template>
<script setup lang="ts">
import { usePopupService, useThemeService } from '@packages/popup/services'
import { tabNames } from './config/tabs'
import { themeConfigs } from '@packages/popup/config'

const { openGithub, tab, tabs } = usePopupService()
const { currentTheme, loadTheme } = useThemeService()

loadTheme()
</script>

<style lang="scss" scoped>
.pacSwitcher {
  height: auto;
  width: 500px;
  min-height: 480px;
  overflow: scroll;
  font-size: 16px;

  &__fallback {
    display: flex;
    justify-content: center;
  }
}

.themeSelector {
  &__item {
    &--selected {
      font-weight: 900;
      color: rgb(var(--v-theme-primary));
    }
  }
}
</style>
