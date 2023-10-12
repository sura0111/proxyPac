<template>
  <section no-gutters class="switcher">
    <vItemGroup v-model="pacId" mandatory>
      <vRow no-gutters class="fill-height">
        <vCol v-for="(item, id) in [defaultPac, ...sortedPacs]" :key="id" cols="4" class="switcher__item">
          <vItem v-slot="{ isSelected, toggle }">
            <vBadge :model-value="isSelected" class="switcher__badge" offset-x="32" offset-y="-4" color="secondary">
              <template v-if="isSelected" #badge>active</template>
              <PacItem :pac="item" :active="isSelected" @click="toggle"></PacItem>
            </vBadge>
          </vItem>
        </vCol>
      </vRow>
    </vItemGroup>
    <FirefoxNote v-if="!isChrome" class="pt-2"></FirefoxNote>
  </section>
</template>
<script setup lang="ts">
import { detectChrome } from '@packages/core/utils'
import { computed } from 'vue'
import { usePacService } from '@packages/popup/services/pacService'
import { useRoute } from 'vue-router'
import FirefoxNote from '@packages/popup/components/firefoxNote.vue'
import PacItem from '@packages/popup/components/pacItem.vue'

const route = useRoute()
const isChrome = detectChrome()
const { defaultPac, sortedPacs, pac, usePac } = await usePacService()

await usePac(pac.value, !route.meta.previousRouteName)

const pacId = computed<number>({
  get: () => {
    return sortedPacs.value.findIndex(({ name }) => name === pac.value.name) + 1
  },
  set: async (value) => {
    if (value === 0) {
      await usePac(defaultPac)
    } else {
      await usePac(sortedPacs.value[value - 1])
    }
  },
})
</script>

<style lang="scss" scoped>
$borderColor: #3a3a3a;

.switcher {
  .switcher__item {
    padding: 4px;
  }

  &__badge {
    width: 100%;
  }
}
</style>
