<template>
  <PacConfig @update:pac="addPacConfiguration" @cancel="goToSettingsTop"></PacConfig>
</template>

<script setup lang="ts">
import { usePacService, useRouterService } from '@packages/popup/services'
import PacConfig from '@packages/popup/components/pacConfig.vue'
import { type Pac } from '@packages/popup/types/pac'

const { addPac } = await usePacService()
const { goToSettingsTop } = useRouterService()

const addPacConfiguration = async (pac: Pac | null) => {
  if (pac) {
    await addPac(pac)
  }
  await goToSettingsTop()
}
</script>
