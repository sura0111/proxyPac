<template>
  <section no-gutters class="switcher">
    <DisplayOptions class="mb-3"></DisplayOptions>
    <VContainer fluid>
      <vItemGroup v-model="pacId" mandatory>
        <vRow no-gutters class="fill-height">
          <VCol
            v-for="(item, id) in [defaultPac, ...sortedPacs]"
            :key="id"
            :cols="displayType === DisplayType.icon ? 4 : 12"
            class="switcher__item"
          >
            <VItem v-slot="{ isSelected, toggle }">
              <VBadge
                :model-value="isSelected"
                class="switcher__badge"
                offset-x="32"
                offset-y="-4"
                color="secondary"
                location="left top"
              >
                <template v-if="isSelected" #badge>active</template>
                <PacItem :pac="item" :active="isSelected" @click="toggle"></PacItem>
              </VBadge>
            </VItem>
          </VCol>
        </vRow>
      </vItemGroup>
    </VContainer>
  </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { usePacService } from '@packages/popup/services/pacService'
import { useRoute } from 'vue-router'
import PacItem from '@packages/popup/components/pacItem.vue'
import DisplayOptions from '@packages/popup/components/displayOptions.vue'
import { DisplayType } from '@packages/popup/constants'

const route = useRoute()
const { defaultPac, sortedPacs, pac, usePac, displayType } = await usePacService()

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
