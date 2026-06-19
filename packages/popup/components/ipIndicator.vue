<template>
  <VChip
    size="small"
    variant="tonal"
    :color="error ? 'error' : 'primary'"
    class="ipIndicator"
    :title="tooltip"
    @click="refresh"
  >
    <template #prepend>
      <VProgressCircular v-if="isLoading" size="14" width="2" indeterminate></VProgressCircular>
      <VIcon v-else-if="error" icon="mdi-alert-circle-outline" size="small"></VIcon>
      <VIcon v-else icon="mdi-earth" size="small"></VIcon>
    </template>
    <span v-if="ip">{{ ip }}</span>
    <span v-else-if="error">—</span>
    <span v-else>…</span>
  </VChip>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useIpService } from '@packages/popup/services'

const { ip, isLoading, error, refresh } = useIpService()

const tooltip = computed(() => {
  if (isLoading.value) return 'Checking…'
  if (error.value) return `Error: ${error.value} — click to retry`
  return ip.value ? `Apparent IP: ${ip.value} — click to refresh` : 'Click to check'
})
</script>

<style lang="scss" scoped>
.ipIndicator {
  cursor: pointer;
  font-variant-numeric: tabular-nums;
}
</style>
