<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-text-field
        class="mx-2"
        v-model="pac.name"
        label="Name"
        aria-label="Name"
        placeholder="Name"
        outlined
        dense
        flat
        filled
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-textarea
        class="mx-2"
        v-model="pac.url"
        label="Pac Url"
        aria-label="Pac Url"
        placeholder="URL or text"
        outlined
        dense
        flat
        filled
      ></v-textarea>
    </v-col>
    <v-col cols="12" class="mx-2 mb-2">
      <v-btn class="mr-1" @click="addPac" elevation="0" color="primary" :disabled="!canAdd" small>Add</v-btn>
      <v-btn @click="goToSettingsTop" elevation="0" text small>Cancel</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { PAGE } from '@/constants'

@Component
export default class AddPac extends Vue {
  getDefaultPac() {
    return {
      name: '',
      url: '',
      value: '',
    }
  }
  pac: {
    name: string
    url: string
  } = this.getDefaultPac()

  get canAdd() {
    return this.pac.name && this.pac.url && !this.$s.getter.hasPac(this.pac.name)
  }

  async addPac() {
    this.$s.addPac(this.pac)
    this.pac = this.getDefaultPac()
    await this.goToSettingsTop()
  }

  goToSettingsTop() {
    return this.$router.push({ name: PAGE.settings })
  }
}
</script>
