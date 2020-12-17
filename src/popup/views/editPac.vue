<template>
  <v-row no-gutters class="editPac">
    <v-col cols="12">
      <v-text-field
        v-model.trim="name"
        label="Name"
        aria-label="Name"
        placeholder="Name"
        outlined
        dense
        flat
        filled
        @input="edited = true"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-textarea
        v-model.trim.lazy="url"
        label="Pac Url/Text"
        aria-label="pac"
        placeholder="Url or Text"
        rows="3"
        outlined
        dense
        flat
        filled
        wrap="off"
        auto-grow
        class="monospace textareaCode"
        @input="edited = true"
      ></v-textarea>
    </v-col>
    <v-col cols="12" class="d-flex justify-center">
      <v-icon v-if="isLoadingPacValue" class="ma-3">mdi-spin mdi-loading</v-icon>
      <pre v-else v-html="value" class="mb-2"></pre>
    </v-col>
    <v-col cols="12">
      <v-btn class="mr-1" @click="savePac" elevation="0" color="primary" :disabled="!canSave" small>Save</v-btn>
      <v-btn class="mr-1" @click="deletePac" elevation="0" color="error" small>Delete</v-btn>
      <v-btn @click="goToSettingsTop" elevation="0" text small>Cancel</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { PAGE } from '@/constants'

@Component
export default class AddPac extends Vue {
  @Prop({ type: Object, default: () => null })
  pac!: { name: string; url: string } | null
  privateUrl = ''
  isLoadingPacValue = false
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lazyTimer: any = null
  edited = false
  name = ''
  value = ''
  get url() {
    return this.privateUrl
  }
  set url(value) {
    this.privateUrl = value
    clearTimeout(this.lazyTimer)
    this.isLoadingPacValue = true
    this.lazyTimer = setTimeout(async () => {
      this.value = await this.$s.getPacValue(this.privateUrl)
      this.isLoadingPacValue = false
    }, 1000)
  }

  get canSave() {
    return this.name && this.url && this.edited
  }

  async savePac() {
    this.$s.editPac({ name: this.name, url: this.url }, { name: this.pac?.name })
    this.goToSettingsTop()
  }

  async deletePac() {
    this.$s.deletePac(this.name)
    this.goToSettingsTop()
  }

  goToSettingsTop() {
    return this.$router.push({ name: PAGE.settings })
  }

  async mounted() {
    if (this.pac === null) {
      this.goToSettingsTop()
      return
    }
    this.name = this.pac.name
    this.privateUrl = this.pac.url
    this.value = await this.$s.getPacValue(this.privateUrl)
  }
}
</script>
<style lang="scss" scoped>
::v-deep .textareaCode textarea {
  font-size: 14px;
  line-height: 1rem;
  max-height: 350px;
}
.monospace {
  font-family: 'Osaka', 'Menlo', 'Courier New', Courier, monospace;
}
.editPac {
  pre {
    font-family: 'Osaka', 'Menlo', 'Courier New', Courier, monospace;
    width: 100%;
    max-height: 200px;
    overflow: scroll;
    background-color: #333;
    color: white;
    padding: 5px;
    border-radius: 5px;
  }
}
</style>
