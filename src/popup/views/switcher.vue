<template>
  <v-row no-gutters class="switcher">
    <v-col cols="12">
      <v-item-group mandatory v-model="pacId">
        <v-row no-gutters class="fill-height">
          <v-col cols="4" class="my-1">
            <v-item v-slot="{ active, toggle }">
              <v-card
                @click="toggle"
                class="mx-1 py-2 fill-height switcher_pacItem body-1 d-flex justify-center align-center"
                :class="{ active }"
                elevation="0"
                outlined
                color="grey lighten-4"
                :style="{ color: active ? 'white' : 'black' }"
              >
                {{ systemDefault }}
              </v-card>
            </v-item>
          </v-col>
          <v-col cols="4" v-for="(item, id) in pacs" :key="id" class="my-1">
            <v-item v-slot="{ active, toggle }">
              <v-card
                @click="toggle"
                class="mx-1 py-2 fill-height switcher_pacItem body-1 d-flex justify-center align-center"
                :class="{ active }"
                elevation="0"
                outlined
                :color="active ? null : color(item.name)"
                :style="{ color: stringToShade(item.name) }"
              >
                {{ item.name }}
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import stringToColor from 'string-to-color'
import { KEY } from '@/constants'
import stringToShade from '@/utils/stringToShade'
import { computed, defineComponent } from '@vue/composition-api'
import { usePacService } from '../services/pacService'

export default defineComponent({
  name: 'SwitcherPage',
  setup() {
    const { sortedPacs, pac, pacs } = usePacService()

    const color = (name: string) => {
      return stringToColor(name)
    }

    const pacId = computed<number>({
      get() {
        return pacs.value.findIndex(({ name }) => name === pac.value.name) + 1
      },
      set(value) {
        pac.value = value === 0 ? { name: KEY.systemDefault } : sortedPacs.value[value - 1]
      },
    })

    return {
      systemDefault: KEY.systemDefault,
      pacs: sortedPacs,
      color,
      stringToShade,
      pacId,
    }
  },
})
</script>
<style lang="scss" scoped>
$borderColor: #3a3a3a;

.switcher {
  &_pacItem {
    &.active {
      background: linear-gradient(90deg, #bf0000, #665cac);
      border: 5px solid $borderColor !important;
      border-radius: 5px;
    }
  }
}
</style>
