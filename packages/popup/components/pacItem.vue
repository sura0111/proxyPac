<template>
  <vBtn
    class="pacButton"
    :class="{ 'pacButton--active': active, [`color__${pac.color}`]: !!pac.color }"
    @click="$emit('click', pac)"
  >
    <slot name="prepend"></slot>
    {{ pac.name ? pac.name : 'System Default' }}
  </vBtn>
</template>

<script setup lang="ts">
import { type Pac } from '@packages/popup/types'

defineProps<{ pac: Pac; active?: boolean | undefined }>()

defineEmits<(event: 'click', value: Pac) => void>()
</script>

<style lang="scss" scoped>
.pacButton {
  width: 100%;
  padding: 10px 4px;
  height: auto;
  text-transform: none;
  text-align: center;
  border-radius: 4px;
  box-shadow: none;
  font-weight: 700;
  background-color: rgb(var(--v-theme-tertiary));
  color: rgb(var(--v-theme-on-tertiary));

  &--active {
    outline: 3px solid rgb(var(--v-theme-on-tertiary));
  }
}
</style>
