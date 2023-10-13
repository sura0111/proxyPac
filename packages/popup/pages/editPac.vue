<template>
  <VContainer fluid>
    <h1>PAC Configuration: Modify</h1>
    <PacConfig :pac="pac" @update:pac="onUpdatePac" @cancel="goToSettingsTop"></PacConfig>
  </VContainer>
</template>

<script setup lang="ts">
import { type Pac } from '@packages/popup/types'
import { usePacService } from '@packages/popup/services/pacService'
import PacConfig from '@packages/popup/components/pacConfig.vue'
import { useRouterService } from '@packages/popup/services/routerService'
import { getNewPac } from '@packages/popup/helpers/pac'

const props = defineProps<{ pac: Pac }>()

const { editPac, deletePac } = await usePacService()
const { goToSettingsTop } = useRouterService()

const onUpdatePac = async (pac: Pac | { name: string }) => {
  if (pac.name && 'value' in pac) {
    const newPac = getNewPac(pac)
    if (newPac) {
      await editPac(newPac, props.pac)
    }
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
