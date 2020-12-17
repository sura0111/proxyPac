<template>
  <v-row no-gutters class="fill-height">
    <v-col cols="4" class="my-1">
      <v-card
        class="mx-1 fill-height d-flex justify-center align-center"
        elevation="0"
        color="black"
        outlined
        @click="goToAddPage"
      >
        <span class="warning--text body-1"><v-icon small color="warning">mdi-plus</v-icon> Add New</span>
      </v-card>
    </v-col>
    <v-col cols="4" v-for="(item, id) in pacs" :key="id" class="my-1">
      <v-card @click="goToEditPage(item)" class="mx-1 fill-height" elevation="0" outlined :color="color(item.name)">
        <v-card-text class="text-center text-truncate body-1" :style="{ color: stringToShade(item.name) }">
          <v-icon small>mdi-pencil</v-icon> {{ item.name }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Dictionary } from 'vue-router/types/router'
import stringToColor from 'string-to-color'
import stringToShade from '@/utils/stringToShade'
import { PAGE } from '@/constants'

@Component
export default class Settings extends Vue {
  get pacs() {
    return this.$s.getter.sortedPacs
  }
  goToAddPage() {
    this.$router.push({ name: PAGE.addPac })
  }

  color(name: string) {
    return stringToColor(name)
  }

  stringToShade(name: string) {
    return stringToShade(name)
  }

  goToEditPage(pac: { name: string; url: string }) {
    this.$router.push({ name: PAGE.editPac, params: ({ pac } as unknown) as Dictionary<string> })
  }
}
</script>
