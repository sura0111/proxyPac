<template>
  <v-row no-gutters class="fill-height settings">
    <v-col cols="4" class="my-1">
      <v-card
        class="mx-1 py-2 fill-height d-flex justify-center align-center settings_addPac"
        elevation="0"
        outlined
        @click="goToAddPage"
      >
        <span class="white--text body-1"><v-icon small color="white">mdi-plus</v-icon> Add New</span>
      </v-card>
    </v-col>
    <v-col cols="4" v-for="(item, id) in pacs" :key="id" class="my-1">
      <v-card
        @click="goToEditPage(item)"
        class="mx-1 py-2 fill-height d-flex justify-center align-center"
        elevation="0"
        outlined
        :color="stringToColor(item.name)"
      >
        <span class="body-1" :style="{ color: stringToShade(item.name) }">
          <v-icon small :color="stringToShade(item.name)">mdi-pencil</v-icon> {{ item.name }}
        </span>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Dictionary } from 'vue-router/types/router'
import stringToColor from 'string-to-color'
import stringToShade from '@/utils/stringToShade'
import { PAGE } from '@/constants'
import { defineComponent } from '@vue/composition-api'
import { usePacService } from '../services/pacService'
import { useRouter } from '@/vendors/vue-router'

export default defineComponent({
  name: 'SettingPage',
  setup() {
    const router = useRouter()
    const { sortedPacs } = usePacService()

    const goToAddPage = () => {
      router.push({ name: PAGE.addPac })
    }

    const goToEditPage = (pac: { name: string; url: string }) => {
      router.push({ name: PAGE.editPac, params: { pac } as unknown as Dictionary<string> })
    }

    return {
      pacs: sortedPacs,
      stringToColor,
      stringToShade,
      goToAddPage,
      goToEditPage,
    }
  },
})
</script>
<style lang="scss" scoped>
.settings {
  &_addPac {
    background: linear-gradient(90deg, #bf0000, #665cac);
  }
}
</style>
