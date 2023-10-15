<template>
  <VContainer fluid>
    <h1>{{ dictionary.editPacConfiguration }}</h1>
    <PacConfig :pac="pac" @update:pac="onUpdatePac" @cancel="goToSettingsTop"></PacConfig>
  </VContainer>
</template>

<script setup lang="ts">
import PacConfig from '@packages/popup/components/pacConfig.vue'
import { dictionary } from '@packages/popup/constants'
import { getNewPac } from '@packages/popup/helpers'
import { usePacService, useRouterService } from '@packages/popup/services'
import { type Pac } from '@packages/popup/types'

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
    width: 100%;
    max-height: 200px;
    padding: 5px;
    overflow: scroll;
    font-family: Osaka, Menlo, 'Courier New', Courier, monospace;
    color: white;
    background-color: #333333;
    border-radius: 5px;
  }
}
</style>
