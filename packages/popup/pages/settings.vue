<template>
  <section class="settings">
    <div class="my-1">
      <vBtn block color="primary" variant="tonal" @click="goToAddPage">
        <span><vIcon size="sm" icon="mdi-plus"></vIcon> New PAC | PAC URL</span>
      </vBtn>
    </div>
    <div><vDivider class="my-4"></vDivider></div>
    <vRow no-gutters>
      <vCol v-for="(pac, id) in sortedPacs" :key="id" cols="4" class="settings__item">
        <PacItem :pac="pac" @click="goToEditPage">
          <template #prepend><vIcon icon="mdi-pencil" size="sm"></vIcon></template>
        </PacItem>
      </vCol>
    </vRow>
  </section>
</template>

<script setup lang="ts">
import { usePacService, useRouterService } from '@packages/popup/services'
import PacItem from '@packages/popup/components/pacItem.vue'

const { sortedPacs } = await usePacService()
const { goToEditPage, goToAddPage } = useRouterService()
</script>

<style lang="scss" scoped>
.settings {
  .settings__item {
    padding: 4px;
  }
}
</style>
