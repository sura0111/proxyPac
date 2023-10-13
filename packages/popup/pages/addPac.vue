<template>
  <VContainer fluid>
    <h1>PAC Configuration: Create</h1>
    <PacConfig @update:pac="onUpdatePac" @cancel="goToSettingsTop"></PacConfig>
  </VContainer>
</template>

<script setup lang="ts">
import { usePacService, useRouterService } from '@packages/popup/services'
import PacConfig from '@packages/popup/components/pacConfig.vue'
import { type Pac } from '@packages/popup/types/pac'

const { addPac } = await usePacService()
const { goToSettingsTop } = useRouterService()

const onUpdatePac = async (pac: Pac | { name: string }) => {
  if ('value' in pac) {
    await addPac(pac)
    await goToSettingsTop()
  }
}
</script>
