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
  @include pacButton();
}
</style>
