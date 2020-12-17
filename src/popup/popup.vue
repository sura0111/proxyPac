<template>
  <v-app class="pacSwitcher" v-if="$s.state.isReady">
    <v-main>
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="12" class="mb-3 d-flex align-center">
            <v-avatar size="30" class="mr-3"><v-img src="@/assets/logo.png"></v-img></v-avatar>
            <v-tabs v-model="tab">
              <v-tab v-for="(item, id) in tabs" :key="id">
                {{ item[0] }}
              </v-tab>
            </v-tabs>
          </v-col>
          <v-col cols="12">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { PAGE } from '@/constants'

@Component
export default class Popup extends Vue {
  get tab() {
    return Object.entries(this.tabs).findIndex(([_, page]) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return page.includes(this.$route.name!)
    })
  }

  set tab(value) {
    if (value !== null) {
      const tabName = Object.keys(this.tabs)[value]
      this.$router.push({ name: this.tabs[tabName][0] })
    }
  }

  tabs: { [index: string]: string[] } = {
    switcher: [PAGE.switcher],
    settings: [PAGE.settings, PAGE.addPac, PAGE.editPac],
  }
}
</script>
<style lang="scss" scoped>
.pacSwitcher {
  width: 500px;
  overflow: scroll;
}
::v-deep .textareaCode textarea {
  font-size: 14px;
  line-height: 1rem;
  max-height: 350px;
  font-family: 'Osaka', 'Menlo', 'Courier New', Courier, monospace;
}
</style>
