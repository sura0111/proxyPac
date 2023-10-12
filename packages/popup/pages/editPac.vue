<template>
  <PacConfig :pac="pac" @update:pac="onUpdatePac" @cancel="goToSettingsTop"></PacConfig>
</template>

<script setup lang="ts">
import { type Pac } from '@packages/popup/types'
import { usePacService } from '@packages/popup/services/pacService'
import PacConfig from '@packages/popup/components/pacConfig.vue'
import { useRouterService } from '@packages/popup/services/routerService'

const props = defineProps<{ pac: Pac }>()

const { editPac, deletePac } = await usePacService()
const { goToSettingsTop } = useRouterService()

const onUpdatePac = async (pac: Pac) => {
  if (pac.name && 'value' in pac) {
    await editPac(pac, props.pac)
  } else if (pac.name) {
    deletePac(pac.name)
  }
  await goToSettingsTop()
}
</script>

<style lang="scss" scoped>
.editPac {
  pre {
    font-family: 'Osaka', 'Menlo', 'Courier New', Courier, monospace;
    width: 100%;
    max-height: 200px;
    overflow: scroll;
    background-color: #333;
    color: white;
    padding: 5px;
    border-radius: 5px;
  }
}
</style>
