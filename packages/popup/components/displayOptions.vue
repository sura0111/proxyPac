<template>
  <div class="displayOptions">
    <div class="displayOptions__item">
      <div class="displayOptions__name">Display:</div>
      <VBtnGroup density="compact" variant="outlined" divided>
        <VTooltip v-for="config in displayTypeConfigs" :key="config.type" location="bottom">
          <template #activator="{ props }">
            <VBtn
              v-bind="props"
              icon
              class="displayOptions__button"
              :color="config.type === displayType ? 'primary' : undefined"
              @click="displayType = config.type"
            >
              <VIcon :icon="config.icon"></VIcon>
            </VBtn>
          </template>
          {{ config.tooltip }}
        </VTooltip>
      </VBtnGroup>
    </div>
    <div class="displayOptions__item">
      <div class="displayOptions__name">Sort:</div>
      <VBtnGroup density="compact" variant="outlined" divided>
        <VTooltip v-for="config in sortTypeConfigs" :key="config.type" location="bottom">
          <template #activator="{ props }">
            <VBtn
              v-bind="props"
              icon
              class="displayOptions__button"
              :color="config.type === sortType ? 'primary' : undefined"
              @click="sortType = config.type"
            >
              <VIcon :icon="config.icon"></VIcon>
            </VBtn>
          </template>
          {{ config.tooltip }}
        </VTooltip>
      </VBtnGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { displayTypeConfigs, sortTypeConfigs } from '@packages/popup/constants'
import { useDisplayOptionsService } from '@packages/popup/services'

const { displayType, sortType } = useDisplayOptionsService()
</script>

<style lang="scss" scoped>
.displayOptions {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background-color: rgb(var(--v-theme-tertiary));

  &__item + &__item {
    padding-left: 32px;
  }

  &__item {
    text-align: right;
  }

  &__name {
    display: inline;
    font-size: 0.8rem;
    text-transform: uppercase;
    padding-right: 8px;
  }

  &__button {
    min-width: 36px;
  }
}
</style>
