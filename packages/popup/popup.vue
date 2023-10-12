<template>
  <vApp class="pacSwitcher">
    <vMain>
      <vContainer fluid>
        <vRow no-gutters>
          <vCol cols="12" class="mb-3 d-flex align-center">
            <vAvatar size="24" class="mr-3 pointer" @click="openGithub">
              <vImg :src="logos[computedCurrentTheme]"></vImg>
            </vAvatar>
            <vTabs v-model="tab" color="primary">
              <vTab v-for="(tabEnum, id) in tabs" :key="id" class="pacSwitcher__tab">{{ tabNames[tabEnum] }}</vTab>
            </vTabs>
            <vSpacer></vSpacer>
            <div>
              <vMenu location="bottom">
                <template #activator="{ props }">
                  <vBtn icon v-bind="props" color="text" variant="text" size="32" elevation="0"
                    ><vIcon icon="mdi-brightness-4"></vIcon
                  ></vBtn>
                </template>
                <vList density="compact">
                  <vListItem
                    :class="{ 'languageSelector__item--selected': currentTheme === null }"
                    @click="currentTheme = null"
                  >
                    System
                  </vListItem>
                  <vListItem
                    :class="{ 'languageSelector__item--selected': currentTheme === 'light' }"
                    @click="currentTheme = 'light'"
                  >
                    Light
                  </vListItem>
                  <vListItem
                    :class="{ 'languageSelector__item--selected': currentTheme === 'dark' }"
                    @click="currentTheme = 'dark'"
                  >
                    Dark
                  </vListItem>
                </vList>
              </vMenu>
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
import { logos } from '@packages/popup/constants'
import { usePopupService, useThemeService } from '@packages/popup/services'
import { tabNames } from './config/tabs'
import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js'

hljs.highlightAll()

const { openGithub, tab, tabs } = usePopupService()
const { currentTheme, loadTheme, computedCurrentTheme } = useThemeService()

loadTheme()
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,700&display=swap');

.pacSwitcher {
  width: 500px;
  min-height: 400px;
  overflow: scroll;
  font-size: 16px;
  font-family: 'Roboto', 'Noto Sans JP', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  &__fallback {
    display: flex;
    justify-content: center;
  }

  &__tab {
    text-transform: none;
  }
}

.languageSelector {
  &__item {
    &--selected {
      color: rgb(var(--v-theme-primary));
      font-weight: 900;
    }
  }
}
</style>
