<template>
  <vApp class="pacSwitcher">
    <vMain>
      <vContainer fluid>
        <vRow no-gutters>
          <vCol cols="12" class="mb-3 d-flex align-center">
            <vTabs v-model="tab" color="primary">
              <vTab v-for="(tabEnum, id) in tabs" :key="id" class="pacSwitcher__tab">{{ tabNames[tabEnum] }}</vTab>
            </vTabs>
            <vSpacer></vSpacer>
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
              <vBtn icon variant="text" size="32" class="ml-1" @click="openGithub">
                <vIcon icon="mdi-github"></vIcon>
              </vBtn>
            </div>
          </vCol>
          <vCol cols="12">
            <Suspense>
              <RouterView></RouterView>
              <template #fallback>
                <div class="pacSwitcher__fallback">
                  <vProgressCircular indeterminate></vProgressCircular>
                </div>
              </template>
            </Suspense>
          </vCol>
        </vRow>
      </vContainer>
    </vMain>
  </vApp>
</template>
<script setup lang="ts">
import { usePopupService, useThemeService } from '@packages/popup/services'
import { tabNames } from './config/tabs'
import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js'
import { themeConfigs } from '@packages/popup/constants'

hljs.highlightAll()

const { openGithub, tab, tabs } = usePopupService()
const { currentTheme, loadTheme } = useThemeService()

loadTheme()
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,700&display=swap');

.pacSwitcher {
  width: 500px;
  min-height: 480px;
  overflow: scroll;
  font-size: 16px;
  font-family: 'Roboto', 'Noto Sans JP', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  &__fallback {
    display: flex;
    justify-content: center;
  }
}

.themeSelector {
  &__item {
    &--selected {
      color: rgb(var(--v-theme-primary));
      font-weight: 900;
    }
  }
}
</style>
