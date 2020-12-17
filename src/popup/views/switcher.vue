<template>
  <v-row no-gutters class="switcher">
    <v-col cols="12">
      <v-item-group mandatory v-model="pacId">
        <v-row no-gutters class="fill-height">
          <v-col cols="4" class="my-1">
            <v-item v-slot="{ active, toggle }">
              <v-card
                @click="toggle"
                class="mx-1 fill-height switcher_pacItem"
                :class="{ active }"
                elevation="0"
                outlined
                color="grey lighten-4"
              >
                <v-card-text class="text-center text-truncate body-1">{{ systemDefault }}</v-card-text>
              </v-card>
            </v-item>
          </v-col>
          <v-col cols="4" v-for="(item, id) in pacs" :key="id" class="my-1">
            <v-item v-slot="{ active, toggle }">
              <v-card
                @click="toggle"
                class="mx-1 fill-height switcher_pacItem"
                :class="{ active }"
                elevation="0"
                outlined
                :color="color(item.name)"
              >
                <v-card-text class="text-center text-truncate body-1" :style="{ color: stringToShade(item.name) }">
                  {{ item.name }}
                </v-card-text>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import stringToColor from 'string-to-color'
import { KEY } from '@/constants'
import stringToShade from '@/utils/stringToShade'

@Component
export default class Switcher extends Vue {
  get systemDefault() {
    return KEY.systemDefault
  }
  get pacs() {
    return this.$s.getter.sortedPacs
  }

  color(name: string) {
    return stringToColor(name)
  }

  stringToShade(name: string) {
    return stringToShade(name)
  }

  get pacId() {
    return name === KEY.systemDefault ? 0 : this.pacs.findIndex(({ name }) => name === this.$s.state.pac.name) + 1
  }

  set pacId(value: number) {
    this.$s.state.pac = value === 0 ? { name: KEY.systemDefault } : this.pacs[value - 1]
  }
}
</script>
<style lang="scss" scoped>
$borderColor: black;

.switcher {
  &_pacItem.active {
    border: 5px solid $borderColor !important;
    border-radius: 10px;
  }
}
</style>
