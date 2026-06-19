<template>
  <vApp class="pacSwitcher">
    <vAppBar density="compact" elevation="0" border>
      <vTabs v-model="tab" color="primary">
        <vTab v-for="(tabEnum, id) in tabs" :key="id" class="pacSwitcher__tab">{{ tabNames[tabEnum] }}</vTab>
      </vTabs>
      <VSpacer></VSpacer>
      <IpIndicator class="mr-2"></IpIndicator>
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
    <vMain class="pacSwitcher__main">
      <Suspense>
        <RouterView></RouterView>
        <template #fallback>
          <div class="pacSwitcher__fallback">
            <vProgressCircular indeterminate></vProgressCircular>
          </div>
        </template>
      </Suspense>
    </vMain>
    <vFooter class="pacSwitcher__footer" :height="bannerHeightNumber + 12" color="rgb(249 241 192 / 52%)">
      <Banner class="pacSwitcher__banner">
        <template #text>
          {{ dictionary.bannerTextLabel }}
        </template>
        <template #actions>
          <vBtn :href="bannerUrl" target="_blank" rel="noopener noreferrer">
            {{ dictionary.bannerActionsLabel }}
          </vBtn>
        </template>
      </Banner>
    </vFooter>
  </vApp>
</template>
<script setup lang="ts">
import { usePopupService, useThemeService } from '@packages/popup/services'
import { tabNames } from './config/tabs'
import { themeConfigs } from '@packages/popup/config'
import { dictionary, bannerUrl, bannerHeight, bannerHeightNumber } from '@packages/popup/constants'
import Banner from '@packages/popup/components/banner.vue'
import IpIndicator from '@packages/popup/components/ipIndicator.vue'

const { openGithub, tab, tabs } = usePopupService()
const { currentTheme, loadTheme } = useThemeService()

loadTheme()
</script>

<style lang="scss" scoped>
/* stylelint-disable value-keyword-case */

.pacSwitcher {
  width: 500px;
  height: auto;
  min-height: 480px;
  font-size: 16px;
  border-collapse: collapse;

  &__fallback {
    display: flex;
    justify-content: center;
  }

  &__main {
    padding-bottom: v-bind(bannerHeight);
  }

  &__footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    max-height: calc(v-bind(bannerHeight) + 12px);
    padding: 0;
  }

  &__banner {
    width: 100%;
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
