<template>
  <v-app class="pacSwitcher" v-if="isReady">
    <v-main>
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="12" class="mb-3 d-flex align-center">
            <v-avatar size="30" class="mr-3 pointer" @click="openGithub">
              <v-img src="@/assets/logo.png"></v-img>
            </v-avatar>
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
import { PAGE } from '@/constants'
import { computed, defineComponent } from '@vue/composition-api'
import { useRoute } from '@/vendors/vue-router'
import { useRouter } from '../vendors/vue-router'
import { usePacService } from './services/pacService'

export default defineComponent({
  name: 'PopupPage',
  setup() {
    const { isReady } = usePacService()
    const route = useRoute()
    const router = useRouter()

    const tabs: { [index: string]: string[] } = {
      switcher: [PAGE.switcher],
      settings: [PAGE.settings, PAGE.addPac, PAGE.editPac],
    }

    const routeName = computed(() => route.value.name)

    const tab = computed<number | null>({
      get() {
        return Object.entries(tabs).findIndex(([_, page]) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return page.includes(route.value.name ?? 'none')
        })
      },
      set(value) {
        if (value !== null) {
          const tabName = Object.keys(tabs)[value]
          router.push({ name: tabs[tabName][0] })
        }
      },
    })

    const openGithub = () => {
      window.open('https://github.com/sura0111/proxyPac', '_blank')
    }

    return {
      tabs,
      tab,
      isReady,
      routeName,
      openGithub,
    }
  },
})
</script>
<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
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
