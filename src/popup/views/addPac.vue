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
        class="mx-2 textareaCode"
        v-model="pac.url"
        label="Pac Url"
        aria-label="Pac Url"
        placeholder="URL or text"
        outlined
        dense
        flat
        auto-grow
        wrap="off"
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
import { PAGE } from '@/constants'
import { computed, defineComponent, ref } from '@vue/composition-api'
import { Pac } from '../definitions/pac'
import { usePacService } from '../services/pacService'
import { useRouter } from '@/vendors/vue-router'

export default defineComponent({
  name: 'AddPacPage',
  setup() {
    const router = useRouter()
    const pac = ref<Required<Pac>>({ name: '', url: '' })
    const { hasPac, addPac: add } = usePacService()

    const canAdd = computed(() => {
      return pac.value.name && pac.value.url && !hasPac(pac.value.name)
    })

    const addPac = async () => {
      await add(pac.value)
      pac.value = { name: '', url: '' }
      await goToSettingsTop()
    }

    const goToSettingsTop = () => {
      return router.push({ name: PAGE.settings })
    }

    return {
      pac,
      canAdd,
      addPac,
      goToSettingsTop,
    }
  },
})
</script>
