<template>
  <vBtn
    class="pacButton"
    :class="{ 'pacButton--active': active, [`color__${pac.color}`]: !!pac.color }"
    @click="onClick(pac)"
  >
    <slot name="prepend"></slot>
    {{ pac.name ? pac.name : dictionary.systemDefault }}
  </vBtn>
</template>

<script setup lang="ts">
import { type Pac } from '@packages/popup/types'
import { dictionary } from '@packages/popup/constants'

defineProps<{ pac: Pac; active?: boolean | undefined }>()

const emit = defineEmits<(event: 'click', value: Pac) => void>()

const onClick = (pac: Pac) => {
  emit('click', pac)
}
</script>

<style lang="scss" scoped>
.pacButton {
  width: 100%;
  height: auto;
  padding: 10px 4px;
  font-weight: 700;
  color: rgb(var(--v-theme-on-tertiary));
  text-align: center;
  text-transform: none;
  background-color: rgb(var(--v-theme-tertiary));
  border-radius: 4px;
  box-shadow: none;

  &--active {
    outline: 3px solid rgb(var(--v-theme-on-tertiary));
  }
}
</style>
