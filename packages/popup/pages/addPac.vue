<template>
  <VContainer fluid>
    <h1>{{ dictionary.createPacConfiguration }}</h1>
    <PacConfig @update:pac="onUpdatePac" @cancel="goToSettingsTop"></PacConfig>
  </VContainer>
</template>

<script setup lang="ts">
import PacConfig from '@packages/popup/components/pacConfig.vue'
import { dictionary } from '@packages/popup/constants'
import { getNewPac } from '@packages/popup/helpers'
import { usePacService, useRouterService } from '@packages/popup/services'
import { type Pac } from '@packages/popup/types'

const { addPac } = await usePacService()
const { goToSettingsTop } = useRouterService()

const onUpdatePac = async (pac: Pac | { name: string }) => {
  if ('value' in pac) {
    const newPac = getNewPac(pac)
    if (newPac) {
      await addPac(newPac)
    }
    await goToSettingsTop()
  }
}
</script>
